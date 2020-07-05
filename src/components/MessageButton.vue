<template>

  <div>

      <div class="button" v-on:click="SwitchToMessages">Messages</div>

  </div>

</template>

<script>


export default {
  name: 'MessageButton',

  methods:{

    //Routing to message view on click
    SwitchToMessages(){
      let self = this;
      self.$router.push('./MessagesView');
    }
  }
}

</script>

<style scoped>

.button{
  border: 1px solid black;
  margin-top: 5vh;
  height: 5vh;
  line-height: 5vh;
  font-weight: bolder;
  text-align: center;
  background-color: white;
  font-size: 3.2vh;
}

.button:hover{
  background-color: cornflowerblue;
  cursor: pointer;
  font-weight: bolder;
  font-size: 3.2vh;
}

</style>