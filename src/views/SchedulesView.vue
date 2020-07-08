<template>

    <div id="SchedulesView">

        <!-- BOX1 First row - Header NOT BLURED-->

        <div id="box1" v-on:click="turnOff" v-if="bluredScreen==false"><a id="title"> Schedules View !</a>
        
          <!-- DropDown menu -->
          <div id="dropDownButton" v-on:click="dropDownOnOff">&#9776;</div>
          <div id="routeMessageView" v-if="dropDown!=true" v-on:click="goToMessage">Messages</div>
          <div id="routeScheduleView" v-if="dropDown!=true" v-on:click="goToSchedule">Schedules</div>
          <div id="routeTriggerView" v-if="dropDown!=true" v-on:click="goToTrigger">Triggers</div>

        </div>

         <!-- BOX1 First row - Header BLURED-->

        <div id="box1Blured" v-on:click="turnOff" v-if="bluredScreen==true"><a id="title"> Schedules View !</a>
        
          <!-- DropDown menu -->
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
              <p class="inputForm" v-if="message==''">Message:<br>Required</p>
              <p class="inputFormTrue" v-if="message!=''">Message:<br>Required &#x2713;</p>

              <p class="inputForm" v-if="date==''">Run At:<br>Required</p>
              <p class="inputFormTrue" v-if="date!=''">Run At:<br>Required &#x2713;</p>
            </div>
            

        </div>

        <!-- BOX2 Left side with buttons BLURED -->

        <div id="box2Blured" v-on:click="turnOff" v-if="bluredScreen==true">
            <MessageButton></MessageButton>
            <ScheduleButton></ScheduleButton>
            <TriggerButton></TriggerButton>

            <div v-if="createSwitch!=false">

              <!-- Legend for computer screen-->
              <p class="inputForm" v-if="message==''">Message:<br>Required</p>
              <p class="inputFormTrue" v-if="message!=''">Message:<br>Required &#x2713;</p>

              <p class="inputForm" v-if="date==''">Run At:<br>Required</p>
              <p class="inputFormTrue" v-if="date!=''">Run At:<br>Required &#x2713;</p>
            </div>
            

        </div>

        <!-- BOX3 Right side with table NOT BLURED-->

        <div id="box3" v-on:click="turnOff" v-if="bluredScreen==false">
          <ScheduleTable></ScheduleTable>
        </div>

          <!-- CreatedON - New div for input new schedule -->

          <div id="createdOn" v-if="createSwitch!=false">

          <div id="header">Create Schedule !</div>

          <label for="Message" id="messageLabel">Message</label>

          <a class="mobileReqMessage" v-if="message==''">X</a>
          <a class="mobileReqMessageTrue" v-if="message!==''">&#x2713;</a>

          <select id="selectMessage" v-model="message">
          <option value="Select1">Some message title</option>
          <option value="Select2">TEST</option>
          </select>

          <label for="Run" id="runLabel">Run At</label>

          <a class="mobileReqDate" v-if="date==''">X</a>
          <a class="mobileReqDateTrue" v-if="date!=''">&#x2713;</a>

          <input id="date" type="date" v-model="date">

          <input type="checkbox" name="Repeat" id="checkRepeat" v-on:click="changeRepeat">
          <label for="Repeat" id="repeatLabel">Repeat</label>
          
          <select id="selectRepeat" v-model="repeat" v-if="checkRepeat!=false">
            <option value="1">1</option>
            <option value="7">7</option>
            <option value="30">30</option>
          </select>
          
          <input type="checkbox" name="Active" id="checkActive">
          <label for="Active" id="activeLabel">Active</label>
          
          <button id="saveButton">Save</button>

        </div>


        <!-- BOX3 Right side with table BLURED-->

        <div id="box3Blured" v-on:click="turnOff" v-if="bluredScreen==true">
          <ScheduleTable></ScheduleTable>
        </div>

        <!-- BOX4 - Bottom div ( footer ) NOT BLURED -->

        <div id="box4" v-on:click="turnOff" v-if="bluredScreen==false"></div>

         <!-- BOX4 - Bottom div ( footer ) BLURED -->

        <div id="box4Blured" v-on:click="turnOff" v-if="bluredScreen==true"></div>


        <!-- AddButton switch - For opening "CreatedON" div -->

        <div id="addButton" v-on:click="createNew">Add</div>
            
    </div>

</template>

<script>
import MessageButton from '../components/MessageButton'
import ScheduleButton from '../components/ScheduleButton'
import TriggerButton from '../components/TriggerButton'
import ScheduleTable from '../tables/ScheduleTable'


export default {
  name: 'Schedules',
  components:{ 
    MessageButton,
    ScheduleButton,
    TriggerButton,
    ScheduleTable,
    
  },

  data(){
    return{
      dropDown:true,
      createSwitch:false,
      date:'',
      message:'',
      repeat:0,
      checkRepeat:false,
      bluredScreen:false,
    }
  },

  methods:{
    
    changeRepeat() {
      this.checkRepeat = !this.checkRepeat;
      if (this.repeat == 0) {
        this.repeat = 1;
      } else {
        this.repeat = 0;
      }
      
    },

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
      self.dropDown=true;
    },

    //Router to Trigger view
    goToTrigger(){
      let self = this;
      self.$router.push('./TriggerView');
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
        self.bluredScreen=false
      }
    },

    //Function for closing "CreatedOn" div by clicking outside of it
    turnOff(){
      let self = this;
      if(self.createSwitch==true){
        self.createSwitch=false;
      }
      if(self.bluredScreen==true){
        self.bluredScreen=false;
      }
    },
  }
}
</script>

