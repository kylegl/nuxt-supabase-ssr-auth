import type { H3Event } from 'h3'
import { getCookie, setCookie } from 'h3'
import { createServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'
import { useRuntimeConfig } from '#imports'

export type SupabaseServerClientOptions = {
  serviceRole?: boolean
}

export async function supabaseServerClient(
  event: H3Event,
  options: SupabaseServerClientOptions = {},
) {
  const {
    public: { supabaseUrl, supabaseKey },
    supabaseServiceKey,
  } = useRuntimeConfig()

  const {
    serviceRole = false,
  } = options

  const k = serviceRole ? supabaseServiceKey : supabaseKey

  if (serviceRole && !supabaseServiceKey)
    throw new Error('Missing "SUPABASE_SERVICE_KEY" in .env')

  return createServerClient(supabaseUrl, k, {
    cookies: {
      get: (name: string) => getCookie(event, name),
      set: (name: string, value: string, options: CookieOptions) => setCookie(event, name, value, options),
      remove: (name: string, options: CookieOptions) => setCookie(event, name, '', options),
    },
  })
}

export async function supabaseServerUser(
  event: H3Event,
  options: SupabaseServerClientOptions = {},
) {
  const {
    serviceRole = false,
  } = options

  const supabase = await supabaseServerClient(event, { serviceRole })

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error)
    throw createError({ statusMessage: error?.message })

  return user
}
