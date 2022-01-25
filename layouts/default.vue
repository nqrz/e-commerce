<script>
export default {
  async mounted() {
    const user = await this.$supabase.auth.user()
    if (user) {
      this.$store.commit('authListener', user.id)
      this.fetchInitialData()
    }
    this.$supabase.auth.onAuthStateChange((event, session) => {
      if (session != null) {
        console.log(event);
        this.$store.commit('authListener', session.user.id)
        this.fetchInitialData()
      } else {
        console.log(event);
        this.$store.commit('authListener', null)
        this.$store.commit('profileUpdate', null)
      }
    })
  },
  methods: {
    async fetchInitialData() {
      // Fetch profile page with all the item cart that user has
      try {
        const { data, error } = await this.$supabase
          .from('profiles')
          .select('*, cart(*, fruits(*))')
          .limit(1)
        if (error) throw error
        const { cart, ...profile } = data[0]
        this.$store.commit('cartUpdate', cart)
        this.$store.commit('profileUpdate', profile)
      } catch (error) {
        this.$store.dispatch('modalSubmit', error.message)
      }
    }
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
