<template>
  <Header>
    <template #heading>
      <div class="text-center">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <p class="text-sm mb-3">{{ error.message }}</p>
      </div>
    </template>
    <template #desc>
      <div class="flex justify-center">
        <NuxtLink class="btn btn-primary rounded-md" to="/">Home page</NuxtLink>
      </div>
    </template>
  </Header>
</template>

<script>
export default {
  head() {
    return {
      title: 'Error'
    }
  },
  props: ['error']
}
</script>
