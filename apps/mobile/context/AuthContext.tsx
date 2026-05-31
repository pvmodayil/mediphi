import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  onboardingComplete: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, dateOfBirth?: string, sex?: string, phone?: string) => Promise<{ error: Error | null; requiresEmailConfirmation: boolean }>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const ONBOARDING_KEY = 'mediphi_onboarding_completed';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(true);

  // Handle deep links (email confirmation redirects)
  const handleDeepLink = async (url: string) => {
    console.log('[AuthContext] Deep link received:', url);

    // Parse query parameters from the URL
    const urlObj = new URL(url);
    const accessToken = urlObj.searchParams.get('access_token');
    const refreshToken = urlObj.searchParams.get('refresh_token');
    const type = urlObj.searchParams.get('type');

    console.log('[AuthContext] Parsed deep link — type:', type, 'access_token:', accessToken ? 'present' : 'missing');

    if (accessToken && refreshToken) {
      console.log('[AuthContext] Setting session from deep link...');
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        console.error('[AuthContext] Failed to set session from deep link:', error.message);
      } else {
        console.log('[AuthContext] Session set from deep link successfully');
        setSession(data.session);
        setUser(data.session?.user ?? null);
        await ensureProfileExists(data.session?.user ?? null);
      }
    }
  };

  useEffect(() => {
    // Check for initial deep link (app opened via deep link)
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('[AuthContext] Initial URL:', url);
        handleDeepLink(url);
      }
    });

    // Listen for deep links while app is running
    const subscription = Linking.addEventListener('url', (event) => {
      if (event.url) {
        handleDeepLink(event.url);
      }
    });

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AuthContext] Initial session check:', session ? 'Session exists' : 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthContext] Auth state changed:', event, 'Session:', session ? 'exists' : 'null');
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN') {
          // Ensure profile exists (safety net if trigger failed)
          await ensureProfileExists(session?.user ?? null);
          // Check onboarding status
          const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
          setOnboardingComplete(completed === 'true');
        }

        if (event === 'SIGNED_OUT') {
          setOnboardingComplete(true);
        }
      }
    );

    return () => {
      subscription.remove();
      authSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check onboarding status on mount if already logged in
    if (user) {
      AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
        setOnboardingComplete(value === 'true');
      });
    }
  }, [user]);

  const ensureProfileExists = async (user: User | null) => {
    if (!user) return;

    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (existingProfile) {
        console.log('[AuthContext] Profile already exists for user:', user.id);
        return;
      }

      console.log('[AuthContext] Profile missing for user:', user.id, 'Creating fallback profile...');

      // Extract metadata
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
      const dateOfBirth = user.user_metadata?.date_of_birth;
      const sex = user.user_metadata?.sex;
      const phone = user.user_metadata?.phone;

      // Generate MPH-ID client-side as fallback
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let mediPhiId = 'MPH-';
      for (let i = 0; i < 6; i++) {
        mediPhiId += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // Insert profile row (RLS allows patients to insert their own profile)
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          mediphi_id: mediPhiId,
          full_name: fullName,
          email: user.email,
          date_of_birth: dateOfBirth || null,
          sex: sex || null,
          phone: phone || null,
          qr_data: mediPhiId,
        });

      if (insertError) {
        console.error('[AuthContext] Failed to create fallback profile:', insertError.message);
      } else {
        console.log('[AuthContext] Fallback profile created with ID:', mediPhiId);
      }
    } catch (err) {
      console.error('[AuthContext] Error in ensureProfileExists:', err);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('[AuthContext] Attempting signIn with:', email);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    console.log('[AuthContext] signIn result — error:', error?.message || 'none', 'session:', data.session ? 'exists' : 'null');

    if (!error && data.session) {
      await ensureProfileExists(data.session.user);
    }

    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string, dateOfBirth?: string, sex?: string, phone?: string) => {
    console.log('[AuthContext] Attempting signUp with:', email, 'metadata:', { fullName, dateOfBirth, sex, phone });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'com.mediphi://auth/callback',
        data: {
          full_name: fullName,
          date_of_birth: dateOfBirth,
          sex: sex,
          phone: phone,
        },
      },
    });
    console.log('[AuthContext] signUp result — error:', error?.message || 'none', 'user:', data.user ? 'created' : 'null', 'session:', data.session ? 'exists' : 'null');

    // If no error but no session, email confirmation is required
    const requiresEmailConfirmation = !error && !data.session;
    return { error, requiresEmailConfirmation };
  };

  const signOut = async () => {
    console.log('[AuthContext] Signing out...');
    await supabase.auth.signOut();
    await AsyncStorage.removeItem(ONBOARDING_KEY);
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setOnboardingComplete(true);
  };

  const resendConfirmationEmail = async (email: string) => {
    console.log('[AuthContext] Resending confirmation email to:', email);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    console.log('[AuthContext] resend result — error:', error?.message || 'none');
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        onboardingComplete,
        signIn,
        signUp,
        signOut,
        completeOnboarding,
        resendConfirmationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
