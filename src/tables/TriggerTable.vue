<template>
  <div class="table">
    <table v-bind:class="{ table1: !Switch, table1Blur: Switch }">
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
        <td class="action">
          <button
            id="Edit"
            title="Edit message"
            v-on:click="
              openEdit(
                trigger.trigger_word,
                trigger.active,
                trigger.message,
                trigger.channel
              )
            "
          >
            &#9998;
          </button>
          <button
            id="Delete"
            title="Delete message"
            v-on:click="deleteTrigger(trigger.trigger_word)"
          >
            &#9986;
          </button>
        </td>
      </tr>
    </table>
    <div id="editTrigger" v-if="Switch != false">
      <div id="header">
        Edit trigger !
        <button id="exit" v-on:click="turnOff">X</button>
      </div>
      <label for="Message" id="message">Message</label>
      <a class="mobileReqMessage" v-if="message == ''">X</a>
      <a class="mobileReqMessageTrue" v-if="message != ''">&#x2713;</a>

      <select id="selectMessage" v-model="message" size="2">
        <option v-for="message in allMessages" :key="message.id">
          {{ message.title }}</option
        >
      </select>

      <label for="Trigger" id="trigger">Trigger</label>
      <a
        class="mobileReqTrigger"
        v-if="trigger.length < 5 || trigger.length > 10"
        >X</a
      >
      <a
        class="mobileReqTriggerTrue"
        v-if="trigger.length >= 5 && trigger.length <= 10"
        >&#x2713;</a
      >

      <div id="inputForText">{{ trigger }}</div>

      <label for="Channel" id="channel">Channel</label>
      <a class="mobileReqChannel" v-if="channel == ''">X</a>
      <a class="mobileReqChannelTrue" v-if="channel != ''">&#x2713;</a>

      <select id="selectChannel" v-model="channel">
        <option v-for="channel in allChannels.tempArray" :key="channel.id">
          {{ channel }}</option
        >
      </select>

      <input type="checkbox" id="checkActive" v-model="active" />
      <label for="Active" id="active">Active</label>

      <button
        id="saveButton"
        v-on:click="editTrigger(trigger)"
        v-if="(allowSend == 0)"
      >
        SAVE
      </button>
      <button
        id="allowSendFalse"
        v-on:click="editTrigger(trigger)"
        v-if="(allowSend == 2)"
      >
        SAVE
      </button>
      <button
        id="allowSendNeutral"
        v-on:click="editTrigger(trigger)"
        v-if="allowSend == 3"
      >
        Nothing changed! Try again!
      </button>
      <button
        id="allowSendTrue"
        v-on:click="editTrigger(trigger)"
        v-if="(allowSend == 1)"
      >
        &#x2713;
      </button>
    </div>
    <div id="legend" v-if="Switch != false">
      <p class="inputForm" v-if="message == ''">Message: Required</p>
      <p class="inputFormTrue" v-if="message != ''">
        Message: Required &#x2713;
      </p>
      <p class="inputForm" v-if="channel == ''">Channel: Required</p>
      <p class="inputFormTrue" v-if="channel != ''">
        Channel: Required &#x2713;
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TriggersService from '../store/modules/TriggersService';

