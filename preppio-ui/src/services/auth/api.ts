import { supabase } from '../supabase';
import { OAuthResponse, Session } from '@supabase/supabase-js';

export const refreshSession = async ({ refreshToken }: { refreshToken: string }): Promise<Session> => {
  const response = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (!response.data.session) {
    throw new Error('No session found');
  }
  return response.data.session;
};

export const refreshGooglePermissions = async (): Promise<OAuthResponse['data']> => {
  let redirectTo: string = 'http://localhost:3000/auth/callback';
  if (process.env.REACT_APP_NODE_ENV === 'production') {
    redirectTo = "https://preppio-ui.onrender.com/auth/callback";
  }
  try {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          scope: 'https://www.googleapis.com/auth/drive.file',
          max_age: '86400' // 24 hours in seconds
        },
        redirectTo,
      }
    });
    return data;
  } catch (error) {
    console.error('Error getting google provider token', error);
    throw error;
  }
};
