<template>
  <div class="m-1">
    <div class="w-100 grid gap-2 grid-cols-6 mb-2 mt-4 mx-5">
      <div
        class="flex flex-wrap col-span-4 content-center text-center text-base"
      >
        Clear Cookies
      </div>
      <div class="col-span-2">
        <button
          v-on:click="clearCookies"
          class="
            focus:ring-primary-200
            btn-primary
            inline-flex
            justify-center
            ml-1
            mr-5
            mx-2
            px-4
            py-2
            w-full
            text-sm
            font-medium
            border border-transparent
            rounded-md
            transition-colors
            duration-300
            focus:ring-1
          "
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearCookies() {
      browser.runtime
        .sendMessage({ message: 'remove_cookie_consent' })
        .then((data) => {
          if (data) {
            console.log('consent removed', data);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
