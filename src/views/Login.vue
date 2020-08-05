<template>
  <div class="Login">
    <!--Title -->
    <div id="title">
      <h1 class="text">Welcome Bot</h1>
      <h1 class="text">Admin LOGIN</h1>
    </div>

    <!--Logo picture -->
    <div id="pict"></div>

    <!-- Input Form for Username and password -->
    <form id="inputForm">
      <label for="User" id="user">Username: </label>
      <div
        id="inputUser"
        v-on:click="openInputForUser"
        v-if="InputForUser == false"
      ></div>
      <input
        type="text"
        id="inputUserOpened"
        v-model="UserName"
        v-if="InputForUser == true"
      />

      <label for="Password" id="pw">Password: </label>
      <div
        id="inputPw"
        v-on:click="openInputForPW"
        v-if="InputForPW == false"
      ></div>
      <input
        type="password"
        id="inputPwOpened"
        v-model="Password"
        v-if="InputForPW == true"
      />

      <button
        type="button"
        id="loginButton"
        v-on:click="Login(UserName, Password)"
      >
        Login
      </button>
    </form>

    <!-- Message for wrong username or password -->
    <div id="wrongUP" v-if="WrongUP !== false">
      Wrong User name or Password !
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoginService from '../store/modules/loginService';

export default {
  name: 'Login',

  data() {
    return {
      WrongUP: false,
      UserName: '',
      Password: '',
      InputForUser: false,
      InputForPW: false,
      error: '',
    };
  },
  computed: mapGetters(['token']),
  methods: {
    ...mapActions(['getToken']),
    async Login(UserName, Password) {
      try {
        const response = await LoginService.logIn(UserName, Password);
        this.$store.commit('getToken', response.data.token.toString());
        this.$router.push('./MessagesView');
      } catch (error) {
        if (error.toString() === 'Error: Network Error') {
          this.$router.push('./ErrorView');
        }
        if (error.toString() === 'Error: Request failed with status code 406') {
          this.WrongUP = true;
        }
      }
    },
    openInputForUser() {
      const self = this;
      if (self.InputForUser === false) self.InputForUser = true;
    },

    openInputForPW() {
      const self = this;
      if (self.InputForPW === false) self.InputForPW = true;
    },
  },
};
</script>

<style scoped>
.Login {
  text-align: center;
  width: 50vh;
  height: 50vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 10% 40%;
  -webkit-animation: bounce-in-fwd 1.1s both;
  animation: bounce-in-fwd 1.1s both;
  color: black;
}

.Login > * {
  color: black;
}

@keyframes bounce-in-fwd {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  38% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  55% {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: scale(0.84);
    transform: scale(0.84);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  89% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

#title {
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 2;
}

.text {
  font-size: 4vh;
  font-weight: bolder;
  height: 2vh;
  text-align: center;
}

#pict {
  background-image: url('../assets/BOTPicture.png');
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 12vh;
  width: 12vh;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
}

#inputForm {
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 4;
  grid-row-end: 5;
}

#inputForm > label {
  font-style: italic;
}

#wrongUP {
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 3;
  grid-row-end: 4;
  text-align: center;
  font-size: 3vh;
  color: rgb(199, 23, 23);
  font-weight: bold;
  animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

#user {
  position: absolute;
  left: 5%;
  top: 66%;
  font-size: 2.5vh;
}

#inputUser {
  position: absolute;
  top: 65%;
  left: 30%;
  width: 30vh;
  height: 3vh;
  background: transparent;
  cursor: pointer;
  border-bottom: 0.3vh solid white;
}

#inputUserOpened {
  position: absolute;
  font-size: 2vh;
  top: 65%;
  left: 30%;
  width: 30vh;
  height: 3vh;
  background-color: wheat;
  animation: conditionalOpen 0.4s normal forwards ease-in-out;
}

@keyframes conditionalOpen {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

#pw {
  position: absolute;
  left: 5%;
  top: 76%;
  font-size: 2.5vh;
}

#inputPw {
  position: absolute;
  left: 30%;
  top: 75%;
  width: 30vh;
  height: 3vh;
  background: transparent;
  cursor: pointer;
  border-bottom: 0.3vh solid white;
}

#inputPwOpened {
  position: absolute;
  font-size: 2vh;
  left: 30%;
  top: 75%;
  width: 30vh;
  height: 3vh;
  background-color: wheat;
  animation: conditionalOpen 0.4s normal forwards ease-in-out;
}

