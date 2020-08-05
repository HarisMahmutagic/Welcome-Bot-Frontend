<template>
  <div>
    <div class="button" v-on:click="SwitchToReports">
      Reports
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
    SwitchToReports() {
      const self = this;
      self.$router.push('./ReportsView');
      self.clicked = true;
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 2vh;
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
  box-shadow: 5px 10px;
  opacity: 0.7;
}

.button:hover {
  background-color: cornflowerblue;
  cursor: pointer;
  font-weight: bolder;
  font-size: 3.2vh;
  z-index: 1;
  text-shadow: 3px 3px 3px grey;
  opacity: 1;
}
</style>
