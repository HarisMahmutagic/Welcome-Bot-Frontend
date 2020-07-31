/* eslint-disable camelcase */
<template>
  <div id="MessageView">
    <!-- Extra button -->
    <div
      v-on:click="openExtra"
      v-bind:class="{
        extraButton: !blurScreen,
        extraButtonBlur: blurScreen,
      }"
    >
      ?
    </div>

    <!-- BOX1 First row - Header -->

    <div v-on:click="turnOff" class="box1">
      <a id="title">Messages View !</a>

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

        <p class="inputForm" v-if="title.length < 1">Title:Required</p>
        <p class="inputFormTrue" v-if="title.length >= 1">
          Title:Requred &#x2713;
        </p>

        <p class="inputForm" v-if="title.length < 5 || title.length > 30">
          Title:
          <br />Min Length:5 <br />Max Length:30
        </p>
        <p class="inputFormTrue" v-if="title.length >= 5 && title.length <= 30">
          Title:
          <br />Min Length:5 <br />Max Length:30 &#x2713;
        </p>
        <p class="inputForm" v-if="!checkSymbols()">
          Title:
          <br />Symbols not allowed
        </p>
        <p class="inputFormTrue" v-if="checkSymbols()">
          Title:
          <br />Symbols not allowed &#x2713;
        </p>
        <p
          v-bind:class="{
            inputForm: checkWhitespace(),
            inputFormTrue: !checkWhitespace(),
          }"
        >
          Title: White space not allowed
        </p>
        <p class="inputForm" v-if="text.length < 1">Text: Required</p>
        <p class="inputFormTrue" v-if="text.length >= 1">
          Text:Requred &#x2713;
        </p>

        <p class="inputForm" v-if="text.length < 20">
          Text
          <br />Min Length:20
        </p>
        <p class="inputFormTrue" v-if="text.length >= 20">
          Text
          <br />Min Length:20 &#x2713;
        </p>
      </div>
    </div>
    <!-- BOX3 Right side with table -->

    <div class="box3" v-on:click="turnOff">
      <div v-bind:class="{ blurtable: blurScreen, blurtablenot: !blurScreen }">
        <MessageTable></MessageTable>
      </div>
    </div>

    <!-- CreatedON - New div for input new messages -->

    <div id="createdOn" v-if="createSwitch != false">
      <div id="header">
        Create Message!
        <button id="exit" v-on:click="turnOff">X</button>
      </div>

      <form id="title1">
        <label for="Title" id="labelForTitle">Title</label>

        <a
          class="mobTitle"
          v-if="
            title.length < 1 ||
            title.length < 5 ||
            title.length > 30 ||
            checkWhitespace()
          "
          >X</a
        >
        <a
          class="mobTitleTrue"
          v-if="
            title.length >= 1 &&
            title.length >= 5 &&
            title.length <= 30 &&
            !checkWhitespace()
          "
          >&#x2713;</a
        >

        <input type="text" id="inputForTitle" v-model="title" />
      </form>

      <form id="inputText">
        <label for="Text" id="labelForText">Text</label>

        <a class="mobText" v-if="text.length < 1 || text.length < 20">X</a>
        <a class="mobTextTrue" v-if="text.length >= 20">&#x2713;</a>

        <textarea
          id="inputForText"
          rows="4"
          cols="50"
          v-model="text"
        ></textarea>
      </form>
      <button id="saveButton" v-on:click="addMessage" v-if="(allowSend == 0)">
        SAVE
      </button>
      <button
        id="allowSendFalse"
        v-on:click="addMessage"
        v-if="(allowSend == 2)"
      >
        SAVE
      </button>
      <button
        id="allowSendTrue"
        v-on:click="addMessage"
        v-if="(allowSend == 1)"
      >
        &#x2713;
      </button>
      <button
        id="allowSendCheck"
        v-on:click="addMessage"
        v-if="(allowSend == 3)"
      >
        Title already exist! Try again !
      </button>
    </div>
    <!-- Extra div- Included informations about input-->
    <div id="extra" v-if="extra != false">
      <p class="mobileTitle" v-if="title.length < 1">Title: Required</p>
      <p class="mobileTitleTrue" v-if="title.length >= 1">
        Title: Required &#x2713;
      </p>

      <p class="mobileTitle" v-if="title.length < 5">
        Title: Minimum Length: 5
      </p>
      <p class="mobileTitleTrue" v-if="title.length >= 5">
        Title: Minimum Length: 5 &#x2713;
      </p>

      <p class="mobileTitle" v-if="title.length > 30 || title < 1">
        Title: Maximum Length: 30
      </p>
      <p class="mobileTitleTrue" v-if="title.length <= 30 && title.length >= 1">
        Title: Maximum Length: 30 &#x2713;
      </p>

      <p class="mobileText" v-if="text.length < 1">Text: Required</p>
      <p class="mobileTextTrue" v-if="text.length >= 1">
        Text: Required &#x2713;
      </p>

      <p class="mobileText" v-if="text.length < 20">Text: Minimum Length: 20</p>
      <p class="mobileTextTrue" v-if="text.length >= 20">
        Text: Minimum Length: 20 &#x2713;
      </p>
    </div>

    <!-- BOX4 - Bottom div ( footer ) -->

    <div v-on:click="turnOff" class="box4"></div>
    <!-- AddButton switch - For opening "CreatedON" div  -->

    <div
      v-on:click="createNew"
      v-bind:class="{ addButton: !controller, addButtonBlur: controller }"
    >
      Add
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MessageButton from '../components/MessageButton.vue';
import ScheduleButton from '../components/ScheduleButton.vue';
import TriggerButton from '../components/TriggerButton.vue';
import MessageTable from '../tables/MessageTable.vue';
import MessagesService from '../store/modules/MessagesService';
import LogOutButton from '../components/LogOutButton.vue';

