<template>
  <div>
    <h4 class="text-center" v-if="!user.isSignedIn">Please Sign in first!</h4>
    <div v-else>
      <p class="lead text-center font-weight-bold">List of Your Activities</p>
      <div v-if="activities.length == 0">No activity exists.</div>
      <div v-else>
        <ul class="list-group list-group-flush">
          <li v-for="activity in activities" :key="activity.id" class="list-group-item">
            <div class="d-flex justify-content-between">
              <div>
                <span class="lead font-weight-bold">
                  <router-link
                    :to="'/activity/'+activity.id"
                    class="text-success"
                  >{{activity.title}}</router-link>
                </span>
                <footer class="blockquote-footer">
                  <cite>{{activity.description}}</cite>
                </footer>
              </div>
              <div>
                <button
                  @click="deleteActivityById(activity.id)"
                  class="btn btn-outline-danger"
                >Delete</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import client from "@/activity-finder-client";

export default {
  data() {
    return {
      activities: [],
      errors: []
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getActivitiesByAccountId(this.user.id);
  },
  methods: {
    getActivitiesByAccountId(id) {
      client.getActivitiesByAccountId(id, (errors, activities) => {
        // errors = array with error codes (empty if everything went OK).
        // activities = array with all activities if everything went OK.
        if (errors.length == 0) {
          this.activities = activities;
          // activities = [{id: 1, accountId: 3, title: "Watch the sky", ...}, {...}, ...]
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
        }
      });
    },
    deleteActivityById(id) {
      client.deleteActivityById(id, errors => {
        // errors = array with error codes (empty if everything went OK).
        if (errors.length == 0) {
          this.getActivitiesByAccountId(this.user.id);
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "notAuthenticated": The user is not signed in.
          //  - "notAuthorized": The user tries to delete an activity that doesn't belong to the account the user is signed into.
        }
      });
    }
  }
};
</script>
