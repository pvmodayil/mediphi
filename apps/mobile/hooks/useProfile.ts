import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface Profile {
  id: string;
  mediphi_id: string;
  full_name: string;
  date_of_birth: string | null;
  sex: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const userId = user.id;

    async function fetchProfile() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (supabaseError) throw supabaseError;
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
}
