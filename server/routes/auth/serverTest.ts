export default defineEventHandler(async (event) => {
  const user = await supabaseServerUser(event)

  console.log({ user })
})
