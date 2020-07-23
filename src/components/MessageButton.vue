<template>
  <div>
    <div class="button" v-on:click="SwitchToMessages">
      &#x2709; Messages
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageButton',
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    // Routing to message view on click
    SwitchToMessages() {
      const self = this;
      self.$router.push('./MessagesView');
      self.clicked = true;
    },
  },
};
</script>

<style scoped>
.button {
  border: 0.2vh solid rgb(126, 125, 125);
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  height: 5vh;
  width: 20vh;
  line-height: 5vh;
  font-weight: bolder;
  text-align: center;
  font-size: 3.2vh;
  z-index: 1;
  text-shadow: 3px 3px 3px grey;
}

.button:hover {
  background-color: cornflowerblue;
  cursor: pointer;
  font-weight: bolder;
  font-size: 3.2vh;
  z-index: 1;
  text-shadow: 3px 3px 3px grey;
}
</style>
