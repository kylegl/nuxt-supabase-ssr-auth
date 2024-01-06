import type { Provider, User } from '@supabase/supabase-js'
import type { ShallowRef } from 'vue'

type LoginForm = {
  email: string
  password: string
}

export function useAuth() {
  const { $supabaseClient } = useNuxtApp()
  const { updateUser } = useSupabaseUser()

  async function useSignInWithOAuth(provider: Provider, redirect = '/') {
    const { error } = await $supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
      },
    })

    return { error }
  }

  async function useSignInWithPassword(input: LoginForm) {
    const { data, error } = await $supabaseClient.auth.signInWithPassword(input)

    if(!error)
      updateUser()

    return { data, error }
  }

  async function useSignInWithOtp(input: { email: string, redirect?: string }) {
    const { email, redirect = '/' } = input
    
    return await $supabaseClient.auth.signInWithOtp(
      {
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback/?next=${redirect}`,
        },
      },
    )
  }

  async function useSignOut() {
    const { error } = await $supabaseClient.auth.signOut()

    if(!error)
      updateUser()

    return { error }
  }

  async function useSignUp(input: LoginForm) {
    return await $supabaseClient.auth.signUp(input)
  }

  return {
    useSignInWithOAuth,
    useSignInWithPassword,
    useSignInWithOtp,
    useSignOut,
    useSignUp,
  }
}

export function useSupabaseUser() {
  const { $supabaseClient } = useNuxtApp()

  const user = useState<ShallowRef<User> | null>('supabase-user', () => null)

  async function updateUser() {
    const userResponse = await $supabaseClient.auth.getUser()
    user.value = userResponse.data.user ? shallowRef(userResponse.data.user) : null
  }

  updateUser()

  return {
    user: readonly(user),
    updateUser,
  }
}
