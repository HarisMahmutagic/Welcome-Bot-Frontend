<template>

  <div>

      <div class="button" v-on:click="SwitchToMessages">Messages</div>

  </div>

</template>

<script>


export default {
  name: 'MessageButton',
 data(){
        return {
          clicked:false,
        }
  },
  methods:{

    //Routing to message view on click
    SwitchToMessages(){
      let self = this;
      self.$router.push('./MessagesView');
      self.clicked=true;
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
  line-height: 5vh;
  font-weight: bolder;
  text-align: center;
  font-size: 3.2vh;
}

.button:hover{
  background-color: cornflowerblue;
  cursor: pointer;
  font-weight: bolder;
  font-size: 3.2vh;
}

</style>