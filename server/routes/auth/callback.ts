export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const code = query?.code
  const next = query?.next as string ?? '/'

  if (!code) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const supabase = await supabaseServerClient(event)
  const { error } = await supabase.auth.exchangeCodeForSession(code as string)

  if (!error)
    await sendRedirect(event, next)

})
