<template>

    <div id="TriggerView">

        <!-- Extra Button NOT BLURED -->
        <div id="extraButton" v-on:click="openExtra" v-if="bluredScreen==false && extraClicked==false">?</div> 

         <!-- Extra Button NOT BLURED CLICKED-->
        <div id="extraButtonClicked" v-on:click="openExtra" v-if="bluredScreen==false && extraClicked==true">?</div> 

        <!-- Extra Button BLURED -->
        <div id="extraButtonBlured" v-on:click="openExtra" v-if="bluredScreen==true">?</div> 


        <!-- BOX1 First row - Header NOT BLURED -->

        <div id="box1" v-on:click="turnOff" v-if="bluredScreen==false"><a id="title"> Trigger View !</a>
        
          <div id="dropDownButton" v-on:click="dropDownOnOff">&#9776;</div>
          <div id="routeMessageView" v-if="dropDown!=true" v-on:click="goToMessage">Messages</div>
          <div id="routeScheduleView" v-if="dropDown!=true" v-on:click="goToSchedule">Schedules</div>
          <div id="routeTriggerView" v-if="dropDown!=true" v-on:click="goToTrigger">Triggers</div>

        </div>

        <!-- BOX1 First row - Header BLURED-->

        <div id="box1Blured" v-on:click="turnOff" v-if="bluredScreen==true"><a id="title"> Trigger View !</a>
        
          <div id="dropDownButton" v-on:click="dropDownOnOff">&#9776;</div>
          <div id="routeMessageView" v-if="dropDown!=true" v-on:click="goToMessage">Messages</div>
          <div id="routeScheduleView" v-if="dropDown!=true" v-on:click="goToSchedule">Schedules</div>
          <div id="routeTriggerView" v-if="dropDown!=true" v-on:click="goToTrigger">Triggers</div>

        </div>

        <!-- BOX2 Left side with buttons NOT BLURED-->

        <div id="box2" v-on:click="turnOff" v-if="bluredScreen==false">
            <MessageButton></MessageButton>
            <ScheduleButton></ScheduleButton>
            <TriggerButton></TriggerButton>

            <div v-if="createSwitch!=false">

                <!-- Legend for computer screen-->
              <p class="inputForm" v-if="message.length<1">Message:<br>Required</p>
              <p class="inputFormTrue" v-if="message.length>=1">Message:<br>Requred &#x2713;</p>

              <p class="inputForm" v-if="trigger.length<1">Trigger:<br>Required</p>
              <p class="inputFormTrue" v-if="trigger.length>=1">Trigger:<br>Requred &#x2713;</p>

              <p class="inputForm" v-if="trigger.length<5">Trigger:<br>Min Length 5</p>
              <p class="inputFormTrue" v-if="trigger.length>=5">Trigger:<br>Min Length 5 &#x2713;</p>

              <p class="inputForm" v-if="trigger.length<5 || trigger.length>10">Trigger:<br>Max Length 10</p>
              <p class="inputFormTrue" v-if="trigger.length>=5 && trigger.length<=10">Trigger:<br>Max Length 10 &#x2713;</p>

              <p class="inputForm" v-if="channel==''">Channel:<br>Required</p>
              <p class="inputFormTrue" v-if="channel!=''">Channel:<br>Requred &#x2713;</p>

            </div>
            </div>
        
         <!-- BOX2 Left side with buttons BLURED-->

        <div id="box2Blured" v-on:click="turnOff" v-if="bluredScreen==true">
            <MessageButton></MessageButton>
            <ScheduleButton></ScheduleButton>
            <TriggerButton></TriggerButton>

            <div v-if="createSwitch!=false">

                <!-- Legend for computer screen-->
              <p class="inputForm" v-if="message.length<1">Message:<br>Required</p>
              <p class="inputFormTrue" v-if="message.length>=1">Message:<br>Requred &#x2713;</p>

              <p class="inputForm" v-if="trigger.length<1">Trigger:<br>Required</p>
              <p class="inputFormTrue" v-if="trigger.length>=1">Trigger:<br>Requred &#x2713;</p>

              <p class="inputForm" v-if="trigger.length<5">Trigger:<br>Min Length 5</p>
              <p class="inputFormTrue" v-if="trigger.length>=5">Trigger:<br>Min Length 5 &#x2713;</p>

              <p class="inputForm" v-if="trigger.length<5 || trigger.length>10">Trigger:<br>Max Length 10</p>
              <p class="inputFormTrue" v-if="trigger.length>=5 && trigger.length<=10">Trigger:<br>Max Length 10 &#x2713;</p>

              <p class="inputForm" v-if="channel==''">Channel:<br>Required</p>
              <p class="inputFormTrue" v-if="channel!=''">Channel:<br>Requred &#x2713;</p>

            </div>
            </div>


        <!-- BOX3 Right side with table NOT BLURED-->

        <div id="box3" v-on:click="turnOff" v-if="bluredScreen==false">
            <TriggerTable></TriggerTable>
        </div>

        <!-- BOX3 Right side with table BLURED -->

        <div id="box3Blured" v-on:click="turnOff" v-if="bluredScreen==true">
            <TriggerTable></TriggerTable>
        </div>

          <!-- CreatedON - New div for input new messages -->

          <div id="createdOn" v-if="createSwitch!=false" >
            <div id="header">Create trigger !</div>

            <label for="Message" id="message">Message</label>
            <a class="mobileReqMessage" v-if="message==''">X</a>
            <a class="mobileReqMessageTrue" v-if="message!=''">&#x2713;</a>

            <select id="selectMessage" v-model="message">
              <option value="Select1">Some message title</option>
            </select>

            <label for="Trigger" id="trigger">Trigger</label>
            <a class="mobileReqTrigger" v-if="trigger.length<5 || trigger.length>10">X</a>
            <a class="mobileReqTriggerTrue" v-if="trigger.length>=5 && trigger.length<=10">&#x2713;</a>

            <input type="Text" id="inputForText" v-model="trigger">

            <label for="Channel" id="channel">Channel</label>
            <a class="mobileReqChannel" v-if="channel==''">X</a>
            <a class="mobileReqChannelTrue" v-if="channel!=''">&#x2713;</a>

            <select id="selectChannel" v-model="channel">
              <option value="Select1">Some channel</option>
            </select>

            <input type="checkbox"  id="checkActive">
            <label for="Active" id="active">Active</label>

            <button id="saveButton">SAVE</button>

          </div>

          <div id="extra" v-if="extra!=false">
            <p class="mobMessage" v-if="message.length<1">Message: Required</p>
            <p class="mobMessageTrue" v-if="message.length>=1">Message: Required &#x2713;</p>
      
            <p class="mobTrigger" v-if="trigger.length<1">Trigger: Required</p>
            <p class="mobTriggerTrue" v-if="trigger.length>=1">Trigger: Required &#x2713;</p>

            <p class="mobTriggerMin" v-if="trigger.length<5">Trigger:<br> Minimum Length: 5</p>
            <p class="mobTriggerMinTrue" v-if="trigger.length>=5">Trigger:<br> Minimum Length: 5 &#x2713;</p>

            <p class="mobTriggerMax" v-if="trigger.length>10 || trigger.length<5" >Trigger:<br> Maximum Length: 10</p>
            <p class="mobTriggerMaxTrue" v-if="trigger.length<=10 && trigger.length>=5" >Trigger:<br> Maximum Length: 10 &#x2713;</p>
          
            <p class="mobChannel" v-if="channel.length<1">Channel: Required</p>
            <p class="mobChannelTrue" v-if="channel.length>=1">Channel: Required &#x2713;</p>

          </div>
        <!-- BOX4 - Bottom div ( footer ) NOT BLURED -->

        <div id="box4" v-on:click="turnOff" v-if="bluredScreen==false"></div>

         <!-- BOX4 - Bottom div ( footer ) BLURED -->

        <div id="box4Blured" v-on:click="turnOff" v-if="bluredScreen==true"></div>


        <!-- AddButton switch - For opening "CreatedON" div NOT BLURED -->

        <div id="addButton" v-on:click="createNew" v-if="bluredScreen==false">Add</div>

        <!-- AddButton switch - For opening "CreatedON" div BLURED -->

        <div id="addButtonBlured" v-on:click="createNew" v-if="bluredScreen==true">Add</div>
            
    </div>

