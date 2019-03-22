<template>
  <b-jumbotron bg-variant="danger" text-variant="white">
    <div id="nav">
      <div class="header">
        <router-link to="/">
          <h1 class="header-text">Welp</h1>
        </router-link>
      </div>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </b-jumbotron>
</template>

<style lang="scss" scoped>
.header {
  margin: 0 auto;
  width: 200px;
  a:hover {
    text-decoration: none;
  }
  .header-text {
    color: white;
    font-size: 4rem;
    text-decoration: none;
  }
}

#nav {
  padding: 0.5rem;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: white;
}
a,
h4 {
  color: #2c3e50;
  text-decoration: none;
}
.jumbotron {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  border-radius: 0;
  border-bottom: 1px solid #2c3e50;
}
</style>
