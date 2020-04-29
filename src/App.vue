<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="6">
						<!-- card of my App -->
						<v-card class="elevation-12 grey lighten-2">
							<!-- notification -->
							<NotificationContainer />
							<!-- toolbar -->
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>{{ $t("title") }}</v-toolbar-title>
								<v-spacer></v-spacer>
								<change-locale></change-locale>
								<template v-slot:extension class="py-6 grey lighten-2">
									<!-- tabs -->
									<v-tabs @change="close()" v-model="tab" background-color="primary" dark>
										<v-tab href="#favorites">
											<v-icon class="mr-2">fas fa-heart</v-icon>
											{{$t('favoritestab')}}
										</v-tab>

										<v-tab href="#all">
											<v-icon class="mr-2">fas fa-user-secret</v-icon>
											{{$t('alltab')}}
										</v-tab>
									</v-tabs>
								</template>
								<!-- end tabs -->
							</v-toolbar>
							<!-- end toolbar -->
							<!-- loading -->
							<v-row
								v-if="!heroes.length"
								class="fill-height mt-2"
								align-content="center"
								justify="center"
							>
								<v-col class="text-center" cols="6">
									{{$t('loading')}}
									<v-progress-linear
										class="mx-auto"
										color="deep-purple accent-4"
										indeterminate
										height="6"
										rounded
									></v-progress-linear>
								</v-col>
							</v-row>
							<!-- end loading -->
							<!-- content -->
							<div v-else class="relative">
								<btn-add-hero class="elevation-2" />
								<hero-details v-if="stateApp != 'ADD' && selectedHero" @deleted="close()" :heroId="selectedHero" class="pt-6" />
								<add-hero-view v-if="stateApp == 'ADD'" class="py-6 grey lighten-2" />
								<div v-if="stateApp == '' && !selectedHero" class="py-6 grey lighten-2 relative">
									<!-- tabs content -->
									<v-tabs-items class="grey lighten-2" v-model="tab">
										<v-tab-item value="favorites">
											<favorites />
										</v-tab-item>
										<v-tab-item value="all">
											<heroes />
										</v-tab-item>
									</v-tabs-items>
								</div>
								<!-- end tabs content -->
							</div>
							<!-- end content -->
						</v-card>
						<!-- end card of my App -->
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import Heroes from "./components/Heroes/index";
import HeroDetails from "./components/HeroDetails/index";
import ChangeLocale from "./components/ChangeLocale";
import BtnAddHero from "./components/BtnAddHero/index";
import AddHeroView from "./components/AddHeroView";
import Favorites from "./components/Favorites/index";
import NotificationContainer from "./components/Notification/NotificationContainer";
import { mapState } from "vuex";
import { SET_SELECTED_HERO, SET_STATE_APP } from "./store/types/mutations-types";

export default {
	name: "SuperherosApp",
	components: {
		Heroes,
		ChangeLocale,
		BtnAddHero,
		AddHeroView,
		Favorites,
		NotificationContainer,
		HeroDetails
	},
	data: () => ({
		tab: null
	}),
	methods: {
		close() {
			this.$store.commit(SET_SELECTED_HERO, null);
			this.$store.commit(SET_STATE_APP, '');
		}
	},
	computed: {
		...mapState(["stateApp", "notify", "selectedHero", "heroes"])
	}
};
</script>

<style scoped>
.w-full {
	width: 100%;
}
.relative {
	position: relative;
}
.active {
	transform: rotateZ(45deg);
	transition: all 0.5s;
}
</style>