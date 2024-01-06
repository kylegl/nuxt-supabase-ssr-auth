export default defineNuxtRouteMiddleware(async () => {
  if (process.server)
    return

  const { user, updateUser } = useSupabaseUser()
  await updateUser()
  
  if (!user.value)
    return navigateTo('/')
})