<style scoped>

#SchedulesView{
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
  border: 0.1vh solid rgb(207, 206, 206);
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
  filter: blur(3px);
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
  filter:blur(3px)
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

#header{
  grid-column-start: 1;
  grid-column-end: 3;
  border-bottom: 0.1vh solid black;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 3vh;
}

#messageLabel{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  font-size: 4vh;
  top:10%;
  position:absolute
}

#selectMessage{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 40vh;
  height: 5vh;
  font-size: 2.5vh;
  margin-left: 1%;
}

#runLabel{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  font-size: 4vh;
}

#date{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 5;
  grid-row-end: 6;
  top:10%;
  position:absolute;
  width: 40vh;
  height: 5vh;
  font-size: 2.5vh;
  left: 1%;
}

#repeatLabel{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  font-size:3vh
}

#checkRepeat{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 6;
  grid-row-end: 7;
  width: 3vh;
  height: 3vh;
}

#selectRepeat{
  width: 7vh;
  height: 3vh;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  left: 23%;
  top:5%;
  position: absolute;
  font-size: 2vh;
}

#checkActive{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vh solid black;
  grid-row-start: 7;
  grid-row-end: 8;
  width: 3vh;
  height: 3vh;
}

#activeLabel{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 7;
  grid-row-end: 8;
  font-size:3vh
}

#saveButton{
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

#saveButton:hover{
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
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  animation: flip-vertical-left 1s cubic-bezier(0.455, 0.030, 0.515, 0.955) none;
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

.mobileReqMessage{
  display: none;
}

.mobileReqMessageTrue{
  display: none;
}

.mobileReqDate{
  display: none;
}

.mobileReqDateTrue{
  display: none;
}

.inputFormTrue{
  color: green;
  font-size: 2vh;
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
  animation: flip-vertical-left 1s cubic-bezier(0.455, 0.030, 0.515, 0.955) none;
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

#legentTitle{
  display: none;
}

#legendText{
  display: none;
}

@media screen and (max-width: 600px) and (orientation: portrait){

#SchedulesView{
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
  border: 0.1vw solid rgb(207, 206, 206);
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
  font-size: 5vw;
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
  font-size: 5vw;
  color: white;
  line-height: 10vw;
  cursor: pointer;
}

#createdOn{
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

#selectRepeat{
  width: 12vw;
  height: 5vw;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  left: 23%;
  top:5%;
  position: absolute;
  font-size: 3vw;
}

#header{
  grid-column-start: 1;
  grid-column-end: 3;
  border-bottom: 0.1vh solid black;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 4vh;
  line-height: 150%;
}

#messageLabel{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  font-size: 7vw;
  top:10%;
  position:absolute
}

.mobileReqMessage{
  display: unset;
  font-size: 5vw;
  color: red;
  position: absolute;
  top: 13%;
  left: 40%;
  font-weight: bolder;
}

.mobileReqMessageTrue{
  display: unset;
  font-size: 5vw;
  font-weight: bolder;
  color: green;
  position: absolute;
  top: 13%;
  left: 40%;
}

.mobileReqDate{
  display: unset;
  font-size: 5vw;
  color:red;
  height:3vh;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 41%;
  left: 40%;
}

.mobileReqDateTrue{
  display: unset;
  font-size: 5vw;
  color: green;
  height: 3vh;
  font-weight: bolder;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 41%;
  left: 40%;
}

#selectMessage{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vw solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  width: 60vw;
  height: 8vw;
  font-size: 3vw;
  margin-left: 1%;
}

#runLabel{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  font-size: 7vw;
}

#date{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vw solid black;
  grid-row-start: 5;
  grid-row-end: 6;
  top:10%;
  position:absolute;
  width: 40vw;
  height: 8vw;
  font-size: 3vw;
  left: 1%;
}

#repeatLabel{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  font-size:4vw
}

#checkRepeat{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 6;
  grid-row-end: 7;
  width: 4vw;
  height: 4vw;
}

#checkActive{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 7;
  grid-row-end: 8;
  width: 4vw;
  height: 4vw;
}

#activeLabel{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 7;
  grid-row-end: 8;
  font-size:4vw;
}

#saveButton{
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
}

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width:601px){

#SchedulesView{
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
  border: 0.01vh solid rgb(207, 206, 206);
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

.mobileReqMessage{
  display: unset;
  font-size: 4vh;
  color: red;
  position: absolute;
  top: 12%;
  left: 20%;
  font-weight: bolder;
}

.mobileReqMessageTrue{
  display: unset;
  font-size: 4vh;
  font-weight: bolder;
  color: green;
  position: absolute;
  top: 12%;
  left:20%;
}

.mobileReqDate{
  display: unset;
  font-size: 4vh;
  color:red;
  height:3vh;
  width: 9vh;
  position: absolute;
  font-weight: bolder;
  top: 41%;
  left: 20%;
}

.mobileReqDateTrue{
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

#selectRepeat{
  width: 10vh;
  height: 4vh;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  left: 23%;
  top:5%;
  position: absolute;
  font-size: 3vh;
}

#createdOn{
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

#header{
  grid-column-start: 1;
  grid-column-end: 3;
  border-bottom: 0.1vh solid black;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 3vh;
}
}

</style>
