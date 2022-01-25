<template>
  <div>
    <Header />
    <h2 class="text-center mt-4">Our best fruits</h2>
    <Fruits :fruits="featuredFruits" />
    <h2 class="text-center mt-4">All of our fruits</h2>
    <Fruits :fruits="notFeaturedFruits" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Homepage'
    }
  },
  computed: {
    featuredFruits() {
      const fruits = this.$store.state.fruits
      if (fruits != null) {
        const featuredFruits = fruits.filter(fruit => fruit.featured == true)
        return featuredFruits
      }
    },
    notFeaturedFruits() {
      const fruits = this.$store.state.fruits
      if (fruits != null) {
        const notFeaturedFruits = fruits.filter(fruit => fruit.featured == false)
        return notFeaturedFruits
      }
    },
  },
  async fetch() {
    try {
      const { data: fruits, error } = await this.$supabase
        .from('fruits')
        .select('*')
      if (error) throw error
      this.$store.commit('fruitsUpdate', fruits)
    } catch (error) {
      this.$store.dispatch('modalSubmit', error.message)
    }
    try {
      const { data: profile, error } = await this.$supabase
        .from('profiles')
        .select('*')
        .limit(1)
      if (error) throw error
      this.$store.commit('profileUpdate', profile)
    } catch (error) {
      this.$store.dispatch('modalSubmit', error.message)
    }
  }
}
</script>
