<template>
  <div class="table">
    <table>
      <tr class="headRow">
        <td>Title</td>
        <td>Text</td>
        <td>Created At</td>
        <td>Actions</td>
      </tr>
      <tr class="row" v-for="message in allMessages" :key="message.id">
        <td class="title">{{ message.title }}</td>
        <td class="text">{{ message.text }}</td>
        <td class="date">{{ message.cr_date }}</td>
        <td class="action">Actions</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MessageTable',
  methods: {
    ...mapActions(['fetchMessages']),
  },
  computed: mapGetters(['allMessages']),
  created() {
    this.fetchMessages();
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
.text {
  width: 23vw;
  max-width: 23vw;
}
.date {
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
