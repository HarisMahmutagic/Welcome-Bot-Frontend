<template>
  <div id="SchedulesView">
    <!-- BOX1 First row - Header -->
    <div v-on:click="turnOff" class="box1">
      <a id="title"> Schedules View !</a>

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
      <div id="routeLoginView" v-if="dropDown != true" v-on:click="goToLogin">
        &#x1F3E0; Logout
      </div>
    </div>
    <!-- BOX2 Left side with buttons -->

    <div v-on:click="turnOff" class="box2">
      <MessageButton></MessageButton>
      <ScheduleButton></ScheduleButton>
      <TriggerButton></TriggerButton>
      <LogOutButton></LogOutButton>
      <div v-if="createSwitch != false">
        <!-- Legend for computer screen-->
        <p class="inputForm" v-if="messageTitle == ''">
          Message:<br />Required
        </p>
        <p class="inputFormTrue" v-if="messageTitle != ''">
          Message:<br />Required &#x2713;
        </p>

        <p class="inputForm" v-if="date == ''">Run At:<br />Required</p>
        <p class="inputFormTrue" v-if="date != ''">
          Run At:<br />Required &#x2713;
        </p>
        <p class="inputForm" v-if="!checkDate()">Date:<br />Past not allowed</p>
        <p class="inputFormTrue" v-if="checkDate()">
          Date:<br />Past not allowed
        </p>
      </div>
    </div>

    <!-- BOX3 Right side with table -->

    <div v-on:click="turnOff" class="box3">
      <div v-bind:class="{ blurtable: blurScreen, blurtablenot: !blurScreen }">
        <ScheduleTable></ScheduleTable>
      </div>
    </div>

    <!-- CreatedON - New div for input new schedule -->

    <div id="createdOn" v-if="createSwitch != false">
      <div id="header">
        Create Schedule !
        <button id="exit" v-on:click="turnOff">X</button>
      </div>

      <label for="Message" id="messageLabel">Message</label>

      <a class="mobileReqMessage" v-if="messageTitle == ''">X</a>
      <a class="mobileReqMessageTrue" v-if="messageTitle !== ''">&#x2713;</a>

      <select id="selectMessage" size="3" v-model="messageTitle">
        <option v-for="message in allMessages" :key="message.id">
          {{ message.title }}</option
        >
      </select>
      <label for="Run" id="runLabel">Run At</label>

      <a class="mobileReqDate" v-if="date == '' || !checkDate()">X</a>
      <a class="mobileReqDateTrue" v-if="date != '' && checkDate()">&#x2713;</a>

      <input id="date" type="date" v-model="date" />
      <input
        type="checkbox"
        name="Repeat"
        id="checkRepeat"
        v-on:click="changeRepeat"
      />
      <label for="Repeat" id="repeatLabel">Repeat</label>
      <select id="selectRepeat" v-model="repeat" v-if="checkRepeat != false">
        <option value="1">1</option>
        <option value="7">7</option>
        <option value="30">30</option>
      </select>
      <input type="checkbox" name="Active" id="checkActive" v-model="active" />
      <label for="Active" id="activeLabel">Active</label>
      <button
        id="saveButton"
        v-on:click="addNewSchedule"
        v-if="(allowSend == 0)"
      >
        SAVE
      </button>
      <button
        id="allowSendFalse"
        v-on:click="addNewSchedule"
        v-if="(allowSend == 2)"
      >
        SAVE
      </button>
      <button
        id="allowSendTrue"
        v-on:click="addNewSchedule"
        v-if="(allowSend == 1)"
      >
        &#x2713;
      </button>
    </div>
    <!-- BOX4 - Bottom div ( footer ) -->

    <div v-on:click="turnOff" class="box4"></div>

    <!-- AddButton switch - For opening "CreatedON" div -->

    <div v-on:click="createNew" class="addButton">
      Add
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MessageButton from '../components/MessageButton.vue';
import ScheduleButton from '../components/ScheduleButton.vue';
import TriggerButton from '../components/TriggerButton.vue';
import ScheduleTable from '../tables/ScheduleTable.vue';
import SchedulesService from '../store/modules/SchedulesService';
import LogOutButton from '../components/LogOutButton.vue';

