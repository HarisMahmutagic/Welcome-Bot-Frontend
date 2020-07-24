<template>
  <div class="table">
    <table v-bind:class="{ table1: !blurScreen, table1Blur: blurScreen }">
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
        <td class="action">
          <button
            id="Edit"
            title="Edit message"
            v-on:click="editOpen(message.title, message.text)"
          >
            &#9998;
          </button>
          <button
            id="Delete"
            title="Delete message"
            v-on:click="deleteMessage(message.title)"
          >
            &#9986;
          </button>
        </td>
      </tr>
    </table>

    <div id="legend" v-if="edit != false">
      <p class="inputForm" v-if="title.length < 1">Title: Required</p>
      <p class="inputFormTrue" v-if="title.length >= 1">
        Title:Requred &#x2713;
      </p>
      <p class="inputForm" v-if="title.length < 5 || title.length > 30">
        Title: <br />
        Min Length:5 <br />
        Max Length:30
      </p>
      <p class="inputFormTrue" v-if="title.length >= 5 && title.length <= 30">
        Title: <br />
        Min Length:5 <br />
        Max Length:30 &#x2713;
      </p>
      <p class="inputForm" v-if="!checkSymbols()">
        Title: Symbols not allowed
      </p>
      <p class="inputFormTrue" v-if="checkSymbols()">
        Title:Symbols not allowed &#x2713;
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
    <div id="editMessage" v-if="edit != false">
      <div id="header">
        Edit Message!
        <button id="exit" v-on:click="turnOff">X</button>
      </div>
      <form id="inputTitle">
        <label for="title" id="labelForTitle">Title</label>
        <label
          for="title"
          id="mobileCheckFalseTitle"
          v-if="
            title.length < 1 ||
            title.length < 5 ||
            title.length > 30 ||
            checkWhitespace() ||
            !checkSymbols()
          "
          >X</label
        >
        <label
          for="title"
          id="mobileCheckTrueTitle"
          v-if="
            title.length >= 1 &&
            title.length >= 5 &&
            title.length <= 30 &&
            !checkWhitespace() &&
            checkSymbols()
          "
          >&#x2713;</label
        >
        <div id="inputForTitle">{{ title }}</div>
      </form>
      <form id="inputText">
        <label for="text" id="labelForText">Text</label>
        <label
          for="text"
          id="mobileCheckFalseText"
          v-if="text.length < 1 || text.length < 20"
          >X</label
        >
        <label for="text" id="mobileCheckTrueText" v-if="text.length >= 20"
          >&#x2713;</label
        >
        <textarea
          type="text"
          id="inputForText"
          v-model="text"
          rows="4"
          cols="50"
        />
      </form>
      <button id="saveButton" v-on:click="editMessage" v-if="allowSend == 0">
        SAVE
      </button>
      <button
        id="allowSendFalse"
        v-on:click="editMessage"
        v-if="allowSend == 2"
      >
        SAVE
      </button>
      <button
        id="allowSendNeutral"
        v-on:click="editMessage"
        v-if="allowSend == 3"
      >
        Nothing changed! Try again!
      </button>
      <button id="allowSendTrue" v-on:click="editMessage" v-if="allowSend == 1">
        &#x2713;
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MessagesService from '../store/modules/MessagesService';

