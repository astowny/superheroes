<template>
  <v-overflow-btn
      class="my-2"
      :items="sortBy"
      label="label"
    ></v-overflow-btn>
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