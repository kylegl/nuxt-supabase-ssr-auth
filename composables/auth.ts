import type { Provider } from '@supabase/supabase-js'

type LoginForm = {
  email: string
  password: string
}

export function useAuth() {
  const { $supabaseClient } = useNuxtApp()
  
  async function useSignInWithOAuth(provider: Provider, redirect?: string) {
    await $supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirect || '/test'}`,
      },
    })
  }

  async function useSignInWithPassword(input: LoginForm) {
    return await $supabaseClient.auth.signInWithPassword(input)
  }

  async function useSignInWithOtp(input: {email: string}) {
    return await $supabaseClient.auth.signInWithOtp(input)
  }

  return {
    useSignInWithOAuth,
    useSignInWithPassword,
    useSignInWithOtp,
  }
}
