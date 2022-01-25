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
  }
}
</script>

<template>
  <Header>
    <template #heading>
      <figure>
        <img class="max-w-xs mx-auto" :src="profile.avatar_url" :alt="`${profile.username} profile picture`">
      </figure>
      <h1 class="text-center">{{ profile.username }}</h1>
    </template>
    <template #desc>
      <a class="text-center" :href="`${profile.website}`" target="_blank" ref="noopener noreferrer">
        {{ profile.website }}
      </a>
    </template>
  </Header>
</template>