import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types/database.types';

const supabaseClient = createBrowserSupabaseClient<Database>();

export default supabaseClient;