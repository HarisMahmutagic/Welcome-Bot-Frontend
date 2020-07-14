<template>
  <div>
    <div class="button" v-on:click="SwitchToSchedule">Schedules</div>
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
  border: 0.2vh solid black;
  margin-top: 5vh;
  background-color: white;
  height: 5vh;
  line-height: 5vh;
  font-weight: bolder;
  text-align: center;
  font-size: 3.2vh;
}

.button:hover {
  background-color: cornflowerblue;
  cursor: pointer;
  font-size: 3.2vh;
  font-weight: bolder;
}
</style>