@keyframes conditionalOpen {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

#loginButton {
  background: linear-gradient(-70deg, #66b3ba, #8eb19d);
  box-shadow: 5px 10px;
  opacity: 0.7;
  position: absolute;
  left: 65%;
  top: 88%;
  width: 15vh;
  height: 5vh;
  font-size: 2.5vh;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

#loginButton:hover {
  cursor: pointer;
  background: linear-gradient(-70deg, #8eb19d, #66b3ba);
  box-shadow: 5px 10px;
  opacity: 1;
  position: absolute;
  left: 65%;
  top: 88%;
  width: 15vh;
  height: 5vh;
  font-size: 2.5vh;
  font-weight: bold;
}

@media screen and (max-width: 600px) and (orientation: portrait) {
  .Login {
    width: 99vw;
    height: 99vh;
    border-radius: 0%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    display: grid;
    grid-template-columns: 99%;
    grid-template-rows: 20% 25% 10% 45%;
  }

  #title {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .text {
    font-size: 6vh;
    font-weight: bolder;
    height: 3vh;
    text-align: center;
  }

  #pict {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    background-image: url('../assets/BOTPicture.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 25vh;
    width: 25vh;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
  }

  #inputForm {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 5;
    left: 0;
    right: 0;
    margin: auto;
  }

  #user {
    position: absolute;
    left: 40%;
    top: 55%;
    font-size: 4.5vw;
  }

  #inputUser {
    position: absolute;
    top: 60%;
    left: 22%;
    width: 55vw;
    height: 6vw;
    background: transparent;
    cursor: pointer;
    border-bottom: 0.3vh solid white;
  }

  #inputUserOpened {
    position: absolute;
    top: 60%;
    left: 22%;
    width: 55vw;
    height: 6vw;
    background-color: wheat;
  }

  #pw {
    position: absolute;
    left: 41%;
    top: 70%;
    font-size: 4.5vw;
  }

  #inputPw {
    position: absolute;
    left: 22%;
    top: 75%;
    width: 55vw;
    height: 6vw;
    background: transparent;
    cursor: pointer;
    border-bottom: 0.3vh solid white;
  }

  #inputPwOpened {
    position: absolute;
    left: 22%;
    top: 75%;
    width: 55vw;
    height: 6vw;
    background-color: wheat;
  }

  #loginButton {
    background-color: rgb(54, 54, 54);
    position: absolute;
    left: 35%;
    top: 88%;
    width: 30vw;
    height: 10vw;
    font-size: 4vw;
    font-weight: bold;
    cursor: pointer;
  }

  #loginButton:hover {
    cursor: pointer;
    background: linear-gradient(-70deg, #8eb19d, #66b3ba);
    box-shadow: 5px 10px;
    opacity: 1;
    position: absolute;
    left: 35%;
    top: 88%;
    width: 30vw;
    height: 10vw;
    font-size: 4vw;
    font-weight: bold;
  }

  #wrongUP {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
    text-align: center;
    color: rgb(148, 3, 3);
    font-weight: bold;
    font-size: 5vw;
  }
}

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width: 501px) {
  .Login {
    width: 100vh;
    height: 99vh;
    border-radius: 0%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    display: grid;
    grid-template-columns: 99%;
    grid-template-rows: 20% 25% 10% 45%;
  }

  #title {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .text {
    font-size: 6vh;
    font-weight: bolder;
    height: 3vh;
    text-align: center;
    opacity: 0.5;
  }

  #pict {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    background-image: url('../assets/BOTPicture.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 25vh;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
  }

  #inputForm {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 5;
    left: 0;
    right: 0;
    margin: auto;
  }

  #user {
    position: absolute;
    left: 5%;
    top: 65%;
    font-size: 5vh;
  }

  #inputUser {
    position: absolute;
    top: 65%;
    left: 30%;
    width: 50vh;
    height: 4vh;
    background: transparent;
    cursor: pointer;
    border-bottom: 0.3vh solid white;
  }

  #inputUserOpened {
    position: absolute;
    top: 65%;
    left: 30%;
    width: 50vh;
    height: 4vh;
    background-color: wheat;
  }

  #pw {
    position: absolute;
    left: 5%;
    top: 75%;
    font-size: 5vh;
  }

  #inputPw {
    position: absolute;
    left: 30%;
    top: 75%;
    width: 50vh;
    height: 3vh;
    background: transparent;
    cursor: pointer;
    border-bottom: 0.3vh solid white;
  }

  #inputPwOpened {
    position: absolute;
    left: 30%;
    top: 75%;
    width: 50vh;
    height: 4vh;
    background-color: wheat;
  }

  #loginButton {
    background-color: rgb(54, 54, 54);
    position: absolute;
    left: 35%;
    top: 88%;
    width: 30vh;
    height: 10vh;
    font-size: 3vh;
    font-weight: bold;
    cursor: pointer;
  }

  #loginButton:hover {
    cursor: pointer;
    background: linear-gradient(-70deg, #8eb19d, #66b3ba);
    box-shadow: 5px 10px;
    opacity: 1;
    position: absolute;
    left: 35%;
    top: 88%;
    width: 30vh;
    height: 10vh;
    font-size: 3vh;
    font-weight: bold;
  }
  #wrongUP {
    grid-column-start: 1;
    grid-column-end: 7;
    grid-row-start: 3;
    grid-row-end: 4;
    text-align: center;
    font-size: 5vh;
    color: rgb(148, 3, 3);
    font-weight: bold;
  }
}
</style>