export default {
  name: 'MessageTable',
  data() {
    return {
      edit: false,
      title: '',
      text: '',
      allowSend: 0,
      blurScreen: false,
      error: '',
    };
  },
  methods: {
    ...mapActions(['fetchMessages']),
    async deleteMessage(messagetitle) {
      await MessagesService.deleteMessage(messagetitle);
      this.fetchMessages();
    },
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
    turnOff() {
      // eslint-disable-next-line eqeqeq
      if (this.edit == true) {
        this.edit = false;
        this.title = '';
        this.text = '';
        this.blurScreen = false;
        this.allowSend = 0;
      }
    },
    editOpen(messageTitle, messageText) {
      this.title = messageTitle;
      this.text = messageText;
      this.edit = true;
      this.blurScreen = true;
    },
    async editMessage() {
      if (this.title.length >= 5 && this.title.length <= 30) {
        // Check text length
        if (this.text.length >= 20) {
          // eslint-disable-next-line no-undef
          // Check for whitespaces in title
          const temp = this.title.split('');
          if (!temp.includes(' ')) {
            if (this.checkSymbols() === true) {
              try {
                await MessagesService.editMessage(this.title, this.text);
                this.allowSend = 1;
                setTimeout(() => {
                  this.allowSend = 0;
                  this.fetchMessages();
                  this.edit = false;
                  this.blurScreen = false;
                }, 2500);
              } catch (err) {
                this.error = err;
                if (
                  err.toString() ===
                  'Error: Request failed with status code 304'
                ) {
                  this.allowSend = 3;
                }
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
    // Checking for WhiteSpaces
    checkWhitespace() {
      const temp = this.title.split('');
      if (temp.includes(' ')) {
        return true;
      }
      return false;
    },
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

.table1 {
  margin: 0 auto;
  overflow: auto;
}

.table1Blur {
  margin: 0 auto;
  filter: blur(3px);
  overflow: auto;
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
  font-size: 1.3vw;
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

#editMessage {
  width: 60%;
  height: 60%;
  position: absolute;
  top: 20%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 40% 40% 10%;
  background-color: rgb(202, 202, 202);
  animation: slit-in-vertical 0.45s ease-out both;
  filter: unset;
  border: 0.3vh solid black;
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

#inputTitle {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
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

#labelForTitle {
  top: 20%;
  position: absolute;
  font-size: 5vh;
  font-weight: bold;
}

#inputForTitle {
  top: 35%;
  position: absolute;
  width: 25vh;
  height: 3vh;
  left: 1%;
  font-size: 2vh;
  background-color: white;
  border: 0.1vh solid black;
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

#mobileCheckFalseTitle {
  display: none;
}

#mobileCheckTrueTitle {
  display: none;
}

#mobileCheckFalseText {
  display: none;
}

#mobileCheckTrueText {
  display: none;
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
    transform: scaleX(0.2);
  }
  100% {
    transform: scaleX(1);
  }
}

#allowSendNeutral {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  font-weight: bold;
  line-height: 0%;
  font-size: 2vh;
  cursor: pointer;
  background-color: rgb(229, 255, 0);
  animation: scale-up-hor-centera 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes scale-up-hor-centera {
  0% {
    transform: scaleX(0.5);
  }
  100% {
    transform: scaleX(1);
  }
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

#legend {
  position: absolute;
  left: 1%;
  top: 50%;
  z-index: 2;
  width: 20vh;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .title {
    width: 10vw;
    max-width: 10vw;
  }
  .text {
    width: 50vw;
    max-width: 50vw;
  }
  .date {
    width: 18vw;
    max-width: 18vw;
  }
  .action {
    width: 10vw;
    max-width: 10vw;
  }

  .headRow td {
    height: 10vw;
    font-size: 5vw;
    background-color: rgb(143, 143, 143);
    color: white;
    text-align: center;
  }
  .row td {
    font-size: 3vw;
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

  #editMessage {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 9%;
    left: 9%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 40% 40% 10%;
    background-color: rgb(202, 202, 202);
    animation: slit-in-vertical 0.45s ease-out both;
    z-index: 1;
    border: 0.5vw solid black;
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

  #header {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    border-bottom: black 0.2vw solid;
    font-size: 7vw;
    margin-left: 1%;
  }

  #inputTitle {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  #labelForTitle {
    top: 20%;
    position: absolute;
    font-size: 10vw;
    font-weight: bold;
  }

  #inputForTitle {
    top: 35%;
    position: absolute;
    width: 45vw;
    height: 7vw;
    left: 1%;
    font-size: 4vw;
    background-color: white;
    border: 0.1vh solid black;
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
    font-size: 10vw;
    font-weight: bold;
  }

  #inputForText {
    top: 70%;
    position: absolute;
    width: 65vw;
    height: 15vw;
    left: 1%;
    font-size: 4vw;
  }

  #legend {
    display: none;
  }
  #mobileCheckFalseTitle {
    display: unset;
    font-size: 8vw;
    color: red;
    font-weight: bolder;
    position: absolute;
    left: 30%;
    top: 21%;
  }

  #mobileCheckTrueTitle {
    display: unset;
    font-size: 8vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    left: 30%;
    top: 20%;
  }
  #mobileCheckFalseText {
    display: unset;
    font-size: 8vw;
    color: red;
    position: absolute;
    font-weight: bolder;
    top: 56%;
    left: 30%;
  }

  #mobileCheckTrueText {
    display: unset;
    font-size: 8vw;
    font-weight: bolder;
    color: green;
    position: absolute;
    top: 55%;
    left: 30%;
  }

  #allowSendTrue {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: center;
    font-weight: bold;
    line-height: 0%;
    font-size: 5vw;
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

  #allowSendNeutral {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: center;
    font-weight: bold;
    line-height: 0%;
    font-size: 4vw;
    cursor: pointer;
    background-color: rgb(229, 255, 0);
    animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }

  #allowSendFalse {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: center;
    font-weight: bold;
    font-size: 5vw;
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
}
@media screen and (max-width: 768px) and (orientation: landscape) and (min-width: 601px) {
  .title {
    width: 12vh;
    max-width: 12vh;
  }
  .text {
    width: 80vh;
    max-width: 90vh;
  }
  .date {
    width: 16vh;
    max-width: 16vh;
  }
  .action {
    width: 18vh;
    max-width: 18vh;
  }

  .headRow td {
    height: 5vh;
    font-size: 3vh;
    background-color: rgb(143, 143, 143);
    color: white;
    text-align: center;
  }
  .row td {
    font-size: 3vh;
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

  #legend {
    display: none;
  }

  #editMessage {
    width: 70%;
    height: 60%;
    position: absolute;
    top: 15%;
    left: 15%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 40% 40% 10%;
    background-color: rgb(202, 202, 202);
    animation: slit-in-vertical 0.45s ease-out both;
    z-index: 1;
    border: 0.5vh solid black;
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

  #inputTitle {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  #labelForTitle {
    top: 20%;
    position: absolute;
    font-size: 6vh;
    font-weight: bold;
  }

  #inputForTitle {
    top: 35%;
    position: absolute;
    width: 45vh;
    height: 5vh;
    left: 1%;
    font-size: 4vh;
    background-color: white;
    border: 0.1vh solid black;
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
    font-size: 6vh;
    font-weight: bold;
  }

  #inputForText {
    top: 70%;
    position: absolute;
    width: 80vh;
    height: 8vh;
    left: 1%;
    font-size: 3vh;
  }

  #legend {
    display: none;
  }

  #mobileCheckFalseTitle {
    display: unset;
    font-size: 6vh;
    color: red;
    margin-left: 20%;
    font-weight: bolder;
    line-height: 300%;
  }

  #mobileCheckTrueTitle {
    display: unset;
    font-size: 6vh;
    font-weight: bolder;
    color: green;
    line-height: 300%;
    margin-left: 20%;
  }
  #mobileCheckFalseText {
    display: unset;
    font-size: 6vh;
    color: red;
    margin-left: 20%;
    font-weight: bolder;
    line-height: 200%;
  }

  #mobileCheckTrueText {
    display: unset;
    font-size: 6vh;
    font-weight: bolder;
    color: green;
    line-height: 200%;
    margin-left: 20%;
  }

  #allowSendTrue {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
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

  #allowSendNeutral {
    background-color: rgb(229, 255, 0);
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: center;
    font-weight: bold;
    line-height: 0%;
    font-size: 3vh;
    cursor: pointer;
    animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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
}
</style>
