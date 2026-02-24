import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { email, new_password, secret } = await req.json();

        // Security check: Use the secret provided by the user in the curl command
        // In a real scenario, this should match an environment variable like ADMIN_RESET_SECRET
        const ADMIN_SECRET = Deno.env.get('ADMIN_RESET_SECRET') || 'Admin2010?';

        if (secret !== ADMIN_SECRET) {
            return new Response(JSON.stringify({ error: 'Unauthorized: Invalid secret' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 401,
            });
        }

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Get user by email
        const { data: userData, error: getUserError } = await supabaseAdmin.auth.admin.listUsers();
        if (getUserError) throw getUserError;

        const user = userData.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 404,
            });
        }

        // 2. Update user password
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
            user.id,
            { password: new_password }
        );

        if (updateError) throw updateError;

        return new Response(JSON.stringify({
            message: `Password resettata con successo per ${email}!`,
            user_id: user.id
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
