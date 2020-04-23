<template>
	<v-card class="mx-auto" max-width="90%" outlined>
		<v-list-item class="justify-start align-start d-flex">
			<v-list-item-content>
				<!-- editor open -->
				<div>
					<v-text-field
						ref="heroId"
						:rules="[numberRule, checkId]"
						v-model="cachedHero.id"
						class="my-2"
						:label="$t('hero.idlabel')"
						dense
					>{{cachedHero.id}}</v-text-field>
					<v-text-field v-model="cachedHero.name" class="my-2" dense :label="$t('hero.namelabel')"></v-text-field>
					<v-text-field v-model.lazy="cachedHero.imgUrl" class="my-2" dense :label="$t('hero.imgurllabel')"></v-text-field>
					<v-textarea v-model="cachedHero.description" class="my-2" dense :label="$t('hero.descriptionlabel')"></v-textarea>
					<v-btn @click="submit()" color="secondary">
					<v-icon>fas fa-save</v-icon>
				</v-btn>
				</div>
				<!-- end editor open -->
			</v-list-item-content>

			<!-- img and buttons -->
			<div class="d-flex ml-4 flex-column">
				<v-list-item-avatar color="grey" tile size="80">
					<v-img :src="cachedHero.imgUrl"></v-img>
				</v-list-item-avatar>
			</div>
			<!-- end img and buttons -->
		</v-list-item>
	</v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { SET_STATE_APP, ADD_HEROES } from "../../store/types/mutations-types";
import { GET_HERO_BY_ID } from "../../store/types/getters-types";

export default {
	data() {
		return {
			cachedHero: {},
			errorMessages: ""
		};
	},
	methods: {
		numberRule(v) {
			return /^[0-9]+$/.test(v) ?  true : this.$t("error.mustbeanumber")
		},
		checkId(v) {
			// is the id already taken ?
			return !this.GET_HERO_BY_ID(parseInt(v)) || this.$t("error.idtaken");
		},
		submit() {
			if (this.$refs["heroId"].validate(true)) {
				// save the new hero
				this.$store.commit(ADD_HEROES,{heroes: [{
					...this.cachedHero,
					id: parseInt(this.cachedHero.id)
				}]})
				// close
				this.$store.commit(SET_STATE_APP, '');
				// notify
				this.$store.commit("setNotification", true);
				this.$store.commit("setText", "Hero added successfully.");
				this.$store.commit("setColor", "success");
			}
		},
	},
	computed: {
		...mapState(['heroes']),
		...mapGetters([GET_HERO_BY_ID])
	}
};
</script>

<style>
</style>