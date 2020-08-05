<template>
  <div>
    <div class="button" v-on:click="SwitchToLoginPage">
      Logout
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LogOut',
  data() {
    return {};
  },
  methods: {
    ...mapActions(['getToken']),
    // Routing to message view on click
    SwitchToLoginPage() {
      const empty = '';
      this.$store.commit('getToken', empty);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 3vh;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  height: 5vh;
  width: 20vh;
  line-height: 5vh;
  font-weight: bolder;
  text-align: center;
  font-size: 3.2vh;
  z-index: 1;
  text-shadow: 3px 3px 3px grey;
  box-shadow: 5px -5px;
  opacity: 0.7;
}

.button:hover {
  background-color: cornflowerblue;
  cursor: pointer;
  font-weight: bolder;
  font-size: 3.2vh;
  z-index: 1;
  text-shadow: 3px 3px 3px grey;
  opacity: 1;
}
</style>
