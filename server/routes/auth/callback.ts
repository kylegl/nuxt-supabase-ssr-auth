export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const code = query?.code
  const next = query?.next as string | null

  if (!code) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const supabase = await supabaseServerClient(event)
  const { error } = await supabase.auth.exchangeCodeForSession(code as string)

  if (!error)
    await sendRedirect(event, `/login?next=${next}`)

})
