import type { EmailOtpType } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token_hash = query?.token_hash as string | null
  const type = query?.type as EmailOtpType | null
  const next = query?.next as string ?? '/'

  if (!token_hash || !type) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const supabase = await supabaseServerClient(event)

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  })

  if (!error)
    await sendRedirect(event, next)
})