export default {
  name: 'Schedules',
  components: {
    MessageButton,
    ScheduleButton,
    TriggerButton,
    ScheduleTable,
    LogOutButton,
  },

  data() {
    return {
      dropDown: true,
      createSwitch: false,
      date: '',
      repeat: 0,
      active: false,
      checkRepeat: false,
      blurScreen: false,
      messageTitle: '',
      allowSend: 0,
    };
  },
  computed: mapGetters(['allMessages', 'allSchedules']),
  created() {
    this.fetchMessages();
    this.fetchSchedules();
  },
  methods: {
    ...mapActions(['fetchMessages', 'fetchSchedules', 'getToken']),
    changeRepeat() {
      this.checkRepeat = !this.checkRepeat;
      // eslint-disable-next-line eqeqeq
      if (this.checkRepeat == false) {
        this.repeat = 0;
      } else {
        this.repeat = 1;
      }
    },

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
      self.dropDown = true;
    },

    // Router to Trigger view
    goToTrigger() {
      const self = this;
      self.$router.push('./TriggerView');
    },
    // Router to Login view
    goToLogin() {
      const empty = '';
      this.$store.commit('getToken', empty);
      this.$router.push('/');
    },
    // Function for opening "CreatedOn" div
    createNew() {
      const self = this;
      if (self.createSwitch === false) {
        self.createSwitch = true;
      } else {
        self.createSwitch = false;
      }
      if (self.blurScreen === false) {
        self.blurScreen = true;
      } else {
        self.blurScreen = false;
      }
    },
    // Function for checking date, since past aren't allow
    checkDate() {
      const today = new Date();
      const day = today.getUTCDate();
      let month = today.getUTCMonth() + 1;
      if (month < 10) month = `0${month}`;
      const year = today.getUTCFullYear();
      const DateToday = `${year}${month}${day}`;
      const tempDate = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.date.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (this.date[i] != '-') tempDate.push(this.date[i]);
      }
      const date1 =
        tempDate[0] +
        tempDate[1] +
        tempDate[2] +
        tempDate[3] +
        tempDate[4] +
        tempDate[5] +
        tempDate[6] +
        tempDate[7];

      if (date1 >= DateToday) {
        return true;
      }
      return false;
    },
    // Function for closing "CreatedOn" div by clicking outside of it
    turnOff() {
      const self = this;
      if (self.createSwitch === true) {
        self.createSwitch = false;
      }
      if (self.blurScreen === true) {
        self.blurScreen = false;
      }
      this.date = '';
      this.repeat = 0;
      this.active = false;
      this.messageTitle = '';
      this.allowSend = 0;
      this.checkRepeat = false;
    },
    // Create new Schedule into database
    async addNewSchedule() {
      // eslint-disable-next-line eqeqeq
      if (this.messageTitle != '') {
        // eslint-disable-next-line eqeqeq
        if (this.checkDate() === true) {
          const tempDate = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.date.length; i++) {
            tempDate.push(this.date[i]);
          }
          const day = tempDate[8] + tempDate[9];
          const month = tempDate[5] + tempDate[6];
          const year = tempDate[0] + tempDate[1] + tempDate[2] + tempDate[3];
          const fullDate = `${day}/${month}/${year}`;
          await SchedulesService.addSchedule(
            this.messageTitle,
            fullDate,
            this.active.toString(),
            this.repeat.toString()
          );
          this.allowSend = 1;
          setTimeout(() => {
            this.date = '';
            this.repeat = 0;
            this.active = false;
            this.checkRepeat = false;
            this.messageTitle = '';
            this.allowSend = 0;
            this.createSwitch = false;
            this.blurScreen = false;
          }, 2500);
          this.fetchSchedules();
        } else {
          this.allowSend = 2;
        }
      } else {
        this.allowSend = 2;
      }
    },
  },
};
</script>

