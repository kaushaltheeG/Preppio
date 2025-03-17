import React from  'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../../../services/supabase';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const GoogleLogin: React.FC = () => {
  return (
    <div className="text-sm text-gray-500">
      <Auth 
        supabaseClient={supabase}
        providers={[ 'google' ]}
        onlyThirdPartyProviders={true}
        appearance={{ theme: ThemeSupa }}
        providerScopes={{
          google: 'https://www.googleapis.com/auth/drive.file',
        }}
      />
    </div>
  );
}

export default GoogleLogin;