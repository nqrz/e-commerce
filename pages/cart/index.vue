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
        .select('*, fruits(*)')
      if (error) throw error
      this.$store.commit('cartUpdate', cart)
    } catch (error) {
      this.$store.dispatch('modalSubmit', error.message)
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },
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
  <div>
    <Header>
      <template #heading>
        <p class="text-4xl text-center">🛒</p>
        <h1 class="text-center">Cart</h1>
      </template>
      <template #desc>
        <p class="text-center">Don't forget to checkout</p>
      </template>
    </Header>
    <div class="container max-w-screen-lg grid grid-cols-3">
      <div class="col-span-2">
        <div class="card p-3 m-3 flex items-center" v-for="item in cart" :key="item.id">
          <figure class="max-w-xs rounded-md overflow-hidden">
            <img :src="item.fruits.image_url" :alt="`${item.fruits.name} photo`">
          </figure>
          <div class="ml-10">
            <h3 class="pt-2">
              {{ item.fruits.name }}
            </h3>
            <p>
              {{ item.description }}
            </p>
            <p>
              Price $ {{ item.fruits.price }}
            </p>
            <p>
              Qty : {{ item.qty }}
            </p>
            <p>
              Total $ {{ item.total }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <CartSummary :cart="cart" />
      </div>
    </div>
  </div>
</template>