</template>

<script>
import MessageButton from '../components/MessageButton'
import ScheduleButton from '../components/ScheduleButton'
import TriggerButton from '../components/TriggerButton'
import TriggerTable from '../tables/TriggerTable'


export default {
  name: 'Triggers',
  components:{ 
    MessageButton,
    ScheduleButton,
    TriggerButton,
    TriggerTable,
  },

  data(){
    return{
      dropDown:true,
      createSwitch:false,
      message:'',
      trigger:'',
      channel:'',
      extra:false,
      bluredScreen:false,
      extraClicked:false
    }
  },

  methods:{

      //Function for opening drop down menu
      dropDownOnOff(){
      let self = this;
      if(self.dropDown==false){
        self.dropDown=true;
      }
      else{self.dropDown=false}
    },

    //Router to Message view
    goToMessage(){
      let self = this;
      self.$router.push('./MessagesView');
    },

    //Router to Schedule view
    goToSchedule(){
      let self = this;
      self.$router.push('./SchedulesView');
    },

    //Router to Trigger view
    goToTrigger(){
      let self = this;
      self.dropDown=true;
    },

    //Function for opening "CreatedOn" div
    createNew(){
      let self = this;
      if(self.createSwitch==false){
        self.createSwitch=true;
      }
      else{
        self.createSwitch=false;
      }
      if(self.bluredScreen==false){
        self.bluredScreen=true;
      }
      else{
        self.bluredScreen=false;
      }
    },  
    
     //Function for closing "CreatedOn" div by clicking outside of it
    turnOff(){
      let self = this;
      if(self.createSwitch==true){
        self.createSwitch=false
      }
      if(self.extra==true){
        self.extra=false;
      }
      if(self.bluredScreen==true){
        self.bluredScreen=false;
      }
      if(self.extraClicked==true){
        self.extraClicked=false;
      }
    },

    //Function for opening Extra div
    openExtra(){
      let self = this;
      if(self.extra==false){
        self.extra = true;
      }
      else{
        self.extra = false;
      }
      if(self.extraClicked==false){
        self.extraClicked=true;
      }
      else{
        self.extraClicked=false;
      }
    },
  }
}
</script>

