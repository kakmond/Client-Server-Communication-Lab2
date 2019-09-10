<template>
  <div>
    <div class="card my-2">
      <div
        v-if="errors.length != 0"
        class="alert text-center alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Errors:&nbsp;</strong>
        <span v-for="(error, index) in errors" :key="index">{{error}}&nbsp;</span>
      </div>
      <div v-else>
        <div
          v-if="updated"
          class="alert text-center alert-primary alert-dismissible fade show"
          role="alert"
        >
          <strong>Updated!</strong>
        </div>
      </div>
      <div class="card-body">
        <div v-if="activity.accountId == user.id && !timeHasPassed">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Activity ID</span>
              <footer>
                <input type="text" class="form-control" disabled v-model="activity.id" />
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Title</span>
              <footer>
                <input type="text" class="form-control" v-model="activity.title" />
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Description</span>
              <footer>
                <input type="text" class="form-control" v-model="activity.description" />
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Start time</span>
              <footer>
                <input type="text" class="form-control" v-model="activity.startTime" />
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">End time</span>
              <footer>
                <input type="text" class="form-control" v-model="activity.endTime" />
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Latitude</span>
              <footer>
                <input type="text" class="form-control" v-model="activity.latitude" />
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Longitude</span>
              <footer>
                <input type="text" class="form-control" v-model="activity.longitude" />
              </footer>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Activity ID</span>
              <footer>
                <a class="text-muted">{{activity.id}}</a>
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Title</span>
              <footer>
                <a class="text-muted">{{activity.title}}</a>
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Description</span>
              <footer>
                <a class="text-muted">{{activity.description}}</a>
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Start time</span>
              <footer>
                <a class="text-muted">{{activity.startTime}}</a>
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">End time</span>
              <footer>
                <a class="text-muted">{{activity.endTime}}</a>
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Latitude</span>
              <footer>
                <a class="text-muted">{{activity.latitude}}</a>
              </footer>
            </li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="font-weight-bold text-success lead">Longitude</span>
              <footer>
                <a class="text-muted">{{activity.longitude}}</a>
              </footer>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="activity.accountId == user.id" class="mb-2">
      <button
        v-if="!timeHasPassed"
        type="button"
        @click="updateActivityById(activity.id)"
        class="btn btn-info btn-lg btn-block"
      >Update Activity</button>
      <button
        type="button"
        @click="deleteActivityById(activity.id)"
        class="btn btn-warning btn-lg btn-block"
      >Delete Activity</button>
    </div>
  </div>
</template>

<script>
import client from "@/activity-finder-client";

export default {
  data() {
    return {
      activity: {},
      errors: [],
      updated: false,
      timeHasPassed: false
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  created() {
    const id = this.$route.params.id;
    this.getActivityById(id);
  },
  methods: {
    getActivityById(id) {
      client.getActivityById(id, (errors, activity) => {
        // errors = array with error codes (empty if everything went OK).
        // activity = object with info about the activity if everything went OK.
        if (errors.length == 0) {
          // activity = {id: 5, accountId: 48, title: "Read Harry Potter", ...}
          this.activity = activity;
          // Check if start timestamp is greater than today
          let startTime = new Date(this.activity.startTime);
          console.log(startTime);
          let currentTime = new Date();
          console.log(currentTime.getTime());
          if (startTime < currentTime) {
            this.timeHasPassed = true;
          } else {
            this.timeHasPassed = false;
          }
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "notFound": No activity with the given id exists.
        }
      });
    },
    updateActivityById(id) {
      const updatedActivity = {
        id: this.activity.id,
        title: this.activity.title,
        accountId: this.activity.accountId,
        description: this.activity.description,
        startTime: this.activity.startTime,
        endTime: this.activity.endTime,
        latitude: this.activity.latitude,
        longitude: this.activity.longitude
      };
      this.updated = false;
      client.updateActivityById(id, updatedActivity, errors => {
        // errors = array with error codes (empty if everything went OK).
        if (errors.length == 0) {
          this.errors = [];
          // Activity was updated.
          this.updated = true;
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "notFound": No activity with the given id exists.
          //  - "invalidActivity": The activity object is wrong.
          //  - "notAuthenticated": The user is not signed in.
          //  - "notAuthorized": The user tries to update an activity for an account the user is not signed in to.
          //  - "idChanged": The id changed (not allowed).
          //  - "started": The activity has already started.
          //  - "titleTooShort": The title is too short.
          //  - "titleTooLong": The title is too long.
          //  - "descriptionTooShort": The description is too short.
          //  - "descriptionTooLong": The description is too long.
          //  - "startTimeTooEarly": The start time is changed to a time that has already been.
          //  - "endingBeforeStarting": The end time is before the start time.
        }
      });
    },
    deleteActivityById(id) {
      client.deleteActivityById(id, errors => {
        // errors = array with error codes (empty if everything went OK).
        if (errors.length == 0) {
          this.$router.go(-1); // go to previous page
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
