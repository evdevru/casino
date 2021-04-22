<script>
export default {
  middleware({ store, redirect, $axios, $auth, route }) {
    try {
      $axios.get('/api/v1/user/confirmation?token=' + route.params.token)
      return redirect('/profile')
    } catch (e) {}
    // If the user is not authenticated
    return redirect('/')
  },
}
</script>