<style scoped>
#SchedulesView {
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
  background-color: rgb(207, 206, 206);
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
  border-top: 0.1vh solid black;
  border-bottom: 0.1vh solid black;
}

.box3 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  border-top: 0.1vh solid black;
  border-bottom: 0.1vh solid black;
  overflow: auto;
}

.blurtable {
  filter: blur(3px);
  overflow: auto;
}

.blurtablenot {
  filter: none;
  overflow: auto;
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

#routeLoginView {
  display: none;
}

#createdOn {
  position: absolute;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 10% 15% 15% 15% 15% 10% 10% 10%;
  background-color: rgb(202, 202, 202);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 60%;
  height: 60%;
  border: 0.4vh solid black;
  z-index: 1;
  animation: slit-in-vertical 0.45s ease-out both;
}

@keyframes slit-in-vertical {
  0% {
    -webkit-transform: translateZ(-800px) rotateY(90deg);
    transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
  54% {
    -webkit-transform: translateZ(-160px) rotateY(87deg);
    transform: translateZ(-160px) rotateY(87deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
  }
}

#header {
  grid-column-start: 1;
  grid-column-end: 3;
  border-bottom: 0.1vh solid black;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 3vh;
}

#exit {
  position: absolute;
  right: 1%;
  top: 1%;
  cursor: pointer;
  width: 8%;
  height: 8%;
  font-size: 80%;
  font-weight: bolder;
  line-height: 20%;
}

#messageLabel {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  font-size: 4vh;
  top: 10%;
  position: absolute;
}

#selectMessage {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 40vh;
  height: 8vh;
  font-size: 2vh;
  margin-left: 1%;
  margin-top: -2%;
}

#runLabel {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  font-size: 4vh;
}

#date {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 5;
  grid-row-end: 6;
  top: 10%;
  width: 40vh;
  height: 5vh;
  font-size: 2.5vh;
  left: 1%;
}

#repeatLabel {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  font-size: 3vh;
}

#checkRepeat {
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 6;
  grid-row-end: 7;
  width: 3vh;
  height: 3vh;
}

#selectRepeat {
  width: 7vh;
  height: 3vh;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  left: 23%;
  top: 5%;
  position: absolute;
  font-size: 2vh;
}

#checkActive {
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 7;
  grid-row-end: 8;
  width: 3vh;
  height: 3vh;
}

#activeLabel {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 7;
  grid-row-end: 8;
  font-size: 3vh;
}

#saveButton {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 8;
  grid-row-end: 9;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 3vh;
  font-weight: bold;
}

#saveButton:hover {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 8;
  grid-row-end: 9;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 3vh;
  font-weight: bold;
  background-color: cornflowerblue;
}
#allowSendFalse {
  grid-row-start: 8;
  grid-row-end: 9;
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: center;
  font-weight: bold;
  font-size: 4vh;
  cursor: pointer;
  background-color: red;
  animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes scale-up-hor-center {
  0% {
    -webkit-transform: scaleX(0.4);
    transform: scaleX(0.4);
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}

#allowSendTrue {
  grid-row-start: 8;
  grid-row-end: 9;
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: center;
  font-weight: bold;
  line-height: 0%;
  font-size: 5vh;
  cursor: pointer;
  background-color: rgb(1, 184, 1);
  animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes scale-up-hor-center {
  0% {
    -webkit-transform: scaleX(0.4);
    transform: scaleX(0.4);
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}
.addButton {
  width: 13vh;
  height: 5vh;
  color: black;
  background-color: white;
  border: 0.1vh solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size: 3vh;
  font-weight: bolder;
  cursor: pointer;
  line-height: 150%;
}

.addButton:hover {
  width: 13vh;
  height: 5vh;
  color: black;
  background-color: cornflowerblue;
  border: 0.1vh solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size: 3vh;
  font-weight: bolder;
  cursor: pointer;
  line-height: 150%;
}

.inputForm {
  color: red;
  font-size: 2vh;
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  animation: flip-vertical-right 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) none;
}

@keyframes flip-vertical-right {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
  }
  100% {
    -webkit-transform: rotateY(-360deg);
    transform: rotateY(-360deg);
  }
}

