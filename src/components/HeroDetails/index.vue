<template>
	<v-card class="mx-auto" max-width="90%" outlined>
		<v-list-item class="justify-start align-start d-flex">
			<v-list-item-content>
				<div class="overline mb-4">{{hero.id}}</div>
				<!-- show details without editor -->
				<div v-if="!editorOpen" class="align-self-start">
					<v-list-item-title class="headline overflow-bw mb-1">{{ $t('details', {name: hero.name})}}</v-list-item-title>
					<p v-if="hero.description" class="text-justify">{{hero.description}}</p>
				</div>
				<!-- end show details without editor -->
				<!-- editor open -->
				<div v-else>
					<v-text-field v-model="cachedHero.name" dense :label="$t('hero.namelabel')"></v-text-field>
					<v-text-field v-model="cachedHero.imgUrl" dense :label="$t('hero.imgurllabel')"></v-text-field>
					<v-textarea v-model="cachedHero.description" dense :label="$t('hero.descriptionlabel')"></v-textarea>
					<!-- v-textfield for img src -->
					<v-btn @click="save()" color="secondary">
						<v-icon>fas fa-save</v-icon>
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
					<v-icon>
						fas fa-star
					</v-icon>
				</v-btn>
				<delete-dialog @yes="deleteHero()" />
			</div>
			<!-- end img and buttons -->
		</v-list-item>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteDialog from "./_subs/deleteDialog";
import { UPDATE_HERO, DELETE_HERO, ADD_TO_FAVORITES } from "../../store/types/mutations-types";
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
			cachedHero: null,
			editorOpen: false
		};
	},
	methods: {
		edit() {
			// copy the hero
			this.cachedHero = JSON.parse(JSON.stringify(this.hero));
			this.editorOpen = !this.editorOpen;
			this.$emit("editing", this.editorOpen);
		},
		save() {
			// save in store
			this.$store.commit(UPDATE_HERO, this.cachedHero);
			// .
			this.$nextTick(() => {
				// Add the component back in
				this.editorOpen = false;
				this.$emit("editing", this.editorOpen);
			});
		},
		deleteHero() {
			this.$store.commit(DELETE_HERO, this.heroId);
			this.$emit("deleted");
		},
		addToFavorites(){
			this.$store.commit(ADD_TO_FAVORITES, this.heroId)
		}
	},
	computed: {
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