import React from 'react'
import supabaseClient from '../supabaseClient'

const SignIn = () => {
    const signInWithDiscord = async () => {
        const { user, session, error } = await supabaseClient.auth.signIn({
            provider: 'discord'
        });
    }
    return (
        <button onClick={signInWithDiscord}>Sign in with discord</button>
    )
};

export default SignIn