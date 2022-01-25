<script>
export default {
  props: {
    fruits: Array
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async addToCart(fruit) {
      try {
        const { data: cart, error } = await this.$supabase
          .from('cart')
          .insert([
            { fruit_id: fruit.id, user_id: this.user },
          ])
        if (error) throw error
        console.log(`Added ${fruit.name} to cart id: ${cart.id}`);
      } catch (error) {
        this.$store.dispatch('modalSubmit', error)
      }
    }
  }
}
</script>

<template>
  <div class="container max-w-screen-md p-3">
    <div class="grid grid-cols-3 gap-4">
      <div class="card p-3" v-for="fruit in fruits" :key="fruit.name">
        <figure class="h-36 overflow-hidden rounded-md">
          <img :src="fruit.image_url" :alt="`${fruit.name} photo`">
        </figure>
        <h3 class="pt-2">
          {{ fruit.name }}
        </h3>
        <p>
          Only ${{ fruit.price }}
        </p>
        <p>
          {{ fruit.description }}
        </p>
        <div class="grid grid-cols-3 mt-2">
          <button @click="addToCart(fruit)" class="btn btn-primary col-end-4">
            + Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>