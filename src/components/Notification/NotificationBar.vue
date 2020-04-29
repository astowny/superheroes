<template>
  <v-snackbar :color="notification.color" right top value="true">
    {{ notification.text }}
    <v-btn @click="notification = false" text>
      <v-icon>fas fa-times</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    props: {
      notification: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style>
</style>