import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseQuery<T>(
  tableName: string,
  options: {
    orderBy?: { column: string; ascending?: boolean };
    filter?: { column: string; value: any };
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let query = supabase.from(tableName).select('*');

        if (options.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending,
          });
        }

        if (options.filter) {
          query = query.eq(options.filter.column, options.filter.value);
        }

        const { data: result, error } = await query;

        if (error) throw error;
        setData(result as T[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName, options.orderBy?.column, options.orderBy?.ascending, options.filter?.column, options.filter?.value]);

  return { data, loading, error };
}