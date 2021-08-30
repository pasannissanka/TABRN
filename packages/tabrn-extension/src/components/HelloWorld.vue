<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
    browser.runtime.sendMessage({});
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
