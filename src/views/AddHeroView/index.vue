<template>
	<v-card class="mx-auto transparent" max-width="90%" outlined>
		<v-list-item class="justify-start align-start d-flex">
			<v-list-item-content>
				<!-- editor open -->
				<div>
					<v-text-field
						:label="$t('hero.idlabel')"
						:rules="[numberRule, checkId]"
						v-model="cachedHero.id"
						ref="heroId"
						class="my-2"
						dense
					>{{cachedHero.id}}</v-text-field>
					<v-text-field
						ref="heroName"
						:rules="[v => !!v || 'Name required']"
						v-model="cachedHero.name"
						class="my-2"
						dense
						:label="$t('hero.namelabel')"
					></v-text-field>
					<v-text-field
						v-model.lazy="cachedHero.imgUrl"
						class="my-2"
						dense
						:label="$t('hero.imgurllabel')"
					></v-text-field>
					<v-textarea
						v-model="cachedHero.description"
						class="my-2"
						dense
						:label="$t('hero.descriptionlabel')"
					></v-textarea>
					<v-btn @click="submit()" color="secondary">
						{{ $t("SAVE_BTN") }}
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
import { mapState } from "vuex";
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
			return /^[0-9]+$/.test(v) ? true : this.$t("error.mustbeanumber");
		},
		checkId(v) {
			// is the id already taken ?
			return !this.$store.getters[GET_HERO_BY_ID](parseInt(v)) || this.$t("error.idtaken");
		},
		submit() {
			let isValid = false

			isValid = this.$refs['heroId'].validate(true) && this.$refs['heroName'].validate(true)

			if (isValid) {
				// route
				this.$router.push({ name: 'heroes' })
				// save the new hero
				this.$store.commit(ADD_HEROES, {
					heroes: [
						{
							...this.cachedHero,
							id: parseInt(this.cachedHero.id)
						}
					]
				});
				// close
				this.$store.commit(SET_STATE_APP, "");
				// notify
				this.$store.dispatch('notification/add', { text: this.$t('NOTIFICATION.HERO_ADDED'), color: 'success'})
			}
		}
	},
	computed: {
		...mapState(["heroes"])
	}
};
</script>

<style>
</style>