export default {
  name: 'TriggerTable',
  data() {
    return {
      message: '',
      trigger: '',
      channel: '',
      active: false,
      Switch: false,
      allowSend: 0,
      error: '',
    };
  },
  methods: {
    ...mapActions([
      'fetchTriggers',
      'fetchMessages',
      'fetchController',
      'fetchChannels',
    ]),
    async deleteTrigger(trigger) {
      await TriggersService.deleteTrigger(trigger, this.token);
      this.fetchTriggers(this.token);
    },
    async editTrigger(triggerWord) {
      if (this.message !== '') {
        if (this.channel !== '') {
          try {
            await TriggersService.editTrigger(
              this.message,
              triggerWord,
              this.channel,
              this.active.toString(),
              this.token
            );

            this.allowSend = 1;
            setTimeout(() => {
              this.message = '';
              this.trigger = '';
              this.allowSend = 0;
              this.channel = '';
              this.fetchController();
              this.active = false;
              this.Switch = false;
              this.fetchTriggers(this.token);
            }, 2500);
          } catch (err) {
            if (err.toString() === 'Error: Network Error') {
              this.$router.push('./ErrorView');
            }
            if (err.response.statusText === 'Method Not Allowed') {
              this.allowSend = 3;
            }
          }
        } else {
          this.allowSend = 2;
        }
      } else {
        this.allowSend = 2;
      }
    },
    openEdit(trigg, act, mess, chan) {
      this.Switch = true;
      this.trigger = trigg;
      this.fetchController();
      if (act === 'false') {
        this.active = false;
      } else {
        this.active = true;
      }
      this.message = mess;
      this.channel = chan;
    },
    turnOff() {
      if (this.Switch === true) {
        this.message = '';
        this.trigger = '';
        this.channel = '';
        this.active = false;
        this.fetchController();
        this.Switch = false;
        this.allowSend = 0;
      }
    },
  },
  computed: mapGetters(['allMessages', 'allTriggers', 'token', 'allChannels']),
  created() {
    if (this.token !== '') {
      this.fetchTriggers(this.token);
      this.fetchMessages(this.token);
      this.fetchChannels(this.token);
    }
  },
};
</script>

<style scoped>
.table1 {
  margin: 0 auto;
  overflow: auto;
  opacity: 0.8;
}

tr:nth-child(even) {
  background: lightgray;
}
tr:nth-child(odd) {
  background: white;
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

#editTrigger {
  position: absolute;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 10% 15% 10% 10% 15% 10% 10% 10% 10%;
  background-color: rgb(202, 202, 202);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 60%;
  height: 60%;
  border: 0.3vh solid black;
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
  border: none;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 3vh;
  border-bottom: solid black 0.1vh;
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

#message {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  font-size: 4vh;
  font-weight: bold;
  position: absolute;
  top: 10%;
  left: 1%;
}

#selectMessage {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 35vh;
  height: 6vh;
  font-size: 2.2vh;
  position: absolute;
  left: 1%;
}

#trigger {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  font-size: 4vh;
  font-weight: bold;
  position: absolute;
  top: 15%;
  left: 1%;
}

#inputForText {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 6;
  margin-left: 1%;
  width: 34vh;
  margin-top: 1%;
  font-size: 3vh;
  height: 4vh;
  border: 0.1vh solid black;
  background-color: white;
}

#channel {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  font-size: 4vh;
  font-weight: bold;
  position: absolute;
  top: 5%;
  left: 1%;
}

#selectChannel {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 7;
  grid-row-end: 8;
  width: 35vh;
  height: 4vh;
  font-size: 2.5vh;
  position: absolute;
  left: 1%;
  top: 5%;
}

#checkActive {
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 8;
  grid-row-end: 9;
  width: 3vh;
  height: 3vh;
}

#active {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 8;
  grid-row-end: 9;
  font-size: 3vh;
}

#saveButton {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 9;
  grid-row-end: 10;
  font-size: 3vh;
  font-weight: bold;
  cursor: pointer;
}

#allowSendFalse {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 9;
  grid-row-end: 10;
  font-size: 3vh;
  font-weight: bold;
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
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 9;
  grid-row-end: 10;
  font-size: 3vh;
  font-weight: bold;
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
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 9;
  grid-row-end: 10;
  font-size: 3vh;
  font-weight: bold;
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

#saveButton:hover {
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 9;
  grid-row-end: 10;
  font-size: 3vh;
  font-weight: bold;
  background-color: cornflowerblue;
  cursor: pointer;
}

.mobileReqChannel {
  display: none;
}

.mobileReqChannelTrue {
  display: none;
}

.mobileReqMessage {
  display: none;
}

.mobileReqMessageTrue {
  display: none;
}

.mobileReqTrigger {
  display: none;
}

.mobileReqTriggerTrue {
  display: none;
}

#legend {
  position: absolute;
  left: 1.5%;
  top: 55%;
  z-index: 2;
  width: 10vw;
  text-align: center;
}

