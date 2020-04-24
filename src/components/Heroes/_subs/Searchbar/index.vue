<template>
	<div>
		<v-text-field v-model="localSearch" label="Search"></v-text-field>
		<v-btn @click="doSearch()" class="primary ml-3">Go</v-btn>
	</div>
</template>

<script>
import { SET_SEARCH } from "../../../../store/types/mutations-types";
export default {
	data() {
		return {
			localSearch: ""
		};
	},
	methods: {
		doSearch() {
			this.$store.commit(SET_SEARCH, this.localSearch);
		}
	}
};
</script>

<style>
</style>