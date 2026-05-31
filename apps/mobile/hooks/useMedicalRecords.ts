import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface MedicalRecord {
  id: string;
  patient_id: string;
  fhir_resource_type: string;
  fhir_data: Record<string, unknown>;
  source_type: string;
  source_id: string | null;
  document_id: string | null;
  recorded_at: string;
  created_at: string;
}

export function useMedicalRecords() {
  const { user } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setRecords([]);
      setLoading(false);
      return;
    }

    const userId = user.id;

    async function fetchRecords() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('medical_records')
          .select('*')
          .eq('patient_id', userId)
          .order('recorded_at', { ascending: false });

        if (supabaseError) throw supabaseError;
        setRecords(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch records'));
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('medical_records_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'medical_records',
          filter: `patient_id=eq.${userId}`,
        },
        () => {
          fetchRecords();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  return { records, loading, error };
}
