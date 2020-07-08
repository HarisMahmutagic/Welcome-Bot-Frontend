<template>

  <div id="MessageView">
    
    <!-- Extra button NOT BLURED -->
    <div id="extraButton" v-on:click="openExtra" v-if="bluredScreen==false && extraClicked==false">?</div>  

    <!-- Extra button NOT BLURED CLICKED -->
    <div id="extraButtonClicked" v-on:click="openExtra" v-if="bluredScreen==false && extraClicked==true">?</div>

    <!-- Extra button BLURED -->
    <div id="extraButtonBlur" v-on:click="openExtra" v-if="bluredScreen==true">?</div>  

    <!-- BOX1 First row - Header NOT BLURED-->

    <div id="box1" v-on:click="turnOff" v-if="bluredScreen==false"><a id="title">Messages View !</a>
      
      <!-- DropDown menu -->
      <div id="dropDownButton" v-on:click="dropDownOnOff">&#9776;</div>
      <div id="routeMessageView" v-if="dropDown!=true" v-on:click="goToMessage">Messages</div>
      <div id="routeScheduleView" v-if="dropDown!=true" v-on:click="goToSchedule">Schedules</div>
      <div id="routeTriggerView" v-if="dropDown!=true" v-on:click="goToTrigger">Triggers</div>

    </div>

    <!-- BOX1 First row - Header BLURED -->

    <div id="box1Blur" v-on:click="turnOff" v-if="bluredScreen==true"><a id="title">Messages View !</a>
      
      <!-- DropDown menu -->
      <div id="dropDownButton" v-on:click="dropDownOnOff">&#9776;</div>
      <div id="routeMessageView" v-if="dropDown!=true" v-on:click="goToMessage">Messages</div>
      <div id="routeScheduleView" v-if="dropDown!=true" v-on:click="goToSchedule">Schedules</div>
      <div id="routeTriggerView" v-if="dropDown!=true" v-on:click="goToTrigger">Triggers</div>

    </div>

    <!-- BOX2 Left side with buttons NOT BLURED -->

    <div id="box2" v-on:click="turnOff" v-if="bluredScreen==false">

      <MessageButton></MessageButton>
      <ScheduleButton></ScheduleButton>
      <TriggerButton></TriggerButton>
      
      <div v-if="createSwitch!=false">

        <!-- Legend for computer screen-->

        <p class="inputForm" v-if="title.length<1">Title:Required</p>
        <p class="inputFormTrue" v-if="title.length>=1">Title:Requred &#x2713;</p>

        <p class="inputForm" v-if="title.length<5">Title:<br>Min Length:5</p>
        <p class="inputFormTrue" v-if="title.length>=5">Title:<br>Min Length:5 &#x2713;</p>

        <p class="inputForm" v-if="title.length>30 || title.length<1">Title:<br>Max Length:30</p>
        <p class="inputFormTrue" v-if="title.length<=30 && title.length>=1">Title:<br>Max Length:30 &#x2713;</p>

        <p class="inputForm" v-if="text.length<1">Text: Required</p>
        <p class="inputFormTrue" v-if="text.length>=1">Text:Requred &#x2713;</p>

        <p class="inputForm" v-if="text.length<20" >Text<br>Min Length:20</p>
        <p class="inputFormTrue" v-if="text.length>=20">Text<br>Min Length:20 &#x2713;</p>
      </div>

    </div>

    <!-- BOX2 Left side with buttons Blured -->

    <div id="box2Blur" v-on:click="turnOff" v-if="bluredScreen==true">

      <MessageButton></MessageButton>
      <ScheduleButton></ScheduleButton>
      <TriggerButton></TriggerButton>
      
      <div v-if="createSwitch!=false">

        <!-- Legend for computer screen-->

        <p class="inputForm" v-if="title.length<1">Title:Required</p>
        <p class="inputFormTrue" v-if="title.length>=1">Title:Requred &#x2713;</p>

        <p class="inputForm" v-if="title.length<5">Title:<br>Min Length:5</p>
        <p class="inputFormTrue" v-if="title.length>=5">Title:<br>Min Length:5 &#x2713;</p>

        <p class="inputForm" v-if="title.length>30 || title.length<1">Title:<br>Max Length:30</p>
        <p class="inputFormTrue" v-if="title.length<=30 && title.length>=1">Title:<br>Max Length:30 &#x2713;</p>

        <p class="inputForm" v-if="text.length<1">Text: Required</p>
        <p class="inputFormTrue" v-if="text.length>=1">Text:Requred &#x2713;</p>

        <p class="inputForm" v-if="text.length<20" >Text<br>Min Length:20</p>
        <p class="inputFormTrue" v-if="text.length>=20">Text<br>Min Length:20 &#x2713;</p>
      </div>

    </div>

    <!-- BOX3 Right side with table NOT BLURED-->

    <div id="box3" v-on:click="turnOff" v-if="bluredScreen==false">
      <MessageTable></MessageTable>
    </div>

     <!-- BOX3 Right side with table BLURED -->

    <div id="box3Blur" v-on:click="turnOff" v-if="bluredScreen==true">
      <MessageTable></MessageTable>
    </div>

      <!-- CreatedON - New div for input new messages -->

        <div id="createdOn" v-if="createSwitch!=false">

          <div id="header">Create Message!</div>

          <form id="title1">
            <label for="Title" id="labelForTitle">Title</label>

            <a class="mobTitle" v-if="title.length<1 || title.length<5 || title.length>30">X</a>
            <a class="mobTitleTrue" v-if="title.length>=1 && title.length>=5 && title.length<=30">&#x2713;</a>

            <input type="text" id="inputForTitle" v-model="title">
          </form>

          <form id="inputText">
            <label for="Text" id="labelForText">Text</label>

            <a class="mobText" v-if="text.length<1 || text.length<20">X</a>
            <a class="mobTextTrue" v-if="text.length>=20">&#x2713;</a>

            <textarea id="inputForText" rows="4" cols="50" v-model="text"></textarea>

          </form>

            <button id="saveButton">SAVE</button>

        </div>
      <!-- Extra div- Included informations about input-->
        <div id="extra" v-if="extra!=false">
          <p class="mobileTitle" v-if="title.length<1">Title: Required</p>
          <p class="mobileTitleTrue" v-if="title.length>=1">Title: Required &#x2713;</p>

          <p class="mobileTitle" v-if="title.length<5">Title: Minimum Length: 5</p>
          <p class="mobileTitleTrue" v-if="title.length>=5">Title: Minimum Length: 5 &#x2713;</p>

          <p class="mobileTitle" v-if="title.length>30 || title<1">Title: Maximum Length: 30</p>
          <p class="mobileTitleTrue" v-if="title.length<=30 && title.length>=1">Title: Maximum Length: 30 &#x2713;</p>

          <p class="mobileText" v-if="text.length<1">Text: Required</p>
          <p class="mobileTextTrue" v-if="text.length>=1">Text: Required &#x2713;</p>

          <p class="mobileText" v-if="text.length<20">Text: Minimum Length: 20</p>
          <p class="mobileTextTrue" v-if="text.length>=20">Text: Minimum Length: 20 &#x2713;</p>

        </div>


        <!-- BOX4 - Bottom div ( footer ) NOT BLURED-->

        <div id="box4" v-on:click="turnOff" v-if="bluredScreen==false"></div>

        <!-- BOX4 - Bottom div ( footer ) BLURED -->

        <div id="box4Blur" v-on:click="turnOff" v-if="bluredScreen==true"></div>

        <!-- AddButton switch - For opening "CreatedON" div NOT BLURED -->

        <div id="addButton" v-on:click="createNew" v-if="bluredScreen==false">Add</div>

        <!-- AddButton switch - For opening "CreatedON" div BLURED -->

        <div id="addButtonBlur" v-on:click="createNew" v-if="bluredScreen==true">Add</div>
            
       
  </div>  
  
