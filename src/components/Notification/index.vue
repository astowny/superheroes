<template>
	<v-snackbar v-model="notification.notify" top right :color="notification.color">
		{{ notification.text }}
		<v-btn text @click="notification = false">
			<v-icon>fas fa-times</v-icon>
		</v-btn>
	</v-snackbar>
</template>

<script>

export default {
  computed: {
    notification: {
      get() { return this.$store.state.notification },
      set (value) { this.$store.commit('setNotification', value)}
    }
  }
};
</script>

<style>
</style>