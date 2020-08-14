<template>
  <div id="ReportsView">
    <!-- BOX1 First row - Header -->

    <div class="box1">
      <a id="title">Reports View</a>

      <!-- DropDown menu -->
      <div id="dropDownButton" v-on:click="dropDownOnOff">&#9776;</div>
      <div
        id="routeMessageView"
        v-if="dropDown != true"
        v-on:click="goToMessage"
      >
        &#x2709; Messages
      </div>
      <div
        id="routeScheduleView"
        v-if="dropDown != true"
        v-on:click="goToSchedule"
      >
        &#x1F4C5; Schedules
      </div>
      <div
        id="routeTriggerView"
        v-if="dropDown != true"
        v-on:click="goToTrigger"
      >
        &#x26A1; Triggers
      </div>
      <div
        id="routeReportsView"
        v-if="dropDown != true"
        v-on:click="goToReports"
      >
        &#x211D; Reports
      </div>
      <div id="routeLoginView" v-if="dropDown != true" v-on:click="goToLogin">
        &#x1F3E0; Logout
      </div>
    </div>

    <!-- BOX2 Left side with buttons -->

    <div class="box2">
      <MessageButton></MessageButton>
      <ScheduleButton></ScheduleButton>
      <TriggerButton></TriggerButton>
      <ReportsButton></ReportsButton>
      <LogOutButton></LogOutButton>
    </div>
    <!-- BOX3 Right side with table -->
    <div class="box3">
      <div class="header">
        <div v-on:click="setToUsage" id="graphButton">Bot graph</div>
        <div v-on:click="setToReports" id="reportButton">Bot report</div>
      </div>
      <div class="usage" v-if="switcher">
        <div class="graph">
          <graph-line
            :height="350"
            :shape="'normal'"
            :axis-min="0"
            :axis-full-mode="true"
            :labels="labels"
            :names="names"
            :values="values"
            :opacity="1"
          >
            <note :text="'Bot usage'"></note>
            <tooltip :names="names" :position="'right'"></tooltip>
            <legends :names="names"></legends>
            <guideline :tooltip-y="true"></guideline>
          </graph-line>
        </div>
      </div>
      <div class="reports" v-if="!switcher">
        <table>
          <tr id="headRow">
            <th>ID</th>
            <th>Report Name</th>
            <th>Report Value</th>
            <th>Updated</th>
          </tr>
          <tr v-for="report in reports" :key="report.id" id="list">
            <th>{{ report.id }}</th>
            <th>{{ report.report_name }}</th>
            <th>{{ report.report_value }}</th>
            <th>{{ report.last_update }}</th>
          </tr>
        </table>
      </div>
    </div>

    <!-- BOX4 - Bottom div ( footer ) -->

    <div class="box4"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MessageButton from '../components/MessageButton.vue';
import ScheduleButton from '../components/ScheduleButton.vue';
import TriggerButton from '../components/TriggerButton.vue';
import ReportsButton from '../components/ReportsButton.vue';
import LogOutButton from '../components/LogOutButton.vue';

export default {
  name: 'Error',

  data() {
    return {
      dropDown: true,
      names: ['BOT used'],
      switcher: true,
    };
  },
  components: {
    MessageButton,
    ScheduleButton,
    TriggerButton,
    ReportsButton,
    LogOutButton,
  },
  computed: mapGetters(['token', 'labels', 'values', 'reports']),
  created() {
    if (this.token !== '') {
      this.fetchUsage(this.token);
      this.fetchReports(this.token);
    }
    if (this.token === '') {
      this.$router.push('/');
    }
  },
  methods: {
    setToUsage() {
      this.switcher = true;
    },
    setToReports() {
      this.switcher = false;
    },
    ...mapActions(['fetchUsage', 'fetchReports']),
    // Function for opening drop down menu
    dropDownOnOff() {
      const self = this;
      if (self.dropDown === false) {
        self.dropDown = true;
      } else {
        self.dropDown = false;
      }
    },
    // Router to Message view
    goToMessage() {
      const self = this;
      self.$router.push('./MessagesView');
    },

    // Router to Schedule view
    goToSchedule() {
      const self = this;
      self.$router.push('./SchedulesView');
    },

    // Router to Trigger view
    goToTrigger() {
      const self = this;
      self.$router.push('./TriggerView');
    },

    // Router to Reports view
    goToReports() {
      const self = this;
      self.dropDown = true;
    },

    // Router to Login view
    goToLogin() {
      const empty = '';
      this.$store.commit('getToken', empty);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
#ReportsView {
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 5% 85% 10%;
  width: 120vh;
  height: 80vh;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.box1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

#title {
  font-size: 2.4vh;
  font-weight: bolder;
  margin-top: 1%;
  margin-left: 1%;
  position: absolute;
}

.box2 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
}

.box3 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  overflow: auto;
  display: grid;
  grid-template-rows: 7vh 60vh;
}

