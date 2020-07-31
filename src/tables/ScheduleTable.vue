<template>
  <div class="table">
    <div id="editPage" v-if="editOpen != false">
      <div id="header">
        Edit Schedule !
        <button id="exit" v-on:click="turnOff">X</button>
      </div>

      <label for="Message" id="messageLabel">Message</label>
      <div id="selectMessage">{{ messageTitle }}</div>
      <a class="mobileReqMessage" v-if="messageTitle == ''">X</a>
      <a class="mobileReqMessageTrue" v-if="messageTitle !== ''">&#x2713;</a>

      <label for="Run" id="runLabel">Run At</label>

      <a class="mobileReqDate" v-if="checkDate() == false">X</a>
      <a class="mobileReqDateTrue" v-if="checkDate() == true">&#x2713;</a>

      <input id="date" type="date" v-model="date" />
      <input
        type="checkbox"
        id="checkRepeat"
        v-model="checkRepeat"
        v-on:click="changeRepeat"
      />
      <label for="Repeat" id="repeatLabel">Repeat</label>
      <select id="selectRepeat" v-model="repeat" v-if="checkRepeat != false">
        <option value="1">1</option>
        <option value="7">7</option>
        <option value="30">30</option>
      </select>
      <input type="checkbox" id="checkActive" v-model="active" />
      <label for="Active" id="activeLabel">Active</label>
      <button id="saveButton" v-if="(allowSend == 0)" v-on:click="editSchedule">
        SAVE
      </button>
      <button
        id="allowSendFalse"
        v-if="(allowSend == 2)"
        v-on:click="editSchedule"
      >
        SAVE
      </button>
      <button
        id="allowSendNeutral"
        v-on:click="editSchedule"
        v-if="allowSend == 3"
      >
        Nothing changed! Try again!
      </button>
      <button
        id="allowSendTrue"
        v-if="(allowSend == 1)"
        v-on:click="editSchedule"
      >
        &#x2713;
      </button>
    </div>
    <table v-bind:class="{ table1: !editOpen, table1Blur: editOpen }">
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
        <td class="action">
          <button
            id="Edit"
            title="Edit schedule"
            v-on:click="
              editOpenFunction(
                schedule.message,
                schedule.run_date,
                schedule.active,
                schedule.repeat_range
              )
            "
          >
            &#9998;
          </button>
          <button
            id="Delete"
            title="Delete schedule"
            v-on:click="deleteSchedule(schedule.message)"
          >
            &#9986;
          </button>
        </td>
      </tr>
    </table>
    <div id="legend" v-if="editOpen != false">
      <p class="inputForm" v-if="date == ''">Run At: Required</p>
      <p class="inputFormTrue" v-if="date != ''">
        Run At: Required &#x2713;
      </p>
      <p class="inputForm" v-if="checkDate() != true">
        Date: <br />
        Past not allowed
      </p>
      <p class="inputFormTrue" v-if="checkDate() == true">
        Date: <br />
        Past not allowed &#x2713;
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SchedulesService from '../store/modules/SchedulesService';

