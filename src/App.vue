<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|
      <router-link to="/about">About</router-link>&nbsp;|
      <router-link to="/accounts">Accounts</router-link>&nbsp;|
      <router-link to="/signup">Sign Up</router-link>&nbsp;|
      <router-link to="/signin">Sign In</router-link>&nbsp;|
      <router-link to="/signout">Sign Out</router-link>&nbsp;|
      <router-link to="/createActivity">Create Activity</router-link>&nbsp;|
      <router-link to="/activities">Activities</router-link>&nbsp;|
      <router-link to="/yourActivities">Your Activities</router-link>&nbsp;
      <hr />
    </div>

    <div class="container">
      <div
        v-if="!user.isSignedIn"
        class="alert text-center alert-danger alert-dismissible fade show"
        role="alert"
      >
        You are not
        <strong>signed in</strong>:(
      </div>
      <div v-else class="alert text-center alert-success alert-dismissible fade show" role="alert">
        You are signed in as
        <strong>{{user.username}}</strong>
      </div>
      <router-view :user="user" />
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      user: {
        username: "",
        isSignedIn: false
      } 
    };
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  text-align: center;

  padding-top: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
