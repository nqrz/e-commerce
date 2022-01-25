<script>
export default {
  head() {
    return {
      title: 'Profile'
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile
    }
  },
  middleware({ store, redirect }) {
    // If the user is not logged in
    if (!store.state.session) {
      return redirect('profile/login')
    }
  }
}
</script>

<template>
  <Header>
    <template #heading>
      <figure>
        <img class="w-20 h-20 mx-auto" :src="profile.avatar_url" :alt="`${profile.username} profile picture`">
      </figure>
      <h1 class="text-center">{{ profile.username }}</h1>
    </template>
    <template #desc>
      <div class="flex justify-center">
        <button class="btn btn-secondary">
          <a :href="`${profile.website}`" target="_blank" ref="noopener noreferrer">
            {{ profile.website }}
          </a>
        </button>
      </div>
    </template>
  </Header>
</template>