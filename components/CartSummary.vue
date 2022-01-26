<script>
export default {
  props: {
    cart: Array
  },
  data() {
    return {
      total: 0
    }
  },
  watch: {
    cart(cart) {
      for (const item in cart) {
        if (Object.hasOwnProperty.call(cart, item)) {
          const { total } = cart[item];
          this.total += total
        }
      }
    }
  }
}
</script>

<template>
  <div class="sticky top-6 card m-3 ml-0 p-3">
    <h2 class="text-center">Summary</h2>
    <table class="w-full">
      <thead>
        <tr class="text-left border-b-2 border-black dark:border-white">
          <th>Fruit</th>
          <th class="w-14">Qty</th>
          <th class="w-14">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>
            {{ item.fruits.name }}
          </td>
          <td>
            {{ item.qty }}
          </td>
          <td>
            $ {{ item.qty * item.fruits.price }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="grid grid-cols-3 mt-3 items-center">
      <p class="text-lg text-right col-span-2 mr-3">
        Total : $ {{ total }}
      </p>
      <NuxtLink to="/cart/checkout" class="btn btn-primary text-center">
        Checkout
      </NuxtLink>
    </div>
  </div>
</template>