.header {
  display: grid;
  grid-template-columns: 15vh 15vh;
  justify-content: space-around;
}

#graphButton {
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: white;
  height: 4vh;
  width: 12vh;
  margin-left: 20%;
  font-size: 2vh;
  font-weight: bolder;
  text-align: center;
  text-shadow: 3px 3px 3px grey;
  box-shadow: -5px 5px;
  opacity: 0.7;
  line-height: 3vh;
  cursor: pointer;
}

#graphButton:hover {
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: white;
  height: 4vh;
  width: 12vh;
  margin-left: 20%;
  font-size: 2vh;
  font-weight: bolder;
  text-align: center;
  text-shadow: 3px 3px 3px grey;
  box-shadow: -5px 5px;
  opacity: none;
  line-height: 3vh;
  cursor: pointer;
  background-color: cornflowerblue;
}

#reportButton {
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: white;
  height: 4vh;
  width: 12vh;
  font-size: 2vh;
  font-weight: bolder;
  text-align: center;
  text-shadow: 3px 3px 3px grey;
  box-shadow: -5px 5px;
  opacity: 0.7;
  line-height: 3vh;
  cursor: pointer;
}

#reportButton:hover {
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: white;
  height: 4vh;
  width: 12vh;
  font-size: 2vh;
  font-weight: bolder;
  text-align: center;
  text-shadow: 3px 3px 3px grey;
  box-shadow: -5px 5px;
  opacity: none;
  line-height: 3vh;
  cursor: pointer;
  background-color: cornflowerblue;
}

.usage {
  text-align: center;
  padding-top: 1vh;
  opacity: 0.7;
  width: 100%;
  height: 100%;
}

.reports {
  text-align: center;
  padding-top: 1vh;
  opacity: 0.7;
  width: 100%;
  height: 100%;
}

table {
  width: 100%;
  height: 100%;
  border-spacing: 0;
  overflow: auto;
  background: white;
}

#headRow {
  background-color: rgb(143, 143, 143);
  color: white;
  text-align: center;
  font-size: 2.5vh;
}

tr {
  position: relative;
}

#list {
  background: lightgray;
  font-size: 1.8vh;
  color: black;
}

th {
  overflow: auto;
  height: 1vh;
}

.graph {
  width: 100%;
}

graph-line {
  width: 100%;
}

.box4 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
}

#dropDownButton {
  display: none;
}

#routeMessageView {
  display: none;
}

#routeScheduleView {
  display: none;
}

#routeTriggerView {
  display: none;
}

#routeReportsView {
  display: none;
}

#routeLoginView {
  display: none;
}

