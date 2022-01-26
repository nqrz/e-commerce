<script>
export default {
  async asyncData({ $supabase, store, params }) {
    const { data: fruit, error } = await $supabase
      .from('fruits')
      .select('*')
      .eq('name', params.name)
    
    if (error) {
      store.dispatch('modalSubmit', error)
    }

    return {
      fruit: fruit[0]
    }
  },
  data() {
    return {
      qty: 0,
      total: 0,
      session: this.$store.state.session
    }
  },
  watch: {
    qty(qty) {
      const total = this.qty * this.fruit.price
      this.total = total
    }
  },
  methods: {
    cart() {
      return this.$store.state.cart
    },
    async handleAddToCart() {
      try {
        const cart = this.cart()

        // find fruit in the cart and get the id data
        const fruitInCart = cart.find(cart => cart.fruit_id == this.fruit.id)
        if (fruitInCart) {
          const { id, fruit_id } = fruitInCart
          try {
            const { data, error } = await this.$supabase
              .from('cart')
              .upsert([
                {
                  id: id,
                  fruit_id: fruit_id,
                  user_id: this.$store.state.session,
                  qty: this.qty,
                  total: this.total
                },
              ])
            if (error) throw error
            console.log(data);
            console.log(`Added ${this.fruit.name} with qty: ${this.qty}`);
          } catch (error) {
            this.$store.dispatch('modalSubmit', error)
          }
        } else {
          try {
            const { data, error } = await this.$supabase
              .from('cart')
              .upsert([
                {
                  fruit_id: this.fruit.id,
                  user_id: this.$store.state.session,
                  qty: this.qty,
                  total: this.total
                },
              ])
            if (error) throw error
            console.log(data);
            console.log(`Added ${this.fruit.name} with qty: ${this.qty}`);
          } catch (error) {
            this.$store.dispatch('modalSubmit', error)
          }
        }
      } catch (error) {
        this.$store.dispatch('modalSubmit', error)
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="banner">
      <div class="container max-w-[75vw] flex items-center justify-center">
        <figure>
          <img class="max-w-md rounded-xl shadow-md" :src="fruit.image_url" :alt="`${fruit.name} image`">
        </figure>
        <div class="ml-10">
          <h1>{{ fruit.name }}</h1>
          <p>{{ fruit.description }}</p>
          <p>Price: $ {{ fruit.price }}</p>
          <p>Stock : {{ fruit.stock }}</p>
          <form @submit.prevent="handleAddToCart" class="flex flex-col">
            <input class="input mt-3 mb-1" type="number" name="qty" id="qty" v-model="qty" min="0" :max="fruit.stock" step="5">
            <p class="text-xs text-center">Minimal 5</p>
            <p class="my-3">Total price : $ {{ total }}</p>
            <button type="submit" class="btn btn-primary" :disabled="!session" :title="[ session ? '' : 'You must login first' ]">
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>