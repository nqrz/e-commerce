<template>
  <header class="py-20 bg-cyan-400 dark:bg-stone-800">
    <template>
      <slot name="heading">
        <figure>
          <img class="mx-auto" src="/favicon-32x32.png" alt="Avocado icon">
        </figure>
        <h1 class="text-center">Fruit shop</h1>
      </slot>
    </template>
    <template>
      <slot name="desc">
        <p class="text-center">Don't forget to eat fruit everyday!👍</p>
      </slot>
    </template>
  </header>
</template>