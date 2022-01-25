<script>
export default {
  props: {
    fruits: Array
  },
  computed: {
    session() {
      return this.$store.state.session
    },
    cart() {
      return this.$store.state.cart
    }
  },
}
</script>

<template>
  <div class="container max-w-screen-md p-3">
    <div class="grid grid-cols-3 gap-4">
      <NuxtLink :to="`/fruit/${fruit.id}`" v-for="fruit in fruits" :key="fruit.name">
        <div class="card p-3">
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
        </div>
      </NuxtLink>
    </div>
  </div>
</template>