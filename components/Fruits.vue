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
      <NuxtLink :to="`/fruit/${fruit.name}`" v-for="fruit in fruits" :key="fruit.id">
        <div class="card border border-cyan-400 hover:border-cyan-300 hover:bg-cyan-300 dark:border-0 dark:hover:bg-stone-800 transition-all transform hover:scale-105">
          <div class="h-36 w-full bg-cover bg-center rounded-t-md" :style="{ backgroundImage: `url(${fruit.image_url})` }" />
          <div class="p-3">
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
        </div>
      </NuxtLink>
    </div>
  </div>
</template>