<style scoped>

#TriggerView{
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 5% 85% 10%;
  width: 120vh;
  height: 80vh;
  margin: auto;
  top:0;
  left:0;
  bottom:0;
  right:0;
  position: absolute;
  background-color: rgb(207, 206, 206);
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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

#box1{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.1vh solid black;
}

#box1Blured{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.1vh solid black;
  filter: blur(3px);
}

#title{
  font-size: 2.4vh;
  font-weight: bolder;
  margin-top: 1%;
  margin-left: 1%;
  position: absolute;
}

#box2{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box2Blured{
  grid-column-start: 1;
  grid-column-end: 2;
  border: none;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box3{
  grid-column-start: 2;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box3Blured{
  grid-column-start: 2;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 2;
  grid-row-end: 3;
  filter:blur(3px)
}

#box4{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
}

#box4Blured{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  filter: blur(3px);
}

#dropDownButton{
  display: none;
}

#routeMessageView{
  display: none;
}

#routeScheduleView{
  display: none;
}

#routeTriggerView{
  display: none;
}

#createdOn{
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

#header{
  grid-column-start: 1;
  grid-column-end: 3;
  border:none;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 3vh;
  border-bottom: solid black 0.1vh;
}
#message{
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

#selectMessage{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 35vh;
  height: 5vh;
  font-size: 2.5vh;
  position: absolute;
  left: 1%;
}

#trigger{
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

#inputForText{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 6;
  margin-left: 1%;
  width: 34vh;
  height: 4vh;
  border: 0.1vh solid black;

}

#channel{
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

#selectChannel{
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

#checkActive{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 8;
  grid-row-end: 9;
  width: 3vh;
  height: 3vh;
}

#active{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 8;
  grid-row-end: 9;
  font-size: 3vh;
}

#saveButton{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 9;
  grid-row-end: 10;
  font-size: 3vh;
  font-weight: bold;
  cursor: pointer;
}

#saveButton:hover{
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

#addButton{
  width: 13vh;
  height: 5vh;
  color: black;
  background-color:white;
  border: 0.1vh solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:3vh;
  font-weight: bolder;
  cursor: pointer;
  line-height: 150%;
}