export default {
  name: 'ScheduleTable',
  data() {
    return {
      editOpen: false,
      messageTitle: '',
      date: '',
      repeat: 0,
      active: false,
      checkRepeat: false,
      allowSend: 0,
      error: '',
    };
  },
  methods: {
    ...mapActions([
      'fetchSchedules',
      'fetchMessages',
      'fetchController',
      'getToken',
    ]),
    async deleteSchedule(messageTitle) {
      await SchedulesService.deleteSchedule(messageTitle, this.token);
      this.fetchSchedules(this.token);
    },
    editOpenFunction(messagetitle, schdate, schactive, schrepeat) {
      this.editOpen = true;
      this.messageTitle = messagetitle;
      this.fetchController();
      this.active = schactive;
      // eslint-disable-next-line eqeqeq
      if (this.active == 'true') {
        this.active = true;
      } else {
        this.active = false;
      }
      this.repeat = schrepeat;
      // eslint-disable-next-line eqeqeq
      if (schrepeat == 0) {
        this.checkRepeat = false;
      } else {
        this.checkRepeat = true;
      }
      const tempdate = schdate;
      const datearray = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tempdate.length; i++) {
        if (tempdate[i] !== '/') {
          datearray.push(tempdate[i]);
        }
      }
      const day = datearray[0] + datearray[1];
      const month = datearray[2] + datearray[3];
      const year = datearray[4] + datearray[5] + datearray[6] + datearray[7];
      this.date = `${year}-${month}-${day}`;
    },
    turnOff() {
      if (this.editOpen === true) {
        this.editOpen = false;
        this.fetchController();
        this.messageTitle = '';
        this.date = '';
        this.repeat = 0;
        this.active = false;
        this.checkRepeat = false;
        this.allowSend = 0;
      }
    },
    changeRepeat() {
      this.checkRepeat = !this.checkRepeat;
      // eslint-disable-next-line eqeqeq
      if (this.checkRepeat == false) {
        this.repeat = 0;
      } else {
        this.repeat = 1;
      }
    },
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
    async editSchedule() {
      // eslint-disable-next-line eqeqeq
      if (this.checkDate() == true) {
        const tempDate = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.date.length; i++) {
          tempDate.push(this.date[i]);
        }
        const day = tempDate[8] + tempDate[9];
        const month = tempDate[5] + tempDate[6];
        const year = tempDate[0] + tempDate[1] + tempDate[2] + tempDate[3];
        const fullDate = `${day}/${month}/${year}`;
        if (this.token !== '') {
          try {
            await SchedulesService.editSchedule(
              this.messageTitle,
              fullDate,
              this.active.toString(),
              this.repeat.toString(),
              this.token
            );
            this.allowSend = 1;
            setTimeout(() => {
              this.editOpen = false;
              this.messageTitle = '';
              this.date = '';
              this.repeat = 0;
              this.active = false;
              this.checkRepeat = false;
              this.fetchController();
              this.allowSend = 0;
            }, 2500);
            this.fetchSchedules(this.token);
          } catch (err) {
            if (
              err.toString() === 'Error: Request failed with status code 404'
            ) {
              this.allowSend = 3;
            }
            if (err.toString() === 'Error: Network Error') {
              this.$router.push('./ErrorView');
            }
          }
        } else {
          this.$router.push('/');
        }
      } else {
        this.allowSend = 2;
      }
    },
  },
  computed: mapGetters(['allSchedules', 'allMessages', 'token']),
  created() {
    if (this.token !== '') {
      this.fetchMessages(this.token);
      this.fetchSchedules(this.token);
    }
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

.table1 {
  margin: 0 auto;
}

.table1Blur {
  margin: 0 auto;
  filter: blur(3px);
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

#Edit {
  width: 5vh;
  height: 5vh;
  font-size: 3vh;
  cursor: pointer;
}

#Delete {
  width: 5vh;
  height: 5vh;
  font-size: 3vh;
  cursor: pointer;
}

#editPage {
  width: 60%;
  height: 60%;
  position: absolute;
  margin-top: 13%;
  background-color: rgb(202, 202, 202);
  border: 0.4vh solid black;
  z-index: 1;
  animation: slit-in-vertical 0.45s ease-out both;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 10% 15% 15% 15% 15% 10% 10% 10%;
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
  margin-left: 1%;
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
  left: 1%;
}

#selectMessage {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 30vh;
  background-color: white;
  height: 4vh;
  font-size: 3vh;
  margin-left: 1%;
  margin-top: -2%;
}

#runLabel {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  font-size: 4vh;
  margin-left: 1%;
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
  margin-left: 1%;
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