export default {
  name: 'MessagesView',
  components: {
    MessageButton,
    ScheduleButton,
    TriggerButton,
    MessageTable,
    LogOutButton,
  },
  data() {
    return {
      dropDown: true,
      createSwitch: false,
      checkTitle: false,
      extra: false,
      title: '',
      text: '',
      allowSend: 0,
      blurScreen: false,
    };
  },
  computed: mapGetters(['allMessages', 'token', 'controller']),
  created() {
    if (this.token !== '') {
      this.fetchMessages(this.token);
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    ...mapActions(['fetchMessages', 'getToken']),
    // Function for opening drop down menu
    dropDownOnOff() {
      const self = this;
      if (self.dropDown === false) {
        self.dropDown = true;
      } else {
        self.dropDown = false;
      }
    },
    // Function for checking the presence of symbols
    checkSymbols() {
      const symbols = [
        '!',
        '"',
        '#',
        '$',
        '%',
        '&',
        '/',
        '(',
        ')',
        '=',
        '?',
        '*',
        '-',
        ',',
        ';',
        ':',
        '_',
        '~',
        'ˇ',
        '^',
        '˘',
        '°',
        '`',
        '˙',
        '´',
        '˝',
        '¨',
        '<',
        '>',
        '+',
        '*',
        '¨',
        '"',
        ']',
        '[',
        '{',
        '}',
        '@',
        '§',
      ];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.title.length; i++) {
        if (symbols.includes(this.title[i])) {
          return false;
        }
      }
      return true;
    },
    // Router to Message view
    goToMessage() {
      const self = this;
      self.dropDown = true;
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

    // Router to Login view
    goToLogin() {
      const empty = '';
      this.$store.commit('getToken', empty);
      this.$router.push('/');
    },
    // Function for opening "CreatedOn" div
    createNew() {
      if (this.controller === false) {
        const self = this;
        if (self.createSwitch === false) {
          self.createSwitch = true;
        } else {
          self.createSwitch = false;
        }
        if (self.extra === true) {
          self.extra = false;
        }
        if (self.blurScreen === false) {
          self.blurScreen = true;
        } else {
          self.blurScreen = false;
        }
      }
    },

    // Function for closing "CreatedOn" div by clicking outside of it
    turnOff() {
      const self = this;
      if (self.createSwitch === true) {
        self.createSwitch = false;
      }
      if (self.extra === true) {
        self.extra = false;
      }
      if (self.blurScreen === true) {
        this.blurScreen = false;
      }
      self.title = '';
      self.text = '';
      self.allowSend = 0;
    },

    // Function for opening Extra div
    openExtra() {
      const self = this;
      if (self.extra === false) {
        self.extra = true;
      } else {
        self.extra = false;
      }
    },

    // Checking for WhiteSpaces
    checkWhitespace() {
      const temp = this.title.split('');
      if (temp.includes(' ')) {
        return true;
      }
      return false;
    },

    // Create new message
    async addMessage() {
      // Get correct date format
      const date = new Date();
      let day = date.getDate();
      if (day < 10) day = `0${day}`;
      let month = date.getMonth() + 1;
      if (month < 10) month = `0${month}`;
      const year = date.getFullYear();
      // eslint-disable-next-line camelcase
      const cr_date = `${day}/${month}/${year}`;
      // Check title length
      if (this.title.length >= 5 && this.title.length <= 30) {
        // Check text length
        if (this.text.length >= 20) {
          // eslint-disable-next-line no-undef
          // Check for whitespaces in title
          const temp = this.title.split('');
          if (!temp.includes(' ')) {
            if (this.checkSymbols() === true) {
              if (this.token !== '') {
                try {
                  await MessagesService.addMessage(
                    this.title,
                    this.text,
                    cr_date,
                    this.token
                  );
                  this.allowSend = 1;
                  this.fetchMessages(this.token);
                  setTimeout(() => {
                    this.createSwitch = false;
                    this.blurScreen = false;
                    this.title = '';
                    this.text = '';
                    this.allowSend = 0;
                  }, 2500);
                } catch (err) {
                  // Check is title already exist
                  if (
                    err.toString() ===
                    'Error: Request failed with status code 302'
                  ) {
                    this.allowSend = 3;
                  }
                  // Check connection with database
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
          } else {
            this.allowSend = 2;
          }
        } else {
          this.allowSend = 2;
        }
      } else {
        // eslint-disable-next-line no-undef
        this.allowSend = 2;
      }
    },
  },
};
</script>

<style scoped>
#MessageView {
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

.extraButton {
  display: none;
}

.extraButtonBlur {
  display: none;
}

#extra {
  display: none;
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

.mobTitle {
  display: none;
}

.mobTitleTrue {
  display: none;
}

.mobText {
  display: none;
}

.mobTextTrue {
  display: none;
}

#createdOn {
  position: absolute;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 40% 40% 10%;
  background-color: rgb(202, 202, 202);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 60%;
  height: 60%;
  border: 0.3vh solid black;
  animation: slit-in-vertical 0.45s ease-out both;
  z-index: 1;
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
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  border-bottom: black 0.2vh solid;
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

#title1 {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
}

#labelForTitle {
  top: 20%;
  position: absolute;
  font-size: 5vh;
  font-weight: bold;
  left: 1%;
}

#inputForTitle {
  top: 35%;
  position: absolute;
  width: 25vh;
  height: 3vh;
  left: 1%;
  font-size: 2vh;
}

#inputText {
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}

