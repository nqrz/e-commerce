<script>
export default {
  head() {
    return {
      title: 'Cart'
    }
  },
  async fetch() {
    try {
      const { data: cart, error } = await this.$supabase
        .from('cart')
        .select('*')
      if (error) throw error
      this.$store.commit('cartUpdate', cart)
    } catch (error) {
      this.$store.dispatch('modalSubmit', error.message)
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    }
  }
}
</script>

<template>
  <pre>
    {{ cart }}
  </pre>
</template>