</template>

<script>
import MessageButton from '../components/MessageButton'
import ScheduleButton from '../components/ScheduleButton'
import TriggerButton from '../components/TriggerButton'
import MessageTable from '../tables/MessageTable'


export default {
  name: 'MessagesView',
  components: { 
    MessageButton,
    ScheduleButton,
    TriggerButton,
    MessageTable,
    
  },
  data(){
        return {
          dropDown:true,
          createSwitch:false,
          checkTitle:false,
          extra:false,
          title:'',
          text:'',
          bluredScreen:false,
          extraClicked:false
        }
  },
  methods:{
    //Function for opening drop down menu
    dropDownOnOff() {
      let self = this;
      if(self.dropDown==false){
        self.dropDown=true;
      }
      else{self.dropDown=false}
    },

    //Router to Message view
    goToMessage(){
      let self = this;
      self.dropDown = true;
    },

    //Router to Schedule view
    goToSchedule(){
      let self = this;
      self.$router.push('./SchedulesView');
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
      if(self.extra == true){
        self.extra = false;
      }
      if(self.bluredScreen == false){
        self.bluredScreen = true;
      }
      else self.bluredScreen = false
    },

    //Function for closing "CreatedOn" div by clicking outside of it
    turnOff(){
      let self = this;
      if(self.createSwitch==true){
        self.createSwitch=false;
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
      else{self.extraClicked=false}
    },
    
  }

}
</script>

<style scoped>

#MessageView{
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

#box1Blur{
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.1vh solid black;
  filter: blur(3px);
}

