<template>
  <div class="container mx-auto fixed inset-x-0 bottom-full max-w-lg transition-all" :class="[ theData ? 'transform translate-y-full' : '']">
    <div class="card bg-cyan-400 dark:bg-stone-800 mx-3 my-3 py-2 px-3">
      <h3 class="mt-0">{{ theData }}</h3>
      <div class="flex justify-end">
        <button @click="ok" class="btn btn-primary px-5">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    theData() {
      return this.$store.state.modal
    }
  },
  methods: {
    ok() {
      this.$store.commit('modalUpdate', null)
    }
  }
}
</script>