<template>
  <div id="ErrorView">
    <h1>Network Error</h1>
    <p>Can't connect with Database !</p>
    <p>Will be back to login page in</p>
    <h1>{{ Timer }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Error',

  data() {
    return {
      Timer: 5,
    };
  },
  created() {
    const self = this;
    setInterval(function () {
      // eslint-disable-next-line no-plusplus
      self.Timer--;
      if (self.Timer === 0) {
        self.$router.push('/');
      }
    }, 1000);
  },
};
</script>

<style scoped>
#ErrorView {
  height: 100%;
  width: 100%;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  text-align: center;
}
</style>
