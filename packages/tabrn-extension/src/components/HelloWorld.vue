<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
    browser.runtime
      .sendMessage({ message: 'get_cookie_consent' })
      .then((data) => {
        if (data) {
          this.$router.push('Login');
        } else {
          this.$router.push('Cookie');
        }
      })
      .catch((err) => console.log(err));
  },
  computed: {
    defaultText() {
      return 'Hello';
    },
  },
  methods: {
    click: function () {
      console.log(this);
      this.$router.push('about');
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
