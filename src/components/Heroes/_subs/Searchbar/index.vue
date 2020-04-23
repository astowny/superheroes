<template>
  <v-text-field
  label="">

  </v-text-field>
</template>

<script>
export default {
  methods: {
		numberRule(v) {
			return /^[0-9]+$/.test(v) ? true : this.$t("error.mustbeanumber");
		},
		checkId(v) {
			// is the id already taken ?
			return !this.GET_HERO_BY_ID(parseInt(v)) || this.$t("error.idtaken");
		},
  }
  };
</script>

<style>
</style>