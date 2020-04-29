<template>
	<div class="d-flex justify-center align-center px-4">
		<v-pagination
			v-model="currentPage"
			:length="pageCount"
			:total-visible="totalVisible"
			circle
		></v-pagination>
		<v-btn @click="moreHeroes()" :loading="isLoading" class="primary" rounded small>{{$t('paginationmore')}}</v-btn>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { GET_FILTERED_HEROES } from '../../../store/types/getters-types';
/**
 * Set the array of heroes for the current page
 */

export default {
	name: "Pagination",
	data() {
		return {
			totalVisible: 8,
			isLoading: false
		};
	},
	methods: {
		/**
		 * Loads more heroes
		 */
		moreHeroes() {
			let offset = this.heroes.length;
			// active loading icon
			this.isLoading = true
			this.$store.dispatch('getMoreHeroes', offset).then(() => {
				this.isLoading = false
				console.log('is loading set false')
			})
		}
	},
	computed: {
		...mapState({
			visibleItemsPerPageCount: state =>
				state.pagination.visibleItemsPerPageCount,
			heroes: state => state.heroes
		}),
		...mapGetters({ filteredHeroes: GET_FILTERED_HEROES}),
		// number of pages in pagination
		pageCount() {
			let euclidianDiv = Math.trunc(
				this.filteredHeroes.length / this.visibleItemsPerPageCount
			);
			let rest = this.filteredHeroes.length % this.visibleItemsPerPageCount;
			if (rest === 0) {
				return euclidianDiv;
			} else {
				return euclidianDiv + 1;
			}
		},
		currentPage: {
			get() {
				return this.$store.state.pagination.currentPage;
			},
			set(value) {
				this.$store.commit("setCurrentPage", value);
			}
		}
	}
};
</script>

<style scoped>
</style>