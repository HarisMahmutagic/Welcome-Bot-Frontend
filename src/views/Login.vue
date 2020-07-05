<template>
  <div class="Login">
    
    <div id="title">
      <h1 class="text">Welcome Bot</h1>
      <h1 class="text">Admin LOGIN</h1>
    </div>
    
    <div id="pict"></div>

    <form id="inputForm">
      
      <label for="User" id="user">User Name</label>
      <input type="text"  id="inputUser" v-model="UserName">

      <label for="Password" id="pw">Password</label>
      <input type="password" id="inputPw" v-model="Password">

      <button type="button" id="loginButton" v-on:click="Login">Login</button> 
    </form>
    
    <div id="wrongUP" v-if="WrongUP!==false">Wrong User name or Password !</div>

  </div>
</template>

<script>

export default {
  name: 'Login',

  data(){
        return{
      WrongUP:false,
      UserName:'',
      Password:'',
        }
  },
  methods:{
   Login(){
        let self=this;
        if(self.UserName.toLowerCase() ==="admin" && self.Password==="admin"){
        self.$router.push('./MessagesView');}
        else{
        self.WrongUP=true;
        }
    } 
  }
}

</script>

<style scoped>

.Login{
  width: 50vh;
  height: 50vh;
  background-image: linear-gradient(70deg,rgb(34, 50, 189), rgb(142, 166, 243));
  border-radius: 10%;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  margin: auto; 
  position: absolute;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 10% 40%; 
}

#title{
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 2;
}

.text{
  font-size: 4vh;
  font-weight: bolder;
  height: 2vh;
  color: rgb(199, 198, 198);
  text-align: center;
}

#pict{
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

#inputForm{
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 4;
  grid-row-end: 5;
}

#wrongUP{
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 3;
  grid-row-end: 4;
  text-align: center;
  font-size: 3vh;
  color: rgb(199, 23, 23);
  font-weight: bold;
}

#user{
  position: absolute;
  left: 5%;
  top:66%;
  color: beige;
  font-size: 2.5vh;
}

#inputUser{
  position: absolute;
  border: 0.3vh solid grey;
  top:65%;
  left:30%;
  width: 30vh;
  height: 3vh;
}

#pw{
  position: absolute;
  left: 5%;
  top:76%;
  color: beige;
  font-size: 2.5vh;
}

#inputPw{
  position: absolute;
  left: 30%;
  top:75%;
  border: 0.3vh solid grey;
  width: 30vh;
  height: 3vh;
}

#loginButton{
  background-color: rgb(54, 54, 54);
  position: absolute;
  left: 65%;
  top:88%;
  width: 15vh;
  height: 5vh;
  font-size: 2.5vh;
  font-weight: bold;
  color: rgb(247, 247, 247);
  cursor: pointer;
}

#loginButton:hover{
  cursor: pointer;
  background-color: rgb(100, 100, 100);
  position: absolute;
  left: 65%;
  top:88%;
  width: 15vh;
  height: 5vh;
  font-size: 2.5vh;
  font-weight: bold;
  color: rgb(247, 247, 247);
}

@media screen and (max-width: 600px) and (orientation: portrait){

.Login{
  width: 99vw;
  height: 99vh;
  background-image: linear-gradient(70deg,rgb(34, 50, 189), rgb(142, 166, 243));
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

#title{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}

.text{
  font-size: 6vh;
  font-weight: bolder;
  height: 3vh;
  color: rgb(199, 198, 198);
  text-align: center;
}

#pict{
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

#inputForm{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
  left: 0;
  right: 0;
  margin: auto;
}

#user{
  position: absolute;
  left: 40%;
  top:55%;
  color: beige;
  font-size: 4.5vw;
}

#inputUser{
  position: absolute;
  border: 0.3vw solid grey;
  top:60%;
  left:22%;
  width: 55vw;
  height: 6vw;
}

#pw{
  position: absolute;
  left: 41%;
  top:70%;
  color: beige;
  font-size: 4.5vw;
}

#inputPw{
  position: absolute;
  left: 22%;
  top:75%;
  border: 0.3vw solid grey;
  width: 55vw;
  height: 6vw;
}

#loginButton{
  background-color: rgb(54, 54, 54);
  position: absolute;
  left: 35%;
  top:88%;
  width: 30vw;
  height: 10vw;
  font-size: 2.5vw;
  font-weight: bold;
  color: rgb(247, 247, 247);
  cursor: pointer;
}

#loginButton:hover{
  cursor: pointer;
  background-color: rgb(54 , 54, 54);
  position: absolute;
  left: 35%;
  top:88%;
  width: 30vw;
  height: 10vw;
  font-size: 2.5vw;
  font-weight: bold;
  color: rgb(247, 247, 247);
}

#wrongUP{
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

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width:501px){

.Login{
  width: 100vh;
  height: 99vh;
  background-image: linear-gradient(70deg,rgb(34, 50, 189), rgb(142, 166, 243));
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

#title{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}

.text{
  font-size: 6vh;
  font-weight: bolder;
  height: 3vh;
  color: rgb(199, 198, 198);
  text-align: center;
}

#pict{
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

#inputForm{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
  left: 0;
  right: 0;
  margin: auto;
}

#user{
  position: absolute;
  left: 5%;
  top:65%;
  color: beige;
  font-size: 5vh;
}

#inputUser{
  position: absolute;
  border: 0.3vh solid grey;
  top:65%;
  left:30%;
  width: 50vh;
  height: 5vh;
}

#pw{
  position: absolute;
  left: 5%;
  top:75%;
  color: beige;
  font-size: 5vh;
}

#inputPw{
  position: absolute;
  left: 30%;
  top:75%;
  border: 0.3vh solid grey;
  width: 50vh;
  height: 5vh;
}

#loginButton{
  background-color: rgb(54, 54, 54);
  position: absolute;
  left: 35%;
  top:88%;
  width: 30vh;
  height: 10vh;
  font-size: 3vh;
  font-weight: bold;
  color: rgb(247, 247, 247);
  cursor: pointer;
}

#loginButton:hover{
  background-color: rgb(54, 54, 54);
  position: absolute;
  left: 35%;
  top:88%;
  width: 30vh;
  height: 10vh;
  font-size: 3vh;
  font-weight: bold;
  color: rgb(247, 247, 247);
  cursor: pointer;
}

#wrongUP{
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
