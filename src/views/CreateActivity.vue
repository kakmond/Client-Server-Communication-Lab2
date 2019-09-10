<template>
  <div>
    <h4 class="text-center" v-if="!user.isSignedIn">Please Sign in first!</h4>
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
    <form @submit.prevent="createActivity()" v-if="user.isSignedIn">
      <div class="form-group">
        <label for="inputAddress">Title</label>
        <input v-model="title" type="text" class="form-control" placeholder="Title" />
      </div>
      <div class="form-group">
        <label for="inputAddress">Description</label>
        <textarea
          v-model="description"
          class="form-control"
          placeholder="Description"
          aria-label="With textarea"
        ></textarea>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Start time</label>
          <input v-model="startTime" type="number" class="form-control" placeholder="Start time" />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">End time</label>
          <input v-model="endTime" type="number" class="form-control" placeholder="End time" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Latitude</label>
          <input v-model="latitude" class="form-control" placeholder="Latitude" />
        </div>
        <div class="form-group col-md-6">
          <label>Longitude</label>
          <input v-model="longitude" class="form-control" placeholder="Longitude" />
        </div>
      </div>
      <div>
        <button type="submit" class="btn btn-success">Create Activity</button>
      </div>
    </form>
  </div>
</template>

<script>
import client from "@/activity-finder-client";

export default {
  data() {
    return {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      latitude: "",
      longitude: "",
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
    createActivity() {
      const activity = {
        accountId: this.user.id, // The id of the account creating the activity.
        title: this.title,
        description: this.description,
        startTime: Number(this.startTime), // Unix timestamp (milliseconds)
        endTime: Number(this.endTime), // Unix timestamp (millisecond)
        latitude: Number(this.latitude),
        longitude: Number(this.longitude)
      };
      client.createActivity(activity, (errors, id) => {
        // errors = array with error codes (empty if everything went OK).
        // id = the id the newly created activity got if everything went OK.
        if (errors.length == 0) {
          this.$router.push("/activity/" + id);
          // id = 85
        } else {
          this.errors = errors;
          // errors = ["errorCode1", "errorCode2", ...]
          // Possible errors codes:
          //  - "networkError": Couldn't connect to the backend.
          //  - "backendError": The backend couldn't execute the request for some reason.
          //  - "invalidActivity": The activity object is wrong.
          //  - "notAuthenticated": The user is not signed in.
          //  - "notAuthorized": The user tries to create an activity for an account the user is not signed in to.
          //  - "accountNotFound": No account with the id 'accountId' exists.
          //  - "titleTooShort": The title is too short.
          //  - "titleTooLong": The title is too long.
          //  - "descriptionTooShort": The description is too short.
          //  - "descriptionTooLong": The description is too long.
          //  - "startTimeTooEarly": The start time has already been.
          //  - "endingBeforeStarting": The end time is before the start time.
        }
      });
    }
  }
};
</script>