<template>
  <div>
    <div class="button" v-on:click="SwitchToLoginPage">
      &#x1F3E0; Logout
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
  border: 0.2vh solid rgb(126, 125, 125);
  margin-top: 5vh;
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
}

.button:hover {
  background-color: cornflowerblue;
  cursor: pointer;
  font-weight: bolder;
  font-size: 3.2vh;
  z-index: 1;
  text-shadow: 3px 3px 3px grey;
}
</style>
