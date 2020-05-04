<template>
	<v-card class="mx-auto elevation-0 grey lighten-2">
		<v-list-item class="justify-start align-start d-flex">
			<v-list-item-content>
				<div class="overline mb-4">ID : {{hero.id}}</div>
				<router-view></router-view>
			</v-list-item-content>

			<!-- img and buttons -->
			<div class="d-flex ml-4 mt-3 flex-column">
				<v-list-item-avatar class="ma-0" color="grey" tile size="80">
					<v-img :src="hero.imgUrl"></v-img>
				</v-list-item-avatar>
				<v-btn @click="edit()" class="my-2 info">
					<v-icon small>fas fa-edit</v-icon>
				</v-btn>
				<v-btn v-if="!isInFavorites" @click="addToFavorites()" :class="isInFavorites ? 'red darken-1' : 'success'" class="mb-2" :dark="isInFavorites">
					<v-icon small>fas fa-star</v-icon>
				</v-btn>
				<modal v-else key-message="ASK_REMOVE_FROM_FAVORITES" icon="fas fa-star" color="warning" @yes="removeFromFavorites()" class="mb-2" />
				<modal key-message="confirmationDelete" icon="fas fa-trash" color="red darken-1" @yes="deleteHero()" class="mb-2" />
			</div>
			<!-- end img and buttons -->
		</v-list-item>
	</v-card>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
	import Modal from "../../components/Modals/index";
	import {
		DELETE_HERO,
		ADD_TO_FAVORITES,
		REMOVE_FROM_FAVORITES,
		SET_STATE_APP
	} from "../../store/types/mutations-types";
	import { GET_HERO_BY_ID } from "../../store/types/getters-types";

	export default {
		name: "HeroDetail",
		components: {
			Modal
		},
		props: {
			heroId: {
				type: Number,
				required: true
			}
		},
		methods: {
			edit() {
				// copy the hero
				this.$store.commit(SET_STATE_APP, "EDIT");
				if (this.$route.path.indexOf('/edit') === -1) {
					this.$router.push({name: 'editHero', params: { heroId: this.heroId}});
				} else {
					this.$store.commit(SET_STATE_APP, "");
					this.$router.push({ name: 'heroDetails', params: { heroId: this.heroId } })
				}
			},
			deleteHero() {
				this.$router.go(-1)
				this.$store.commit(DELETE_HERO, this.heroId);
				this.$emit("deleted");
				this.$store.dispatch('notification/add', {text: this.$t('NOTIFICATION.HERO_DELETED'), color: "success"})
			},
			addToFavorites() {
				// if not in favorites
				if (!this.isInFavorites) {
					this.$store.commit(ADD_TO_FAVORITES, this.heroId);
					this.$store.dispatch('notification/add', {text: this.$t('NOTIFICATION.HERO_ADDED_TO_FAVORITES'), color: "success"})
				}
			},
			removeFromFavorites() {
				if (this.isInFavorites) {
					this.$store.commit(REMOVE_FROM_FAVORITES, this.heroId);
					this.$store.dispatch('notification/add', {text: this.$t('NOTIFICATION.HERO_REMOVED_FROM_FAVORITES'), color: "success"})
				}
			}
		},
		computed: {
			...mapState(["favoriteHeroesId", "stateApp"]),
			...mapGetters([GET_HERO_BY_ID]),
			hero() {
				return this[GET_HERO_BY_ID](this.heroId);
			},
			isInFavorites() {
				return this.favoriteHeroesId.indexOf(this.heroId) !== -1
			}
		}
	};
</script>

<style scoped>
	.overflow-bw {
		white-space: unset !important;
	}
</style>