#extraButton{
display: none;
}

#extraButtonBlur{
display: none;
}

#extra{
  display: none;
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

#box2Blur{
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

#box3Blur{
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

#box4Blur{
  grid-column-start: 1;
  grid-column-end: 3;
  border: 0.1vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  filter: blur(3px);
}

.mobTitle{
  display: none;
}

.mobTitleTrue{
  display: none;
}

.mobText{
  display: none;
}

.mobTextTrue{
  display: none;
}

#createdOn{
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

#header{
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  border-bottom: black 0.2vh solid;
  font-size: 3vh;
}

#title1{
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
}

#labelForTitle{
  top: 20%;
  position: absolute;
  font-size: 5vh;
  font-weight: bold;
}

#inputForTitle{
  top: 35%;
  position: absolute;
  width: 25vh;
  height: 3vh;
  left: 1%;
}

#inputText{
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}

#labelForText{
  top: 55%;
  position: absolute;
  font-size: 5vh;
  font-weight: bold;
}

#inputForText{
  top: 70%;
  position: absolute;
  width: 50vh;
  height: 7vh;
  left: 1%;
}

#saveButton{
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
  font-weight: bold;
  font-size: 4vh;
  cursor: pointer;
}

#saveButton:hover{
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


#addButtonBlur{
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
  filter: blur(3px);
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

.inputFormTrue{
  color: green;
  font-size: 2vh;
  border: solid 0.1vh black;
  font-weight: 500;
  border-radius: 10%;
  background-color: white;
  border: 1px solid white;
	animation: flip-vertical-right 1s cubic-bezier(0.455, 0.030, 0.515, 0.955) none;
}

@keyframes flip-vertical-right {
  0% {
  transform: rotateY(0deg);
  }

  100% {
  transform: rotateY(360deg);
  }
}

@media screen and (max-width: 600px){

#MessageView{
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

#box1Blur{
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

#box2Blur{
  display: none;
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 2;
  grid-row-end: 3;
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
  border-top: black solid 0.3vw;
  border-left: black solid 0.3vw;
  right: 30%;
  top:0.1%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 5vw;
 
}

#extraButtonBlur{
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

#extra{
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

#box3{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.1vw solid black;
  grid-row-start: 2;
  grid-row-end: 3;
}

#box3Blur{
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

#box4Blur{
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

#header{
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  border-bottom: 0.1vw solid black;
  font-size: 7vw;
}

#title1{
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
}

#labelForTitle{
  top: 20%;
  position: absolute;
  font-size: 9vw;
  font-weight: bold;
}