#addButtonBlured{
  width: 13vh;
  height: 5vh;
  color: black;
  background-color:white;
  border: 0.1vh solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:3vh;
  font-weight: bolder;
  cursor: pointer;
  line-height: 150%;
  filter:blur(3px)
}

#addButton:hover{
  width: 13vh;
  height: 5vh;
  color: black;
  background-color:cornflowerblue;
  border: 0.1vh solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:3vh;
  font-weight: bolder;
  cursor: pointer;
  line-height: 150%;
}

.inputForm{
  color: red;
  font-size: 2vh;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  animation: flip-vertical-left 1s cubic-bezier(0.455, 0.030, 0.515, 0.955);
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

.inputFormTrue{
  color: green;
  font-size: 2vh;
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  animation: flip-vertical-right 1s cubic-bezier(0.455, 0.030, 0.515, 0.955);
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

.mobileReqChannel{
  display: none;
}

.mobileReqChannelTrue{
  display: none;
}

.mobileReqMessage{
  display: none;
}

.mobileReqMessageTrue{
  display: none;
}

.mobileReqTrigger{
  display: none;
}

.mobileReqTriggerTrue{
  display: none;
}

#extra{
  display:none;
}

#extraButton{
  display: none;
}

#extraButtonClicked{
  display: none;
}

#extraButtonBlured{
  display: none;
}

@media screen and (max-width: 600px) and (orientation: portrait){

#TriggerView{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 7% 83% 10%;
  width: 99vw;
  height: 99vh;
  margin: auto;
  top:0;
  left:0;
  bottom:0;
  right:0;
  position: absolute;
  background-color: rgb(207, 206, 206);
}

#box1{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.1vw solid black;
}

#box1Blured{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.1vw solid black;
  filter: blur(3px);
}

#title{
  font-size: 4vh;
  font-weight: bolder;
  margin-top: 1%;
  margin-left: 1%;
  position: absolute;
}

#extraButton{
  display: unset;
  height: 5.4%;
  width: 10vw;
  background-color: white;
  position: absolute;
  border: solid 0.3vw black;
  right: 30%;
  top:0.1%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 5vw;
}

#extraButtonClicked{
  display: unset;
  height: 5.4%;
  width: 10vw;
  background-color: white;
  position: absolute;
  border: none;
  right: 30%;
  top:0.1%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 5vw;
  border-top: black 0.3vw solid;
  border-left: black 0.3vw solid;
}

#extraButtonBlured{
  display: unset;
  height: 5.4%;
  width: 10vw;
  background-color: white;
  position: absolute;
  border: solid 0.3vw black;
  right: 30%;
  top:0.1%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 5vw;
  filter: blur(3px);
}

.mobMessage{
  color: red;
  font-size: 5vw;
  font-weight: bolder;
}

.mobMessageTrue{
  color: green;
  font-size: 5vw;
  font-weight: bolder;
}

.mobTrigger{
  color: red;
  font-size: 5vw;
  font-weight: bolder;
}

.mobTriggerTrue{
  color: green;
  font-size: 5vw;
  font-weight: bolder;
}

.mobTriggerMin{
  color: red;
  font-size: 5vw;
  font-weight: bolder;
}

.mobTriggerMinTrue{
  color: green;
  font-size: 5vw;
  font-weight: bolder;
}

.mobTriggerMax{
  color: red;
  font-size: 5vw;
  font-weight: bolder;
}

.mobTriggerMaxTrue{
  color: green;
  font-size: 5vw;
  font-weight: bolder;
}

.mobChannel{
  color: red;
  font-size: 5vw;
  font-weight: bolder;
}

.mobChannelTrue{
  color: green;
  font-size: 5vw;
  font-weight: bolder;
}

#extra{
  display: unset;
  width: 70vw;
  height: 70vw;
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

#box2{
  display: none;
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box2Blured{
  display: none;
  grid-column-start: 1;
  grid-column-end: 2;
  border: none;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box3{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box3Blured{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 2;
  grid-row-end: 3;
  filter: blur(3px);
}

#createdOn{
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
  border: 0.5vw solid;
}

#box4{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 3;
  grid-row-end: 4;
}

