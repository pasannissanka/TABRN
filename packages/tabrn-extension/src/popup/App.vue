<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html {
  width: 500px;
  height: 200px;
}

/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */

@tailwind utilities;

@layer base {
  input[type='text'],
  input[type='password'],
  input[type='email'],
  input[type='number'],
  input[type='url'],
  input[type='date'],
  input[type='datetime-local'],
  input[type='month'],
  input[type='week'],
  input[type='time'],
  input[type='search'],
  input[type='tel'],
  input[type='checkbox'],
  input[type='radio'],
  select,
  select[multiple],
  textarea,
  p.tribute-input {
    @apply focus:border-primary-300 focus:ring-primary-200 block px-4 py-2 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-opacity-50;
  }
}
.btn {
  @apply bg-primary-500 hover:bg-primary-600 text-white;
}
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white;
}
.btn-secondary {
  @apply bg-secondary-500 hover:bg-secondary-600 text-black;
}
.btn-warn {
  @apply bg-warn-500 hover:bg-warn-600 text-white;
}
.btn-outline {
  @apply text-black hover:bg-gray-200 bg-gray-50;
}
.btn-outline-primary {
  @apply text-primary-700 hover:bg-primary-200 bg-gray-50;
}
.btn-outline-secondary {
  @apply text-secondary-700 hover:bg-secondary-200 bg-gray-50;
}
.btn-outline-warn {
  @apply text-warn-700 hover:bg-warn-300 bg-gray-50;
}
</style>
