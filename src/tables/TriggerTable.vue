<template>
  <div class="table">
    <table>
      <tr class="headRow">
        <td>Message</td>
        <td>Trigger</td>
        <td>Channel</td>
        <td>Active</td>
        <td>Actions</td>
      </tr>
      <tr class="row" v-for="(trigger, index) in allTriggers" :key="index">
        <td class="title">{{ trigger.message }}</td>
        <td class="trigger">{{ trigger.trigger_word }}</td>
        <td class="channel">{{ trigger.channel }}</td>
        <td class="active">{{ trigger.active }}</td>
        <td class="action">Actions</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TriggerTable',
  methods: {
    ...mapActions(['fetchTriggers']),
  },
  computed: mapGetters(['allTriggers']),
  created() {
    this.fetchTriggers();
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
  width: 12vw;
  max-width: 12vw;
}
.trigger {
  width: 12vw;
  max-width: 12vw;
}
.channel {
  width: 12vw;
  max-width: 12vw;
}
.active {
  width: 11vw;
  max-width: 11vw;
}
.action {
  width: 8vw;
  max-width: 8vw;
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
