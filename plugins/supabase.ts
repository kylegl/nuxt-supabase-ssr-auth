import { createBrowserClient } from '@supabase/ssr'

export default defineNuxtPlugin(() => {
  const { supabaseUrl, supabaseKey } = useRuntimeConfig().public

  const supabaseClient = createBrowserClient(supabaseUrl, supabaseKey)

  return {
    provide: {
      supabaseClient,
    },
  }
})
