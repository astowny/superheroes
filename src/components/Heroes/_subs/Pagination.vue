<template>
	<div class="d-flex justify-center align-center px-4">
		<v-pagination
			v-model="currentPage"
			:length="pageCount"
			@input="emitInput()"
			:total-visible="totalVisible"
			circle
		>
    </v-pagination>
		<v-btn @click="moreHeroes()" class="primary">
      {{$t('paginationmore')}}
    </v-btn>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { GET_MORE_HEROES } from "../../../store/types/actions-types";
/**
 * Set the array of heroes for the current page
 */

export default {
	props: {
		heroes: {
			type: Array,
			required: true
		}
	},
	name: "Pagination",
	data() {
		return {
			totalVisible: 5
		};
	},
	methods: {
		emitInput() {
			this.$emit("input", this.currentPageHeroes);
		},
		/**
		 * Loads more heroes
		 */
		moreHeroes() {
			let offset = this.heroes.length;
			this.$store.dispatch(GET_MORE_HEROES, offset);
		}
	},
	computed: {
		...mapState({
			visibleItemsPerPageCount: state =>
				state.pagination.visibleItemsPerPageCount
		}),
		...mapActions([GET_MORE_HEROES]),
		// number of pages in pagination
		pageCount() {
			let euclidianDiv = Math.trunc(
				this.heroes.length / this.visibleItemsPerPageCount
			);
			let rest = this.heroes.length % this.visibleItemsPerPageCount;
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