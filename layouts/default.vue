<script>
export default {
  async mounted() {
    const user = await this.$supabase.auth.user()
    if (user) {
      this.$store.commit('authListener', user.id)
    }
    this.$supabase.auth.onAuthStateChange((event, session) => {
      if (session != null) {
        this.$store.commit('authListener', session.user.id)
      } else {
        this.$store.commit('authListener', null)
      }
    })
  }
}
</script>

<template>
  <div>
    <PromptModal />
    <Navbar />
    <Nuxt />
  </div>
</template>
