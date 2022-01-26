<script>
export default {
  middleware({ store, redirect }) {
    // If the user is not logged in
    if (!store.state.session) {
      return redirect('profile/login')
    }
  }
}
</script>

<template>
  <div>
    <h1>You're in checkout page</h1>
    <p>This page should contain the cart items section, destination, and payment methods</p>
  </div>
</template>