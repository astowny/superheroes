<template>
	<div class="py-3 grey lighten-2">
		<!-- content -->
		<div>
			<!-- btn sort -->
			<div class="d-flex flex-column">
				<v-overflow-btn v-model="selectedSort" :items="['Name','Id']" label="Sort by"></v-overflow-btn>
				<v-btn @click="sortHeroesBy()" max-width="200" class="ml-3 mb-3">
					Sort
				</v-btn>
			</div>
			<!-- list items -->
			<v-list-item v-for="(hero) in currentPageHeroes" :key="hero.name" @click="selectHero(hero)">
				<v-list-item-avatar>
					<v-img :src="hero.imgUrl"></v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<div class="overline font-weight-light">ID : {{hero.id}}</div>
					<v-list-item-title v-html="hero.name"></v-list-item-title>
					<v-list-item-subtitle v-html="hero.description"></v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<!--  pagination  -->
			<pagination :heroes="heroes" />
			<!-- btn moreheroes -->
		</div>
		<!-- end content -->
	</div>
</template>

<script>
import Pagination from "./_subs/Pagination";
import { mapState } from "vuex";
import {
	SORT_HEROES_BY_NAME,
	SET_SELECTED_HERO,
	SORT_HEROES_BY_ID
} from "../../store/types/mutations-types";

export default {
	name: "Heroes",
	components: {
		Pagination
	},
	data() {
		return {
			selectedSort: ""
		};
	},
	methods: {
		selectHero(hero) {
			this.$store.commit(SET_SELECTED_HERO, hero.id);
		},
		sortHeroesBy() {
			if (this.selectedSort == 'Name') {
				this.$store.commit(SORT_HEROES_BY_NAME)
				this.selectedSort = ''
			} else if (this.selectedSort == 'Id') {
				this.$store.commit(SORT_HEROES_BY_ID)
				this.selectedSort = ''
			}
		}
	},
	computed: {
		...mapState(["heroes", "pagination"]),
		currentPageHeroes() {
			// where to slice : currentPage - 1 * nbItemsPerPage
			let startSlice =
				this.pagination.visibleItemsPerPageCount *
				(this.pagination.currentPage - 1);
			// the end of slice : startSilce + nbItemsPerPage except if end of array in this case length + 1
			let endSlice =
				startSlice + this.pagination.visibleItemsPerPageCount <
				this.heroes.length
					? startSlice + this.pagination.visibleItemsPerPageCount
					: this.heroes.length + 1;
			// set the current page hero list
			return this.heroes.slice(startSlice, endSlice);
		}
	}
};
</script>

<style scoped>
.active {
	background: lightgrey;
}
</style>