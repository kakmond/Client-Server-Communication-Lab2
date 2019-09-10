<template>
  <div class="card my-2">
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
    <div v-else class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <span class="font-weight-bold text-success lead">User ID</span>
          <footer>
            <a class="text-muted">{{account.id}}</a>
          </footer>
        </li>
      </ul>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <span class="font-weight-bold text-success lead">Username</span>
          <footer>
            <a class="text-muted">{{account.username}}</a>
          </footer>
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
      account: {},
      errors: []
    };
  },
  created() {
    const id = this.$route.params.id;
    client.getAccountById(id, (errors, account) => {
      // errors = array with error codes (empty if everything went OK).
      // account = object with info about the account if everything went OK.
      if (errors.length == 0) {
        // account = {id: 37, username: "Olle"}
        this.account = account;
      } else {
        this.errors = errors;
        // errors = ["errorCode1", "errorCode2", ...]
        // Possible errors codes:
        //  - "networkError": Couldn't connect to the backend.
        //  - "backendError": The backend couldn't execute the request for some reason.
        //  - "notFound": No account with the given id exists.
      }
    });
  }
};
</script>
