<template>
  <div class="text-center">
    <button type="button" @click="signOut()" class="btn btn-outline-danger btn-lg">Sign Out</button>
  </div>
</template>

<script>
import client from "@/activity-finder-client";

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    signOut() {
      client.signOut(() => {
        this.user.username = "";
        this.user.isSignedIn = false;
      });
    }
  }
};
</script>