#allowSendNeutral {
  grid-row-start: 8;
  grid-row-end: 9;
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: center;
  font-weight: bold;
  line-height: 0%;
  font-size: 3vh;
  cursor: pointer;
  background-color: rgb(229, 255, 0);
  animation: scale-up-hor-centera 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes scale-up-hor-centera {
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

#legend {
  position: absolute;
  left: 1%;
  top: 50%;
  z-index: 2;
  width: 15%;
  text-align: center;
}

.inputForm {
  left: 0;
  text-align: left;
  color: red;
  font-size: 2vh;
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  z-index: 1;
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

.inputFormTrue {
  margin-left: 0;
  text-align: left;
  color: green;
  font-size: 2vh;
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  z-index: 1;
  animation: flip-vertical-right 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) none;
}

@keyframes flip-vertical-right {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

@media screen and (max-width: 600px) {
  td {
    overflow: auto;
    height: 10vw;
  }

  .title {
    width: 30vw;
    max-width: 30vw;
  }
  .run {
    width: 20vw;
    max-width: 20vw;
  }
  .active {
    width: 6vw;
    max-width: 6vw;
  }
  .action {
    width: 15vw;
    max-width: 15vw;
  }

  .headRow td {
    height: 10vw;
    font-size: 5vw;
    background-color: rgb(143, 143, 143);
    color: white;
    text-align: center;
  }
  .row td {
    font-size: 4vw;
    background-color: white;
    color: black;
    text-align: center;
  }

  #Edit {
    width: 9vw;
    height: 9vw;
    font-size: 4vw;
    cursor: pointer;
  }

  #Delete {
    width: 9vw;
    height: 9vw;
    font-size: 4vw;
    cursor: pointer;
  }

  #editPage {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    background-color: rgb(202, 202, 202);
    border: 0.5vw solid black;
    z-index: 1;
    animation: slit-in-vertical 0.45s ease-out both;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 10% 15% 15% 15% 15% 10% 10% 10%;
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
    border-bottom: 0.1vw solid black;
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 7vw;
    margin-left: 1%;
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

  #messageLabel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    font-size: 7vw;
    top: 10%;
    position: absolute;
    left: 1%;
  }

  #selectMessage {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 3;
    grid-row-end: 4;
    width: 40vw;
    background-color: white;
    height: 6vw;
    font-size: 5vw;
    margin-left: 1%;
    margin-top: -2%;
  }

  #runLabel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    font-size: 7vw;
    margin-left: 1%;
  }

  #date {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 5;
    grid-row-end: 6;
    top: 10%;
    width: 40vw;
    height: 6vw;
    font-size: 4vw;
    margin-left: 1%;
  }

  #repeatLabel {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    font-size: 5vw;
  }

  #checkRepeat {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 6;
    grid-row-end: 7;
    width: 5vw;
    height: 5vw;
  }

  #selectRepeat {
    width: 12vw;
    height: 6vw;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    left: 23%;
    top: 5%;
    position: absolute;
    font-size: 4vw;
  }

  #checkActive {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 7;
    grid-row-end: 8;
    width: 5vw;
    height: 5vw;
  }

  #activeLabel {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 7;
    grid-row-end: 8;
    font-size: 5vw;
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

  #saveButton:hover {
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
    background-color: cornflowerblue;
  }

  #allowSendFalse {
    grid-row-start: 8;
    grid-row-end: 9;
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
    font-weight: bold;
    font-size: 6vw;
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

  #allowSendNeutral {
    grid-row-start: 8;
    grid-row-end: 9;
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
    font-weight: bold;
    line-height: 0%;
    font-size: 4vw;
    cursor: pointer;
    background-color: rgb(229, 255, 0);
    animation: scale-up-hor-centera 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
  }

  @keyframes scale-up-hor-centera {
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
    font-size: 6vw;
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

  .mobileReqMessage {
    display: unset;
    font-size: 8vw;
    color: red;
    font-weight: bolder;
    position: absolute;
    top: 10%;
    left: 40%;
  }

  .mobileReqMessageTrue {
    display: unset;
    font-size: 8vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 10%;
    left: 40%;
  }

  .mobileReqDate {
    display: unset;
    font-size: 8vw;
    color: red;
    font-weight: bolder;
    position: absolute;
    left: 40%;
    top: 40%;
  }

  .mobileReqDateTrue {
    display: unset;
    font-size: 8vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    left: 40%;
    top: 40%;
  }

  #legend {
    display: none;
  }
}

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width: 601px) {
  td {
    overflow: auto;
    height: 5vh;
  }

  .title {
    width: 40vh;
    max-width: 40vh;
  }
  .run {
    width: 30vh;
    max-width: 30vh;
  }
  .active {
    width: 15vh;
    max-width: 15vh;
  }
  .action {
    width: 25vh;
    max-width: 25vh;
  }

  .headRow td {
    height: 10vh;
    font-size: 4vh;
    background-color: rgb(143, 143, 143);
    color: white;
    text-align: center;
  }
  .row td {
    font-size: 4vh;
    background-color: white;
    color: black;
    text-align: center;
  }

  #Edit {
    width: 8vh;
    height: 8vh;
    font-size: 4vh;
    cursor: pointer;
  }

  #Delete {
    width: 8vh;
    height: 8vh;
    font-size: 4vh;
    cursor: pointer;
  }

  #editPage {
    width: 70%;
    height: 60%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    background-color: rgb(202, 202, 202);
    border: 0.4vh solid black;
    z-index: 1;
    animation: slit-in-vertical 0.45s ease-out both;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 10% 15% 15% 15% 15% 10% 10% 10%;
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
    font-size: 5vh;
    margin-left: 1%;
  }

  #messageLabel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    font-size: 5vh;
    top: 10%;
    position: absolute;
    left: 1%;
  }

  #selectMessage {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 3;
    grid-row-end: 4;
    width: 40vh;
    background-color: white;
    height: 5vh;
    font-size: 4vh;
    margin-left: 1%;
    margin-top: -1%;
  }

  #runLabel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    font-size: 5vh;
    margin-left: 1%;
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
    font-size: 4vh;
    margin-left: 1%;
  }

  #repeatLabel {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    font-size: 4vh;
  }

  #checkRepeat {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vh solid black;
    grid-row-start: 6;
    grid-row-end: 7;
    width: 4vh;
    height: 4vh;
  }

  #selectRepeat {
    width: 12vh;
    height: 6vh;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    left: 23%;
    top: 5%;
    position: absolute;
    font-size: 4vh;
  }

  #checkActive {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vh solid black;
    grid-row-start: 7;
    grid-row-end: 8;
    width: 4vh;
    height: 4vh;
  }

  #activeLabel {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 7;
    grid-row-end: 8;
    font-size: 4vh;
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
    font-size: 4vh;
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
    font-size: 4vh;
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

  #allowSendNeutral {
    grid-row-start: 8;
    grid-row-end: 9;
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
    font-weight: bold;
    line-height: 0%;
    font-size: 4vh;
    cursor: pointer;
    background-color: rgb(229, 255, 0);
    animation: scale-up-hor-centera 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
  }

  @keyframes scale-up-hor-centera {
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
    font-size: 4vh;
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

  .mobileReqMessage {
    display: unset;
    font-size: 6vh;
    color: red;
    margin-left: 200%;
    font-weight: bolder;
    line-height: 150%;
  }

  .mobileReqMessageTrue {
    display: unset;
    font-size: 6vh;
    font-weight: bolder;
    color: green;
    line-height: 150%;
    margin-left: 200%;
  }

  .mobileReqDate {
    display: unset;
    font-size: 6vh;
    color: red;
    margin-left: 11%;
    font-weight: bolder;
    margin-top: 17%;
  }

  .mobileReqDateTrue {
    display: unset;
    font-size: 6vh;
    font-weight: bolder;
    color: green;
    margin-top: 17%;
    margin-left: 11%;
  }

  #legend {
    display: none;
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
}
</style>