@media screen and (max-width: 600px) {
  #ReportsView {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 7% 83% 10%;
    width: 99vw;
    height: 99vh;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }

  .box1 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    border: 0.1vw solid black;
  }

  #title {
    font-size: 4vh;
    font-weight: bolder;
    margin-top: 1%;
    margin-left: 1%;
    position: absolute;
  }

  .box2 {
    display: none;
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .box3 {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 2;
    grid-row-end: 3;
    overflow: auto;
  }

  .header {
    display: grid;
    grid-template-columns: 15vw 15vw;
    justify-content: space-around;
  }

  #graphButton {
    grid-column-start: 1;
    grid-column-end: 2;
    background-color: white;
    margin-top: 10%;
    height: 8vw;
    width: 15vw;
    margin-left: 5%;
    font-size: 4vw;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: 0.7;
    line-height: 4vw;
    cursor: pointer;
  }

  #graphButton:hover {
    grid-column-start: 1;
    grid-column-end: 2;
    background-color: white;
    height: 8vw;
    width: 15vw;
    margin-top: 10%;
    margin-left: 5%;
    font-size: 4vw;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: none;
    line-height: 4vw;
    cursor: pointer;
    background-color: cornflowerblue;
  }

  #reportButton {
    grid-column-start: 2;
    grid-column-end: 3;
    background-color: white;
    height: 8vw;
    margin-top: 10%;
    width: 15vw;
    font-size: 4vw;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: 0.7;
    line-height: 4vw;
    cursor: pointer;
  }

  #reportButton:hover {
    grid-column-start: 2;
    grid-column-end: 3;
    background-color: white;
    margin-top: 10%;
    height: 8vw;
    width: 15vw;
    font-size: 4vw;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: none;
    line-height: 4vw;
    cursor: pointer;
    background-color: cornflowerblue;
  }

  .usage {
    text-align: center;
    padding-top: 1vw;
    opacity: 0.7;
    width: 99%;
  }

  .reports {
    text-align: center;
    padding-top: 1vw;
    opacity: 0.7;
    width: 100%;
    height: 100%;
  }

  table {
    width: 100%;
    height: 74vh;
    margin-top: 4%;
    border-spacing: 0;
    overflow: auto;
    background: white;
  }

  #headRow {
    background-color: rgb(143, 143, 143);
    color: white;
    text-align: center;
    font-size: 4vw;
  }

  tr {
    position: relative;
  }

  #list {
    background: lightgray;
    font-size: 4vw;
    color: black;
  }

  th {
    overflow: auto;
  }

  .graph {
    margin-top: 5%;
    width: 99vw;
  }

  graph-line {
    width: 99vw;
  }

  .box4 {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #dropDownButton {
    height: 80%;
    width: 22vw;
    margin-right: 2%;
    display: unset;
    float: right;
    text-align: center;
    font-size: 6vw;
    line-height: 100%;
    cursor: pointer;
    z-index: 1;
  }

  #routeMessageView {
    display: unset;
    height: 10vw;
    width: 30vw;
    background-color: rgb(109, 109, 109);
    border: 0.1vw solid black;
    position: absolute;
    right: 2%;
    top: 6.3vw;
    text-align: center;
    font-size: 4.5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
    z-index: 1;
  }

  #routeScheduleView {
    display: unset;
    height: 10vw;
    width: 30vw;
    background-color: rgb(109, 109, 109);
    border: 0.1vw solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 15vw;
    text-align: center;
    font-size: 4.5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
    z-index: 1;
  }

  #routeTriggerView {
    display: unset;
    height: 10vw;
    width: 30vw;
    background-color: rgb(109, 109, 109);
    border: 0.1vw solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 25vw;
    text-align: center;
    font-size: 4.5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
    z-index: 1;
  }

  #routeReportsView {
    display: unset;
    height: 10vw;
    width: 30vw;
    background-color: rgb(109, 109, 109);
    border: 0.1vw solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 35vw;
    text-align: center;
    font-size: 4.5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
    z-index: 1;
  }

  #routeLoginView {
    display: unset;
    height: 10vw;
    width: 30vw;
    background-color: rgb(109, 109, 109);
    border: 0.1vw solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 45vw;
    text-align: center;
    font-size: 4.5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
    z-index: 1;
  }
}

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width: 601px) {
  #ReportsView {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 8% 82% 10%;
    width: 150vh;
    height: 90vh;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .box1 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  #title {
    font-size: 4vh;
    font-weight: bolder;
    margin-top: 1%;
    margin-left: 1%;
    position: absolute;
  }

  .box2 {
    display: none;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .box3 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .box4 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #dropDownButton {
    height: 80%;
    width: 22vh;
    margin-right: 2%;
    margin-top: 0.1%;
    display: unset;
    float: right;
    text-align: center;
    font-size: 5vh;
    line-height: 100%;
    cursor: pointer;
    z-index: 1;
  }

  #routeMessageView {
    display: unset;
    height: 10vh;
    width: 30vh;
    background-color: rgb(109, 109, 109);
    border: 0.1vh solid black;
    position: absolute;
    right: 2%;
    top: 6.3vh;
    text-align: center;
    font-size: 4vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
    z-index: 1;
  }

  #routeScheduleView {
    display: unset;
    height: 10vh;
    width: 30vh;
    background-color: rgb(109, 109, 109);
    border: 0.1vh solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 15vh;
    text-align: center;
    font-size: 4vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
    z-index: 1;
  }

  #routeTriggerView {
    display: unset;
    height: 10vh;
    width: 30vh;
    background-color: rgb(109, 109, 109);
    border: 0.1vh solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 25vh;
    text-align: center;
    font-size: 4vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
    z-index: 1;
  }

  #routeReportsView {
    display: unset;
    height: 10vh;
    width: 30vh;
    background-color: rgb(109, 109, 109);
    border: 0.1vh solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 35vh;
    text-align: center;
    font-size: 4vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
    z-index: 1;
  }

  #routeLoginView {
    display: unset;
    height: 10vh;
    width: 30vh;
    background-color: rgb(109, 109, 109);
    border: 0.1vh solid black;
    margin-right: 2%;
    position: absolute;
    right: 0;
    top: 45vh;
    text-align: center;
    font-size: 4vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
    z-index: 1;
  }

  #graphButton {
    grid-column-start: 1;
    grid-column-end: 2;
    background-color: white;
    margin-top: 10%;
    height: 8vh;
    width: 15vh;
    margin-left: 5%;
    font-size: 4vh;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: 0.7;
    line-height: 4vh;
    cursor: pointer;
  }

  #graphButton:hover {
    grid-column-start: 1;
    grid-column-end: 2;
    background-color: white;
    height: 8vh;
    width: 15vh;
    margin-top: 10%;
    margin-left: 5%;
    font-size: 4vh;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: none;
    line-height: 4vh;
    cursor: pointer;
    background-color: cornflowerblue;
  }

  #reportButton {
    grid-column-start: 2;
    grid-column-end: 3;
    background-color: white;
    height: 8vh;
    margin-top: 10%;
    width: 15vh;
    font-size: 4vh;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: 0.7;
    line-height: 4vh;
    cursor: pointer;
  }

  #reportButton:hover {
    grid-column-start: 2;
    grid-column-end: 3;
    background-color: white;
    margin-top: 10%;
    height: 8vh;
    width: 15vh;
    font-size: 4vh;
    font-weight: bolder;
    text-align: center;
    text-shadow: 2px 2px 2px grey;
    box-shadow: -2px 2px;
    opacity: none;
    line-height: 4vh;
    cursor: pointer;
    background-color: cornflowerblue;
  }

  .usage {
    text-align: center;
    padding-top: 1vh;
    opacity: 0.7;
    width: 99%;
  }

  .reports {
    text-align: center;
    padding-top: 1vh;
    opacity: 0.7;
    width: 100%;
    height: 100%;
  }

  table {
    width: 100%;
    height: 74vh;
    margin-top: 2%;
    border-spacing: 0;
    overflow: auto;
    background: white;
  }

  #headRow {
    background-color: rgb(143, 143, 143);
    color: white;
    text-align: center;
    font-size: 4vh;
  }

  tr {
    position: relative;
  }

  #list {
    background: lightgray;
    font-size: 4vh;
    color: black;
  }

  th {
    overflow: auto;
  }

  .graph {
    margin-top: 5%;
    width: 149vh;
  }
}
</style>