.inputForm {
  left: 0;
  text-align: left;
  color: red;
  width: 20vh;
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
  width: 20vh;
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
    width: 18vw;
    max-width: 18vw;
  }
  .trigger {
    width: 20vw;
    max-width: 20vw;
  }
  .channel {
    width: 18vw;
    max-width: 18vw;
  }
  .active {
    width: 16vw;
    max-width: 16vw;
  }
  .action {
    width: 11vw;
    max-width: 11vw;
  }

  .headRow td {
    height: 10vw;
    font-size: 4vw;
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
    width: 11vw;
    height: 11vw;
    font-size: 4vh;
    cursor: pointer;
  }

  #Delete {
    width: 11vw;
    height: 11vw;
    font-size: 4vw;
    cursor: pointer;
  }

  #editTrigger {
    position: absolute;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 10% 15% 10% 10% 15% 10% 10% 10% 10%;
    background-color: rgb(202, 202, 202);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 80%;
    border: 0.5vw solid black;
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
    border: none;
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 7vw;
    border-bottom: solid black 0.1vw;
    margin-left: 1%;
  }

  #exit {
    position: absolute;
    right: 1%;
    top: 1%;
    cursor: pointer;
    width: 12%;
    height: 7%;
    font-size: 80%;
    font-weight: bolder;
    line-height: 20%;
  }

  #message {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    font-size: 6vw;
    font-weight: bold;
    position: absolute;
    top: 10%;
    left: 1%;
  }

  #selectMessage {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 3;
    grid-row-end: 4;
    width: 50vw;
    height: 11vw;
    font-size: 4vw;
    position: absolute;
    left: 1%;
    top: -40%;
  }

  #trigger {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    font-size: 6vw;
    font-weight: bold;
    position: absolute;
    top: 15%;
    left: 1%;
  }

  #inputForText {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 6;
    margin-left: 1%;
    width: 50vw;
    margin-top: 1%;
    font-size: 5vw;
    height: 7vw;
    border: 0.1vw solid black;
    background-color: white;
  }

  #channel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    font-size: 6vw;
    font-weight: bold;
    position: absolute;
    top: 5%;
    left: 1%;
  }

  #selectChannel {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 7;
    grid-row-end: 8;
    width: 50vw;
    height: 8vw;
    font-size: 4vw;
    position: absolute;
    left: 1%;
    top: 5%;
  }

  #checkActive {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vw solid black;
    grid-row-start: 8;
    grid-row-end: 9;
    width: 6vw;
    height: 6vw;
  }

  #active {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 8;
    grid-row-end: 9;
    font-size: 6vw;
  }

  #saveButton {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 7vw;
    font-weight: bold;
    cursor: pointer;
  }

  #allowSendFalse {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 7vw;
    font-weight: bold;
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
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 4vw;
    font-weight: bold;
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
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vw solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 7vw;
    font-weight: bold;
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

  .mobileReqChannel {
    display: unset;
    position: absolute;
    font-size: 8vw;
    color: red;
    left: 40%;
    font-weight: bolder;
    top: 58%;
  }

  .mobileReqChannelTrue {
    display: unset;
    font-size: 8vw;
    position: absolute;
    font-weight: bolder;
    color: green;
    top: 58%;
    left: 40%;
  }

  .mobileReqMessage {
    display: unset;
    font-size: 8vw;
    color: red;
    position: absolute;
    left: 40%;
    font-weight: bolder;
    top: 10%;
  }

  .mobileReqMessageTrue {
    display: unset;
    font-size: 8vw;
    position: absolute;
    font-weight: bolder;
    color: green;
    top: 10%;
    left: 40%;
  }

  .mobileReqTrigger {
    display: unset;
    font-size: 8vw;
    position: absolute;
    color: red;
    font-weight: bolder;
    top: 36%;
    left: 40%;
  }

  .mobileReqTriggerTrue {
    display: unset;
    font-size: 8vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 36%;
    left: 40%;
  }

  #legend {
    display: none;
  }
}
@media screen and (max-width: 768px) and (orientation: landscape) and (min-width: 601px) {
  td {
    overflow: auto;
    height: 8vh;
  }

  .title {
    width: 18vw;
    max-width: 18vw;
  }
  .trigger {
    width: 25vw;
    max-width: 25vw;
  }
  .channel {
    width: 18vw;
    max-width: 18vw;
  }
  .active {
    width: 15vw;
    max-width: 15vw;
  }
  .action {
    width: 15vw;
    max-width: 15vw;
  }

  .headRow td {
    height: 5vh;
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

  #editTrigger {
    position: absolute;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 10% 15% 10% 10% 15% 10% 10% 10% 10%;
    background-color: rgb(202, 202, 202);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 70%;
    height: 60%;
    border: 0.5vh solid black;
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
    border: none;
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 4.5vh;
    border-bottom: solid black 0.1vh;
    margin-left: 1%;
  }

  #exit {
    position: absolute;
    right: 1%;
    top: 1%;
    cursor: pointer;
    width: 9%;
    height: 7%;
    font-size: 80%;
    font-weight: bolder;
    line-height: 20%;
  }

  #message {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    font-size: 4.5vh;
    font-weight: bold;
    position: absolute;
    top: 10%;
    left: 1%;
  }

  #selectMessage {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 3;
    grid-row-end: 4;
    width: 50vh;
    height: 8vh;
    font-size: 3vh;
    position: absolute;
    left: 1%;
    top: -40%;
  }

  #trigger {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    font-size: 4.5vh;
    font-weight: bold;
    position: absolute;
    top: 15%;
    left: 1%;
  }

  #inputForText {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 6;
    margin-left: 1%;
    width: 50vh;
    margin-top: 1%;
    font-size: 4vh;
    height: 5vh;
    border: 0.1vh solid black;
    background-color: white;
  }

  #channel {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 6;
    grid-row-end: 7;
    font-size: 4.5vh;
    font-weight: bold;
    position: absolute;
    top: 5%;
    left: 1%;
  }

  #selectChannel {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 7;
    grid-row-end: 8;
    width: 50vh;
    height: 5vh;
    font-size: 4vh;
    position: absolute;
    left: 1%;
    top: 5%;
  }

  #checkActive {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.1vh solid black;
    grid-row-start: 8;
    grid-row-end: 9;
    width: 4vh;
    height: 4vh;
  }

  #active {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 8;
    grid-row-end: 9;
    font-size: 4.5vh;
  }

  #saveButton {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 4vh;
    font-weight: bold;
    cursor: pointer;
  }

  #allowSendFalse {
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 4vh;
    font-weight: bold;
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
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 4vh;
    font-weight: bold;
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
    grid-column-start: 1;
    grid-column-end: 3;
    border: 0.1vh solid black;
    grid-row-start: 9;
    grid-row-end: 10;
    font-size: 4vh;
    font-weight: bold;
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

  .mobileReqChannel {
    display: unset;
    position: absolute;
    font-size: 4.5vh;
    color: red;
    left: 25%;
    font-weight: bolder;
    top: 58%;
  }

  .mobileReqChannelTrue {
    display: unset;
    font-size: 6vh;
    position: absolute;
    font-weight: bolder;
    color: green;
    top: 58%;
    left: 25%;
  }

  .mobileReqMessage {
    display: unset;
    font-size: 6vh;
    color: red;
    position: absolute;
    left: 25%;
    font-weight: bolder;
    top: 9%;
  }

  .mobileReqMessageTrue {
    display: unset;
    font-size: 6vh;
    position: absolute;
    font-weight: bolder;
    color: green;
    top: 9%;
    left: 25%;
  }

  .mobileReqTrigger {
    display: unset;
    font-size: 6vh;
    position: absolute;
    color: red;
    font-weight: bolder;
    top: 34%;
    left: 25%;
  }

  .mobileReqTriggerTrue {
    display: unset;
    font-size: 6vh;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 34%;
    left: 25%;
  }

  #legend {
    display: none;
  }
}
</style>
