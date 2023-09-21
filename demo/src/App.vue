<template>
  <nav class="nav nav-underline justify-content-center">
    <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

  .container {
    max-width: 700px;
  }
}

.nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
