<template>
  <div>
    <div class="button" v-on:click="SwitchToSchedule">
      Schedules
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleButton',

  methods: {
    // Routing to message view on click
    SwitchToSchedule() {
      const self = this;
      self.$router.push('./SchedulesView');
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 3vh;
  background-color: white;
  height: 5vh;
  margin-left: auto;
  margin-right: auto;
  width: 20vh;
  line-height: 5vh;
  font-weight: bolder;
  text-align: center;
  font-size: 3.2vh;
  text-shadow: 3px 3px 3px grey;
  box-shadow: 5px 10px;
  opacity: 0.7;
}

.button:hover {
  background-color: cornflowerblue;
  cursor: pointer;
  font-size: 3.2vh;
  font-weight: bolder;
  text-shadow: 3px 3px 3px grey;
  opacity: 1;
}
</style>
