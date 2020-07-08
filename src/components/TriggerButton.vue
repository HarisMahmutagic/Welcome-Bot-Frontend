<template>

  <div>

      <div class="button" v-on:click="SwitchToTrigger">Triggers</div>

  </div>

</template>

<script>

export default {
  name: 'TriggerButton',

  methods:{

    //Routing to message view on click
    SwitchToTrigger(){
      let self = this;
      self.$router.push('./TriggerView');
    }
  }
}

</script>

<style scoped>

.button{
  border: 0.2vh solid black;
  margin-top: 5vh;
  background-color: white;
  height: 5vh;
  font-weight: bolder;
  line-height: 5vh;
  text-align: center;
  font-size: 3.2vh;
}

.button:hover{
  background-color: cornflowerblue;
  cursor: pointer;
  font-size: 3.2vh;
  font-weight: bolder;
}

</style>