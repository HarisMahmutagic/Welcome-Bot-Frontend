<template>
  <div class="table">
    <table>
      <tr class="headRow">
        <td>Message</td>
        <td>Next Run</td>
        <td>Active At</td>
        <td>Actions</td>
      </tr>
      <tr class="row" v-for="(schedule, index) in allSchedules" :key="index">
        <td class="title">{{ schedule.message }}</td>
        <td class="run">{{ schedule.run_date }}</td>
        <td class="active">{{ schedule.active }}</td>
        <td class="action">Actions</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ScheduleTable',
  methods: {
    ...mapActions(['fetchSchedules']),
  },
  computed: mapGetters(['allSchedules']),
  created() {
    this.fetchSchedules();
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  height: 100%;
  border-spacing: 0;
  overflow: auto;
}

table {
  margin: 0 auto;
}

tr {
  position: relative;
}

td {
  overflow: auto;
  height: 10vh;
}

.title {
  width: 8vw;
  max-width: 8vw;
}
.run {
  width: 23vw;
  max-width: 23vw;
}
.active {
  width: 6vw;
  max-width: 6vw;
}
.action {
  width: 10vw;
  max-width: 10vw;
}

.headRow td {
  height: 5vh;
  font-size: 2.5vh;
  background-color: rgb(143, 143, 143);
  color: white;
  text-align: center;
}
.row td {
  font-size: 2.5vh;
  background-color: white;
  color: black;
  text-align: center;
}
</style>
