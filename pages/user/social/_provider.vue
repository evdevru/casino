<script>
export default {
  async middleware({ redirect, $axios, $auth, route }) {
    const vkParams = Object.fromEntries(
      new URLSearchParams(route.hash.replace('#', ''))
    )
    try {
      const social = await $axios.post(
        '/api/v1/auth/social',
        {
          provider: route.params.provider,
          ...vkParams,
        },
        {
          headers: {
            Authorization: vkParams.state,
          },
        }
      )
      await $auth.setUserToken(social.data.data.token)
      await $auth.fetchUser()
      return redirect('/profile')
    } catch (e) {
      console.log(e)
    }
    // If the user is not authenticated
    return redirect('/')
  },
}
</script>
