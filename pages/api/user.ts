// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../types/database.types';
import { User } from '../../types/database.types';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();
  // @ts-ignore - this is a workaround for a bug in the supabase types, fix later
  res.status(200).json({ name: user?.name ?? '' });
};

export default handler;