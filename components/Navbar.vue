<script>
export default {
  data() {
    return {
      mode: this.$colorMode.preference
    }
  },
  watch: {
    mode(mode) {
      this.$colorMode.preference = mode
    }
  },
  methods: {
    async logout() {
      this.$router.push('/')
      await this.$supabase.auth.signOut()
      console.log('Successfully logged out');
    },
    toggleMode() {
      const allMode = ['system', 'dark', 'light']
      const modeNow = allMode.indexOf(this.mode)
      if (modeNow < allMode.length - 1) {
        this.mode = allMode[modeNow + 1]
      } else {
        this.mode = allMode[0]
      }
    }
  },
  computed: {
    session() {
      return this.$store.state.session
    }
  }
}
</script>

<template>
  <div class="bg-blue-100 dark:bg-stone-700">
    <div class="container max-w-screen-lg flex justify-between text-lg">
      <NuxtLink to="/" class="link font-bold">
        <img class="my-0 mr-2" src="/favicon-32x32.png" alt="Avocado icon">
        Fruit Shop
      </NuxtLink>
      <div class="flex">
        <NuxtLink class="link" to="/">
          <i class="fas fa-home mr-2"></i>
          Home
        </NuxtLink>
        <NuxtLink v-if="!session" class="link" to="/profile/login">
          <i class="fas fa-user mr-2"></i>
          Login
        </NuxtLink>
        <template v-else>
          <NuxtLink class="link" to="/cart">
            <i class="fas fa-shopping-cart mr-2"></i>
            Cart
          </NuxtLink>
          <NuxtLink class="link" to="/profile">
            <i class="fas fa-user mr-2"></i>
            Profile
          </NuxtLink>
          <button class="flex items-center py-2 px-3" @click="logout">
            <i class="fas fa-door-open"></i>
          </button>
        </template>
        <button class="flex items-center py-2 px-3" @click="toggleMode">
          <i v-if="mode == 'dark'" class="fas fa-moon"></i>
          <i v-else-if="mode == 'light'" class="fas fa-sun"></i>
          <i v-else class="fas fa-desktop"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link {
  @apply flex items-center py-2 px-3 no-underline hover:underline
}
</style>