#box4Blured{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  filter: blur(3px);
}

#dropDownButton{
  height: 80%;
  width: 22vw;
  margin-right: 2%;
  display: unset;
  background-color: rgb(255, 255, 255);
  float: right;
  border: 0.3vw solid black;
  color: black;
  text-align: center;
  font-size: 6vw;
  line-height: 100%;
  cursor: pointer;
}

#dropDownButton:hover{
  height: 80%;
  width: 22vw;
  margin-right: 2%;
  display: unset;
  background-color:cornflowerblue;
  float: right;
  border: 0.3vw solid black;
  color: white;
  text-align: center;
  font-size: 6vw;
  line-height: 100%;
  cursor: pointer;  
}

#addButton{
  width: 17vw;
  height: 8vw;
  color: aliceblue;
  background-color: rgb(252, 252, 252);
  border: 0.1vw solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:5vw;
  cursor: pointer;
  color: black;
}

#addButtonBlured{
  width: 17vw;
  height: 8vw;
  color: aliceblue;
  background-color: rgb(252, 252, 252);
  border: 0.1vw solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:5vw;
  cursor: pointer;
  color: black;
  filter: blur(3px);
}

#addButton:hover{
  width: 17vw;
  height: 8vw;
  color: aliceblue;
  background-color: cornflowerblue;
  border: 0.1vw solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:5vw;
  color: black;
  cursor: pointer;
}

#routeMessageView{
  display: unset;
  height: 10vw;
  width: 25vw;
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

#routeMessageView:hover{
  display: unset;
  height: 10vw;
  width: 25vw;
  background-color: cornflowerblue;
  border: 0.1vw solid black;
  position: absolute;
  right: 2%;
  top: 6.3vw;
  margin:auto;
  text-align: center;
  font-size: 5vw;
  color: white;
  line-height: 10vw;
  cursor: pointer;
}
#routeScheduleView{
  display: unset;
  height: 10vw;
  width: 25vw;
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

#routeScheduleView:hover{
  display: unset;
  height: 10vw;
  width: 25vw;
  background-color: cornflowerblue;
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

#routeTriggerView{
  display: unset;
  height: 10vw;
  width: 25vw;
  background-color: rgb(109, 109, 109);
  border: 0.1vw solid black;
  margin-right: 2%;
  position: absolute;
  right: 0;
  top: 25vw;
  text-align: center;
  font-size: 4vh;
  color: white;
  line-height: 10vw;
  cursor: pointer;
}

#routeTriggerView:hover{
  display: unset;
  height: 10vw;
  width: 25vw;
  background-color: cornflowerblue;
  border: 0.1vw solid black;
  margin-right: 2%;
  position: absolute;
  right: 0;
  top: 25vw;
  text-align: center;
  font-size: 4vh;
  color: white;
  line-height: 10vw;
  cursor: pointer;
}

.mobileReqMessage{
  display: unset;
  font-size: 4vw;
  color:red;
  height:3vw;
  width: 9vw;
  position: absolute;
  font-weight: bolder;
  top: 13%;
  left: 40%;
}

.mobileReqMessageTrue{
  display: unset;
  font-size: 4vw;
  color: green;
  height: 3vw;
  font-weight: bolder;
  width: 9vw;
  position: absolute;
  font-weight: bolder;
  top: 13%;
  left: 40%;
}

.mobileReqTrigger{
  display: unset;
  font-size: 4vw;
  color:red;
  height:3vw;
  width: 9vw;
  position: absolute;
  font-weight: bolder;
  top: 38%;
  left: 40%;
}

.mobileReqTriggerTrue{
  display: unset;
  font-size: 4vw;
  color: green;
  height: 3vh;
  font-weight: bolder;
  width: 9vw;
  position: absolute;
  font-weight: bolder;
  top: 38%;
  left: 40%;
}

.mobileReqChannel{
  display: unset;
  font-size: 4vw;
  color:red;
  height:3vw;
  width: 9vw;
  position: absolute;
  font-weight: bolder;
  top: 61%;
  left: 40%;
}

