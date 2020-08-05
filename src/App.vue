<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  z-index: -2;
  background: linear-gradient(
    70deg,
    #f79256,
    #fbd1a2,
    #1d4e89,
    #fbd1a2,
    #f79256
  );
  -webkit-animation: Gradient 30s ease infinite;
  -moz-animation: Gradient 30s ease infinite;
  -o-animation: Gradient 30s ease infinite;
  animation: Gradient 30s ease infinite;
  background-size: 1000% 1000%;
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-o-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
