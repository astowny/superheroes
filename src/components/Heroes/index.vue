<template>
	<div class="py-3 grey lighten-2">
		<!-- content -->
		<div>
			<!-- filters and sort -->
			<v-row class="justify-space-around align-end px-2">
				<!-- searchbar and results -->
				<v-col>
					<div class="overline">{{ $t("RESULTS", { count: filteredHeroes.length }) }}</div>
					<div>
						<v-text-field @click:append-outer="doSearch()" v-model="localSearch" append-outer-icon="fas fa-search" clearable :label="$t('SEARCH_LABEL')"></v-text-field>
						<!-- count heroes -->
					</div>
				</v-col>
				<v-col>
					<!-- sort -->
					<div class="d-flex align-center">
						<v-select v-model="selectedSort" :items="sortItems" :label="$t('SORT_LABEL')"></v-select>
						<v-btn
										@click="sortHeroesBy()"
										max-width="200"
										class="ml-3 mb-3"
										color="primary"
						>{{ $t('SORT_BTN') }}</v-btn>
					</div>
				</v-col>
			</v-row>
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
			<!-- end list items -->
			<!--  pagination  -->
			<pagination />
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
		SORT_HEROES_BY_ID,
		SET_SEARCH
	} from "../../store/types/mutations-types";
	import { GET_FILTERED_HEROES } from "../../store/types/getters-types";

	export default {
		name: "Heroes",
		components: {
			Pagination
		},
		data() {
			return {
				selectedSort: "",
				sortItems: [
					{ text: this.$t("SORT_ITEM_NAME"), value: "name" },
					{ text: this.$t("SORT_ITEM_ID"), value: "id" }
				],
				localSearch: ""
			};
		},
		methods: {
			doSearch() {
				this.$store.commit(SET_SEARCH, this.localSearch || '');
			},
			selectHero(hero) {
				this.$store.commit(SET_SELECTED_HERO, hero.id);
			},
			sortHeroesBy() {
				//
				if (this.selectedSort == "name") {
					this.$store.commit(SORT_HEROES_BY_NAME);
					this.selectedSort = "";
					this.$store.dispatch('notification/add', { text: 'Heroes sorted by name.', color: 'success' })
				} else if (this.selectedSort == "id") {
					this.$store.commit(SORT_HEROES_BY_ID);
					this.selectedSort = "";
					this.$store.dispatch('notification/add', { text: 'Heroes sorted by id.', color: 'success' })
				}
			}
		},
		computed: {
			...mapState(["heroes", "pagination"]),
			filteredHeroes() {
				return this.$store.getters[GET_FILTERED_HEROES];
			},
			currentPageHeroes() {
				// where to slice : currentPage - 1 * nbItemsPerPage
				let startSlice =
								this.pagination.visibleItemsPerPageCount *
								(this.pagination.currentPage - 1);
				// the end of slice : startSilce + nbItemsPerPage except if end of array in this case length + 1
				let endSlice =
								startSlice + this.pagination.visibleItemsPerPageCount <
								this.filteredHeroes.length
												? startSlice + this.pagination.visibleItemsPerPageCount
												: this.filteredHeroes.length + 1;
				// set the current page hero list
				return this.filteredHeroes.slice(startSlice, endSlice);
			}
		}
	};
</script>

<style scoped>
	.active {
		background: lightgrey;
	}
</style>