.mobileReqChannelTrue{
  display: unset;
  font-size: 4vw;
  color: green;
  height: 3vw;
  font-weight: bolder;
  width: 9vw;
  position: absolute;
  font-weight: bolder;
  top: 61%;
  left: 40%;
}

#header{
  grid-column-start: 1;
  grid-column-end: 3;
  border: none;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 6vw;
  border-bottom: 0.1vw solid black;
}
#message{
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

#selectMessage{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vw solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 45vw;
  height: 7vw;
  font-size: 2.5vw;
  position: absolute;
  left: 1%;
}

#trigger{
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

#inputForText{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 6;
  margin-left: 1%;
  width: 43vw;
  height: 6vw;
  border: 0.1vw solid black;

}

#channel{
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

#selectChannel{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vw solid black;
  grid-row-start: 7;
  grid-row-end: 8;
  width: 45vw;
  height: 6vw;
  font-size: 2.5vw;
  position: absolute;
  left: 1%;
  top: 5%;
}

#checkActive{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 8;
  grid-row-end: 9;
  width: 5vw;
  height: 4vw;
}

#active{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 8;
  grid-row-end: 9;
  font-size: 5vw;
}

#saveButton{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vw solid black;
  grid-row-start: 9;
  grid-row-end: 10;
  font-size: 6vw;
  font-weight: bold;
}
}

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width:601px){

#TriggerView{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 8% 82% 10%;
  width: 150vh;
  height: 90vh;
  margin: auto;
  top:0;
  left:0;
  bottom:0;
  right:0;
  position: absolute;
  background-color: rgb(207, 206, 206);
}

#addButton{
  width: 13vh;
  height: 7vh;
  color: black;
  background-color:white;
  border: 0.1vh solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:3vh;
  font-weight: bolder;
  cursor: pointer;
  line-height: 220%;
}

#addButton:hover{
 width: 13vh;
  height: 7vh;
  color: black;
  background-color:cornflowerblue;
  border: 0.1vh solid rgb(0, 0, 0);
  position: absolute;
  right: 1%;
  bottom: 1%;
  text-align: center;
  font-size:3vh;
  font-weight: bolder;
  cursor: pointer;
  line-height: 220%;
}

#box1{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.01vh solid black;
}

#box1Blured{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.01vh solid black;
  filter: blur(3px);
}

#title{
  font-size: 4vh;
  font-weight: bolder;
  margin-top: 1%;
  margin-left: 1%;
  position: absolute;
}

#box2{
  display: none;
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.01vh solid black;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box2Blured{
  display: none;
  grid-column-start: 1;
  grid-column-end: 2;
  border: none;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box3{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.01vh solid black;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box3Blured{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.01vh solid black;
  grid-row-start: 2;
  grid-row-end: 3;
  filter: blur(3px);
}

#box4{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.01vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
}

#box4Blured{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.01vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  filter: blur(3px);
}

#dropDownButton{
  height: 85%;
  width: 22vh;
  margin-right: 2%;
  display: unset;
  background-color: rgb(255, 255, 255);
  float: right;
  border: 0.3vh solid black;
  color: black;
  text-align: center;
  font-size: 5vh;
  line-height: 100%;
  cursor: pointer;
}

#dropDownButton:hover{
  height: 85%;
  width: 22vh;
  margin-right: 2%;
  display: unset;
  background-color:cornflowerblue;
  float: right;
  border: 0.3vh solid black;
  color: white;
  text-align: center;
  font-size: 5vh;
  line-height: 100%;
  cursor: pointer;  
}

#routeMessageView{
  display: unset;
  height: 10vh;
  width: 25vh;
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

#routeMessageView:hover{
  display: unset;
  height: 10vh;
  width: 25vh;
  background-color: cornflowerblue;
  border: 0.1vh solid black;
  position: absolute;
  right: 2%;
  top: 6.3vh;
  margin:auto;
  text-align: center;
  font-size: 5vh;
  color: white;
  line-height: 10vh;
  cursor: pointer;
}

#routeScheduleView{
  display: unset;
  height: 10vh;
  width: 25vh;
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

#routeScheduleView:hover{
  display: unset;
  height: 10vh;
  width: 25vh;
  background-color: cornflowerblue;
  border: 0.1vw solid black;
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

#routeTriggerView{
  display: unset;
  height: 10vh;
  width: 25vh;
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