#labelForText {
  top: 55%;
  position: absolute;
  font-size: 5vh;
  font-weight: bold;
  left: 1%;
}

#inputForText {
  top: 70%;
  position: absolute;
  width: 50vh;
  height: 7vh;
  left: 1%;
  font-size: 2vh;
}

#saveButton {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  font-weight: bold;
  font-size: 4vh;
  cursor: pointer;
}

#saveButton:hover {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  font-weight: bold;
  font-size: 4vh;
  cursor: pointer;
  background-color: cornflowerblue;
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

.addButtonBlur {
  width: 13vh;
  height: 5vh;
  color: black;
  background-color: white;
  filter: blur(3px);
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
  color: green;
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
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

#allowSendFalse {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
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
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
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
#allowSendCheck {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  font-weight: bold;
  line-height: 0%;
  font-size: 3vh;
  cursor: pointer;
  background-color: rgb(238, 255, 0);
  animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@media screen and (max-width: 600px) {
  #MessageView {
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

  .extraButton {
    display: unset;
    height: 5.4%;
    width: 10vw;
    position: absolute;
    right: 30%;
    top: 0.1%;
    text-align: center;
    font-weight: bolder;
    cursor: pointer;
    font-size: 5vw;
  }

  .extraButtonBlur {
    display: unset;
    height: 5.4%;
    width: 10vw;
    position: absolute;
    right: 30%;
    top: 0.1%;
    text-align: center;
    font-weight: bolder;
    cursor: pointer;
    font-size: 5vw;
    filter: blur(3px);
  }

  #extra {
    width: 70vw;
    height: 60vw;
    background-color: white;
    display: unset;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 0.2vw solid black;
    opacity: 90%;
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
    grid-template-columns: 100%;
    grid-template-rows: 10% 40% 40% 10%;
    background-color: rgb(202, 202, 202);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 80%;
    border: 0.5vw solid black;
  }

  #header {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    border-bottom: 0.1vw solid black;
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

  #title1 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  #labelForTitle {
    top: 20%;
    position: absolute;
    font-size: 9vw;
    font-weight: bold;
  }

  .mobTitle {
    display: unset;
    font-size: 6vw;
    color: red;
    position: absolute;
    top: 22%;
    left: 30%;
    font-weight: bolder;
  }

  .mobTitleTrue {
    display: unset;
    font-size: 6vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 21%;
    left: 30%;
  }

  .mobText {
    display: unset;
    font-size: 6vw;
    color: red;
    position: absolute;
    top: 57%;
    left: 30%;
    font-weight: bolder;
  }

  .mobTextTrue {
    display: unset;
    font-size: 6vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 56%;
    left: 30%;
  }

  #inputForTitle {
    top: 35%;
    position: absolute;
    width: 45vw;
    height: 5vw;
  }

  #inputText {
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  #saveButton {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .mobileTitle {
    font-size: 5vw;
    color: red;
  }

  .mobileTitleTrue {
    font-size: 5vw;
    color: green;
  }

  .mobileText {
    font-size: 5vw;
    color: red;
  }

  .mobileTextTrue {
    font-size: 5vw;
    color: green;
  }

  #labelForText {
    top: 55%;
    position: absolute;
    font-size: 9vw;
    font-weight: bold;
  }

  #inputForText {
    top: 70%;
    position: absolute;
    width: 65vw;
    height: 15vw;
  }

  #saveButton {
    text-align: center;
    font-weight: bold;
    font-size: 4vw;
    cursor: pointer;
  }

  #saveButton:hover {
    text-align: center;
    font-weight: bold;
    font-size: 4vw;
    cursor: pointer;
  }

  #allowSendCheck {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: center;
    font-weight: bold;
    line-height: 0%;
    font-size: 5vw;
    cursor: pointer;
    background-color: rgb(238, 255, 0);
    animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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

  .addButtonBlur {
    width: 17vw;
    height: 8vw;
    color: aliceblue;
    background-color: rgb(252, 252, 252);
    border: 0.1vw solid rgb(0, 0, 0);
    position: absolute;
    filter: blur(3px);
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
  #MessageView {
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
  }

  .box4 {
    grid-column-start: 1;
    grid-column-end: 2;
    border: 0.01vh solid black;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .mobTitle {
    display: unset;
    font-size: 5vh;
    color: red;
    position: absolute;
    top: 20%;
    left: 20%;
    font-weight: bolder;
  }

  .mobTitleTrue {
    display: unset;
    font-size: 5vh;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 20%;
    left: 20%;
  }

  .mobText {
    display: unset;
    font-size: 5vh;
    color: red;
    position: absolute;
    top: 55%;
    left: 20%;
    font-weight: bolder;
  }

  .mobTextTrue {
    display: unset;
    font-size: 5vh;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 55%;
    left: 20%;
  }

  .extraButton {
    display: unset;
    height: 6%;
    width: 10vh;
    position: absolute;
    right: 20%;
    top: 0.5%;
    text-align: center;
    font-weight: bolder;
    cursor: pointer;
    font-size: 4vh;
  }

  .extraButtonBlur {
    display: unset;
    height: 6%;
    width: 10vh;
    position: absolute;
    right: 20%;
    top: 0.1%;
    text-align: center;
    font-weight: bolder;
    cursor: pointer;
    font-size: 4vh;
    filter: blur(3px);
  }

  #extra {
    width: 70vh;
    height: 50vh;
    display: unset;
    position: absolute;
    margin: auto;
    background-color: white;
    border: 0.2vh solid black;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 90%;
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

  #createdOn {
    position: absolute;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 40% 40% 10%;
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

  #header {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    border-bottom: 0.1vh solid black;
    font-size: 4vh;
    margin-left: 1%;
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

  .mobileTitle {
    font-size: 4vh;
    color: red;
  }

  .mobileTitleTrue {
    font-size: 4vh;
    color: green;
  }

  .mobileText {
    font-size: 4vh;
    color: red;
  }

  .mobileTextTrue {
    font-size: 4vh;
    color: green;
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

  .addButtonBlur {
    width: 13vh;
    height: 7vh;
    color: black;
    background-color: white;
    border: 0.1vh solid rgb(0, 0, 0);
    position: absolute;
    right: 1%;
    filter: blur(3px);
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

  #inputForTitle {
    top: 35%;
    position: absolute;
    width: 30vh;
    height: 3vh;
  }

  #inputForText {
    top: 70%;
    position: absolute;
    width: 60vh;
    height: 7vh;
  }
}
</style>
