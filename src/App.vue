<template>
  <div id="app">
    <nav class="nav">
      <router-link :to="{name:'Overview'}">Home</router-link> |
      <router-link :to="{name:'Add Task'}"> Add Task</router-link>
    </nav>
    <div id="router-container">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}

.nav {
  padding: 15px 30px;
  background-color: cornflowerblue;
  font-size: 20px;
}

.nav a {
  padding: 0 3px;
  font-weight: bold;
  color: darkblue !important;
}

.nav a.router-link-exact-active {
     color: darkgreen !important;
}

#router-container {
  padding: 2% 7%;
}
</style>