#routeTriggerView:hover{
  display: unset;
  height: 10vh;
  width: 25vh;
  background-color: cornflowerblue;
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

#trigger{
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

#inputForText{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 5;
  grid-row-end: 6;
  width: 35vh;
  height: 4vh;
  font-size: 2.5vh;
  margin-left: 1%;
}

#channel{
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

#selectChannel{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 7;
  grid-row-end: 8;
  width: 45vh;
  height: 5vh;
  font-size: 2.5vh;
  position: absolute;
  left: 1%;
  top: 5%;
}

#checkActive{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 8;
  grid-row-end: 9;
  width: 3vh;
  height: 3vh;
}

#selectMessage{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 45vh;
  height: 4vh;
  font-size: 2.5vh;
  position: absolute;
  left: 1%;
}

#inputForText{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 5;
  grid-row-end: 6;
  width: 44vh;
  height: 4vh;
  font-size: 2.5vh;
}

#active{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 8;
  grid-row-end: 9;
  font-size: 3.5vh;
}

.mobileReqMessage{
  display: unset;
  font-size: 4vh;
  color:red;
  height:3vh;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 12%;
  left: 20%;
}

.mobileReqMessageTrue{
  display: unset;
  font-size: 4vh;
  color: green;
  height: 3vh;
  font-weight: bolder;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 11%;
  left: 20%;
}

.mobileReqTrigger{
  display: unset;
  font-size: 4vh;
  color:red;
  height:3vh;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 37%;
  left: 20%;
}

.mobileReqTriggerTrue{
  display: unset;
  font-size: 4vh;
  color: green;
  height: 3vh;
  font-weight: bolder;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 36%;
  left: 20%;
}

.mobileReqChannel{
  display: unset;
  font-size: 4vh;
  color:red;
  height:3vh;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 61%;
  left: 20%;
}

.mobileReqChannelTrue{
  display: unset;
  font-size: 4vh;
  color: green;
  height: 3vh;
  font-weight: bolder;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 60%;
  left: 20%;
}

#extraButton{
  display: unset;
  height: 6%;
  width: 10vh;
  background-color: white;
  position: absolute;
  border: solid 0.3vh black;
  right: 20%;
  top:0.5%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 4vh;
}

#extraButtonClicked{
  display: unset;
  height: 6%;
  width: 10vh;
  background-color: white;
  position: absolute;
  border: none;
  right: 20%;
  top:0.5%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 4vh;
  border-top: black 0.3vh solid;
  border-left: 0.3vh solid black;
}

#extraButtonBlured{
  display: unset;
  height: 6%;
  width: 10vh;
  background-color: white;
  position: absolute;
  border: solid 0.3vh black;
  right: 20%;
  top:0.1%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 4vh;
  filter: blur(3px);
}

.mobMessage{
  color: red;
  font-size: 4vh;
  font-weight: bolder;
}

.mobMessageTrue{
  color: green;
  font-size: 4vh;
  font-weight: bolder;
}

.mobTrigger{
  color: red;
  font-size: 4vh;
  font-weight: bolder;
}

.mobTriggerTrue{
  color: green;
  font-size: vh;
  font-weight: bolder;
}

.mobTriggerMin{
  color: red;
  font-size: 4vh;
  font-weight: bolder;
}

.mobTriggerMinTrue{
  color: green;
  font-size: 4vh;
  font-weight: bolder;
}

.mobTriggerMax{
  color: red;
  font-size: 4vh;
  font-weight: bolder;
}

.mobTriggerMaxTrue{
  color: green;
  font-size: 4vh;
  font-weight: bolder;
}

.mobChannel{
  color: red;
  font-size: 4vh;
  font-weight: bolder;
}

.mobChannelTrue{
  color: green;
  font-size: 4vh;
  font-weight: bolder;
}

#extra{
  width: 70vh;
  height: 55vh;
  background-color: white;
  display: unset;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 0.2vh solid black;
  opacity: 90%;
}

#createdOn{
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
  border: 0.6vh solid black;
  z-index: 1;
}

#header{
  grid-column-start: 1;
  grid-column-end: 3;
  border: none;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 3vh;
  border-bottom: 0.1vh solid black;
}
}
</style>
