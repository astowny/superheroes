<template>
	<v-card class="mx-auto grey lighten-2">
		<v-list-item class="justify-start align-start d-flex">
			<v-list-item-content>
				<div class="overline mb-4">ID : {{hero.id}}</div>
				<!-- show details without editor -->
				<div v-if="stateApp !== 'EDIT'" class="align-self-start">
					<v-list-item-title class="headline overflow-bw mb-1">{{ $t('details', {name: hero.name})}}</v-list-item-title>
					<p v-if="hero.description" class="text-justify">{{ $t('DESCRIPTION_LABEL') }} : {{hero.description}}</p>
				</div>
				<!-- end show details without editor -->
				<!-- editor open -->
				<div v-else-if="stateApp === 'EDIT' && cachedHero != null">
					<v-text-field v-model="cachedHero.name" dense :label="$t('hero.namelabel')"></v-text-field>
					<v-text-field v-model="cachedHero.imgUrl" dense :label="$t('hero.imgurllabel')"></v-text-field>
					<v-textarea v-model="cachedHero.description" dense :label="$t('hero.descriptionlabel')"></v-textarea>
					<!-- btns -->
					<v-btn @click="save()" color="secondary">
						{{ $t("SAVE_BTN") }}
					</v-btn>
					<v-btn @click="back()" class="ml-4" text color="purple darken-1">
						{{ $t("BACK_BTN") }}
					</v-btn>
				</div>
				<!-- end editor open -->
			</v-list-item-content>

			<!-- img and buttons -->
			<div class="d-flex ml-4 mt-3 flex-column">
				<v-list-item-avatar class="ma-0" color="grey" tile size="80">
					<v-img :src="hero.imgUrl"></v-img>
				</v-list-item-avatar>
				<v-btn @click="edit()" class="my-2 info">
					<v-icon>fas fa-edit</v-icon>
				</v-btn>
				<v-btn @click="addToFavorites()" class="mb-2 success">
					<v-icon>fas fa-star</v-icon>
				</v-btn>
				<delete-dialog @yes="deleteHero()" class="mb-2" />
				<v-btn @click="closeWindow()" class="mb-3 secondary">
					<v-icon>fas fa-times</v-icon>
				</v-btn>
			</div>
			<!-- end img and buttons -->
		</v-list-item>
	</v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DeleteDialog from "./_subs/deleteDialog";
import {
	UPDATE_HERO,
	DELETE_HERO,
	ADD_TO_FAVORITES,
	SET_SELECTED_HERO,
	SET_STATE_APP
} from "../../store/types/mutations-types";
import { GET_HERO_BY_ID } from "../../store/types/getters-types";

export default {
	name: "HeroDetail",
	components: {
		DeleteDialog
	},
	props: {
		heroId: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			cachedHero: null
		};
	},
	methods: {
		closeWindow() {
			// closeWindow the window
			this.$store.commit(SET_SELECTED_HERO, null);
			this.$store.commit(SET_STATE_APP, "");
		},
		edit() {
			// copy the hero
			this.cachedHero = JSON.parse(JSON.stringify(this.hero));
			this.$store.commit(SET_STATE_APP, "EDIT");
		},
		save() {
			// save in store
			this.$store.commit(UPDATE_HERO, this.cachedHero);
			// .
			this.$nextTick(() => {
				// Add the component back in
				this.$store.commit(SET_STATE_APP, "");
				this.$store.commit("setNotification", true);
				this.$store.commit("setText", "Hero saved.");
				this.$store.commit("setColor", "success");
			});
		},
		back() {
			// close editing
			this.$store.commit(SET_STATE_APP, "");
		},
		deleteHero() {
			this.$store.commit(DELETE_HERO, this.heroId);
			this.$emit("deleted");
			this.$store.commit("setNotification", true);
			this.$store.commit("setText", "Hero deleted.");
			this.$store.commit("setColor", "success");
		},
		addToFavorites() {
			if (this.favoriteHeroesId.indexOf(this.heroId) === -1) {
				this.$store.commit(ADD_TO_FAVORITES, this.heroId);
				this.$store.commit("setNotification", true);
				this.$store.commit("setText", "Added to favorites.");
				this.$store.commit("setColor", "success");
			} else {
				this.$store.commit("setNotification", true);
				this.$store.commit("setText", "Already in favorites.");
				this.$store.commit("setColor", "error");
			}
		}
	},
	computed: {
		...mapState(["favoriteHeroesId", "stateApp"]),
		...mapGetters([GET_HERO_BY_ID]),
		hero() {
			return this[GET_HERO_BY_ID](this.heroId);
		}
	}
};
</script>

<style scoped>
.overflow-bw {
	white-space: unset !important;
}
</style>