.mobTitle{
  display: unset;
  font-size: 6vw;
  color: red;
  position: absolute;
  top: 22%;
  left: 30%;
  font-weight: bolder;
}

.mobTitleTrue{
  display: unset;
  font-size: 6vw;
  font-weight: bolder;
  color: green;
  position: absolute;
  top: 22%;
  left:30%;
}

.mobText{
  display: unset;
  font-size: 6vw;
  color: red;
  position: absolute;
  top: 57%;
  left: 30%;
  font-weight: bolder;
}

.mobTextTrue{
  display: unset;
  font-size: 6vw;
  font-weight: bolder;
  color: green;
  position: absolute;
  top: 57%;
  left:30%;
}

#inputForTitle{
  top: 35%;
  position: absolute;
  width: 45vw;
  height: 5vw;
}

#inputText{
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}

#saveButton{
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end: 2;
}

.mobileTitle{
  font-size: 5vw;
  color: red;
}

.mobileTitleTrue{
  font-size: 5vw;
  color: green;
}

.mobileText{
  font-size: 5vw;
  color: red;
}

.mobileTextTrue{
  font-size: 5vw;
  color: green;
}

#labelForText{
  top: 55%;
  position: absolute;
  font-size: 9vw;
  font-weight: bold;
}

#inputForText{
  top: 70%;
  position: absolute;
  width: 65vw;
  height: 15vw;
}

#saveButton{
  text-align: center;
  font-weight: bold;
  font-size: 4vw;
  cursor: pointer;
}

#saveButton:hover{
  text-align: center;
  font-weight: bold;
  font-size: 4vw;
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

#addButtonBlur{
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
}

@media screen and (max-width: 768px) and (orientation: landscape) and (min-width:601px){

#MessageView{
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
  background-color: rgb(207, 206, 206);
}

#box1{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 0.01vh solid black;
}

#box1Blur{
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

#box2Blur{
  display: none;
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.01vh solid black;
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

#box3Blur{
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

#box4Blur{
  grid-column-start: 1;
  grid-column-end: 2;
  border: 0.01vh solid black;
  grid-row-start: 3;
  grid-row-end: 4;
  filter: blur(3px);
}

.mobTitle{
  display: unset;
  font-size: 5vh;
  color: red;
  position: absolute;
  top: 20%;
  left: 20%;
  font-weight: bolder;
}

.mobTitleTrue{
  display: unset;
  font-size: 5vh;
  font-weight: bolder;
  color: green;
  position: absolute;
  top: 20%;
  left:20%;
}

.mobText{
  display: unset;
  font-size: 5vh;
  color: red;
  position: absolute;
  top: 55%;
  left: 20%;
  font-weight: bolder;
}

.mobTextTrue{
  display: unset;
  font-size: 5vh;
  font-weight: bolder;
  color: green;
  position: absolute;
  top: 55%;
  left:20%;
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
  border-left: 0.3vh solid black;
  border-top: 0.3vh solid black;
  right: 20%;
  top:0.5%;
  text-align: center;
  font-weight: bolder;
  cursor: pointer;
  font-size: 4vh;
}

#extraButtonBlur{
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

#extra{
  width: 70vh;
  height: 50vh;
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

#dropDownButton{
  height: 80%;
  width: 22vh;
  margin-right: 2%;
  margin-top: 0.1%;
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
  height: 80%;
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

#createdOn{
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
  border: 0.8vh solid black;
  z-index: 1;
}

#header{
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  border-bottom: 0.1vh solid black;
  font-size: 4vh;
}

.mobileTitle{
  font-size: 4vh;
  color: red;
}

.mobileTitleTrue{
  font-size: 4vh;
  color: green;
}

.mobileText{
  font-size: 4vh;
  color: red;
}

.mobileTextTrue{
  font-size: 4vh;
  color: green; 
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

#addButtonBlur{
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
  filter: blur(3px);
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

#inputForTitle{
  top: 35%;
  position: absolute;
  width: 30vh;
  height: 3vh;
}

#inputForText{
  top: 70%;
  position: absolute;
  width: 60vh;
  height: 7vh;
}
}
</style>
