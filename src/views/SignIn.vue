<template>
  <div>
    <div
      v-if="errors.length != 0"
      class="alert text-center alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Errors:&nbsp;</strong>
      <span v-for="(error, index) in errors" :key="index">{{error}}&nbsp;</span>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <p class="lead font-weight-bold text-center">Sign In</p>
    <form @submit.prevent="signIn()">
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter username"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
    </form>
  </div>
</template>

<script>
import client from "@/activity-finder-client";

export default {
  data() {
    return {
      username: "",
      password: "",
      errors: []
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    signIn() {
      client.signIn(this.username, this.password, (errors, account) => {
        // errors = array with error codes (empty if everything went OK).
        // account = object with info about the account you signed into if everything went OK.
        if (errors.length == 0) {
          // account = {id: 85, username: "Greta"}
          this.user.username = account.username;
          this.user.id = account.id;
          this.user.isSignedIn = true;
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "wrongCredentials": The username of password is incorrect.
        }
      });
    }
  }
};
</script>
