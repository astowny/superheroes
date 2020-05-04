<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="6">
						<!-- card of my App -->
						<v-card class="grey lighten-2">
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
										<v-tab @click="manageRoute('favorites')" href="#favorites">
											<v-icon class="mr-2">fas fa-heart</v-icon>
											{{$t('favoritestab')}}
										</v-tab>
										<v-tab @click="manageRoute('heroes')" href="#all">
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
							<div v-else class="relative py-2">
								<btn-add-hero class="elevation-2" />
								<!-- tabs content -->
								<router-view></router-view>
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
	import ChangeLocale from "./components/ChangeLocale";
	import BtnAddHero from "./components/BtnAddHero/index";
	import NotificationContainer from "./components/Notification/NotificationContainer";
	import { mapState } from "vuex";
	import { SET_SELECTED_HERO, SET_STATE_APP } from "./store/types/mutations-types";

	export default {
		name: "SuperherosApp",
		components: {
			ChangeLocale,
			BtnAddHero,
			NotificationContainer,
		},
		data: () => ({
			tab: null
		}),
		methods: {
			close() {
				this.$store.commit(SET_SELECTED_HERO, null);
				this.$store.commit(SET_STATE_APP, '');
			},
			manageRoute(name){
				if (this.$route.name !== name)
					this.$router.push({ name: name })
			}
		},
		computed: {
			...mapState(["stateApp", "selectedHero", "heroes"])
		}
	};
</script>

<style scoped>
	.relative {
		position: relative;
	}
</style>