.mobileReqMessage {
  display: none;
}

.mobileReqMessageTrue {
  display: none;
}

.mobileReqDate {
  display: none;
}

.mobileReqDateTrue {
  display: none;
}

.inputFormTrue {
  color: green;
  font-size: 2vh;
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  animation: flip-vertical-left 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) none;
}

@keyframes flip-vertical-left {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
  }
  100% {
    -webkit-transform: rotateY(-360deg);
    transform: rotateY(-360deg);
  }
}

#legentTitle {
  display: none;
}

#legendText {
  display: none;
}

@media screen and (max-width: 600px) and (orientation: portrait) {
  #SchedulesView {
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
    background-color: rgb(207, 206, 206);
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
    font-size: 5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
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
    font-size: 5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
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
    font-size: 5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
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
    top: 35vw;
    text-align: center;
    font-size: 5vw;
    color: white;
    line-height: 10vw;
    cursor: pointer;
  }

  #createdOn {
    position: absolute;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 10% 15% 15% 15% 15% 10% 10% 10%;
    background-color: rgb(202, 202, 202);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 80%;
    border: 0.6vw solid black;
  }

  #exit {
    position: absolute;
    right: 1%;
    top: 1%;
    cursor: pointer;
    width: 12%;
    height: 8%;
    font-size: 70%;
    font-weight: bolder;
    line-height: 20%;
  }

  #selectRepeat {
    width: 12vw;
    height: 5vw;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    left: 23%;
    top: 5%;
    position: absolute;
    font-size: 3vw;
  }

  #header {
    grid-column-start: 1;
    grid-column-end: 3;
    border-bottom: 0.1vh solid black;
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 4vh;
    line-height: 150%;
  }

  #messageLabel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    font-size: 7vw;
    top: 10%;
    position: absolute;
  }

  .mobileReqMessage {
    display: unset;
    font-size: 7vw;
    color: red;
    position: absolute;
    top: 12%;
    left: 40%;
    font-weight: bolder;
  }

  .mobileReqMessageTrue {
    display: unset;
    font-size: 7vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 11%;
    left: 40%;
  }

  .mobileReqDate {
    display: unset;
    font-size: 7vw;
    color: red;
    position: absolute;
    font-weight: bolder;
    top: 40%;
    left: 40%;
  }

  .mobileReqDateTrue {
    display: unset;
    font-size: 7vw;
    color: green;
    font-weight: bolder;
    position: absolute;
    font-weight: bolder;
    top: 39%;
    left: 40%;
  }

  #selectMessage {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 3;
    grid-row-end: 4;
    width: 60vw;
    height: 12vw;
    font-size: 3vw;
    margin-left: 1%;
  }

  #runLabel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    font-size: 7vw;
  }

  #date {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 5;
    grid-row-end: 6;
    top: -10%;
    width: 40vw;
    height: 8vw;
    font-size: 3vw;
    left: 1%;
  }

  #repeatLabel {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    font-size: 4vw;
  }

  #checkRepeat {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 6;
    grid-row-end: 7;
    width: 4vw;
    height: 4vw;
  }

  #checkActive {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 7;
    grid-row-end: 8;
    width: 4vw;
    height: 4vw;
  }

  #activeLabel {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 7;
    grid-row-end: 8;
    font-size: 4vw;
  }

  #saveButton {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 8;
    grid-row-end: 9;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 6vw;
    font-weight: bold;
  }

  .addButton {
    width: 17vw;
    height: 8vw;
    color: aliceblue;
    background-color: rgb(252, 252, 252);
    border: 0.1vw solid rgb(0, 0, 0);
    position: absolute;
    right: 1%;
    bottom: 1%;
    text-align: center;
    font-size: 5vw;
    cursor: pointer;
    color: black;
  }

  .addButton:hover {
    width: 17vw;
    height: 8vw;
    color: aliceblue;
    background-color: cornflowerblue;
    border: 0.1vw solid rgb(0, 0, 0);
    position: absolute;
    right: 1%;
    bottom: 1%;
    text-align: center;
    font-size: 5vw;
    color: black;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width: 601px) {
  #SchedulesView {
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
    position: absolute;
    background-color: rgb(207, 206, 206);
  }

  .box1 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    border: 0.01vh solid black;
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
    border: 0.01vh solid black;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .box3 {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.01vh solid black;
    grid-row-start: 2;
    grid-row-end: 3;
    overflow: auto;
  }

  .box4 {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.01vh solid black;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #dropDownButton {
    height: 85%;
    width: 22vh;
    margin-right: 2%;
    display: unset;
    float: right;
    text-align: center;
    font-size: 5vh;
    line-height: 100%;
    cursor: pointer;
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
    font-size: 5vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
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
    font-size: 5vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
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
    font-size: 5vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
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
    top: 35vh;
    text-align: center;
    font-size: 5vh;
    color: white;
    line-height: 10vh;
    cursor: pointer;
  }

  .addButton {
    width: 13vh;
    height: 7vh;
    color: black;
    background-color: white;
    border: 0.1vh solid rgb(0, 0, 0);
    position: absolute;
    right: 1%;
    bottom: 1%;
    text-align: center;
    font-size: 3vh;
    font-weight: bolder;
    cursor: pointer;
    line-height: 220%;
  }

  .addButton:hover {
    width: 13vh;
    height: 7vh;
    color: black;
    background-color: cornflowerblue;
    border: 0.1vh solid rgb(0, 0, 0);
    position: absolute;
    right: 1%;
    bottom: 1%;
    text-align: center;
    font-size: 3vh;
    font-weight: bolder;
    cursor: pointer;
    line-height: 220%;
  }

  .mobileReqMessage {
    display: unset;
    font-size: 4vh;
    color: red;
    position: absolute;
    top: 12%;
    left: 20%;
    font-weight: bolder;
  }

  .mobileReqMessageTrue {
    display: unset;
    font-size: 4vh;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 12%;
    left: 20%;
  }

  .mobileReqDate {
    display: unset;
    font-size: 4vh;
    color: red;
    height: 3vh;
    width: 9vh;
    position: absolute;
    font-weight: bolder;
    top: 41%;
    left: 20%;
  }

  .mobileReqDateTrue {
    display: unset;
    font-size: 4vh;
    color: green;
    height: 3vh;
    font-weight: bolder;
    width: 9vh;
    position: absolute;
    font-weight: bolder;
    top: 41%;
    left: 20%;
  }

  #selectRepeat {
    width: 10vh;
    height: 4vh;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    left: 23%;
    top: 5%;
    position: absolute;
    font-size: 3vh;
  }

  #createdOn {
    position: absolute;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 10% 15% 15% 15% 15% 10% 10% 10%;
    background-color: rgb(202, 202, 202);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 60%;
    height: 60%;
    border: 0.5vh solid black;
    z-index: 1;
  }

  #exit {
    position: absolute;
    right: 1%;
    top: 1%;
    cursor: pointer;
    width: 8%;
    height: 8%;
    font-size: 70%;
    font-weight: bolder;
    line-height: 20%;
  }

  #header {
    grid-column-start: 1;
    grid-column-end: 3;
    border-bottom: 0.1vh solid black;
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 3vh;
  }
}
</style>
