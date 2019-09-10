<template>
  <div>
    <p class="lead text-center font-weight-bold">List of Users</p>

    <div v-if="accounts.length == 0">No User exists.</div>
    <div v-else>
        <ul class="list-group list-group-flush">
          <li v-for="account in accounts" :key="account.id" class="list-group-item">
            <span class="lead">
              <router-link :to="'/account/'+account.id" class="text-success">{{account.username}}</router-link>
            </span>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import client from "@/activity-finder-client";

export default {
  data() {
    return {
      accounts: [],
      errors: []
    };
  },
  created() {
    client.getAllAccounts((errors, accounts) => {
      // errors = array with error codes (empty if everything went OK).
      // accounts = array with all accounts if everything went OK.
      if (errors.length == 0) {
        // accounts = [{id: 1, username: "Alice"}, {...}, ...]
        this.accounts = accounts;
      } else {
        this.errors = errors;
        // errors = ["errorCode1", "errorCode2", ...]
        // Possible errors codes:
        //  - "networkError": Couldn't connect to the backend.
        //  - "backendError": The backend couldn't execute the request for some reason.
      }
    });
  }
};
</script>
