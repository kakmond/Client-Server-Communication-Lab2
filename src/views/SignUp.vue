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
    <p class="lead font-weight-bold text-center">Sign Up</p>
    <form @submit.prevent="createAccount()">
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
  methods: {
    createAccount() {
      const account = {
        username: this.username,
        password: this.password
      };
      client.createAccount(account, (errors, id) => {
        // errors = array with error codes (empty if everything went OK).
        // id = the id the newly created account got if everything went OK.
        if (errors.length == 0) {
          this.$router.push("/account/" + id);
          // id = 85
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "invalidAccount": The account object is wrong.
          //  - "usernameTooShort": The username is too short.
          //  - "usernameTooLong": The username is too long.
          //  - "passwordTooShort": The password is too short.
          //  - "usernameTaken": The username is already used by another account.
        }
      });
    }
  }
};
</script>
