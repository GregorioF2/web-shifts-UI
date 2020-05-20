<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
#app {
  height: 100vh;
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
