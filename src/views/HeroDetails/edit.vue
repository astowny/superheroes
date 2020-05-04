<template>
  <div>
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
</template>

<script>
  import { mapGetters } from "vuex";
  import {GET_HERO_BY_ID} from "../../store/types/getters-types";
  import {SET_STATE_APP, UPDATE_HERO} from "../../store/types/mutations-types";

  export default {
    name: "edit",
    props: {
      heroId: {
        type: Number,
        required:true
      },
    },
    data() {
      return {
        cachedHero: {
          name:'',
          description: '',
          imgUrl: ''
        }
      }
    },
    mounted() {
      this.cachedHero = JSON.parse(JSON.stringify(this[GET_HERO_BY_ID](this.heroId)))
    },
    methods: {
      save() {
        // save in store
        this.$store.commit(UPDATE_HERO, this.cachedHero);
        // .
        this.$nextTick(() => {
          // Add the component back in
          this.$store.dispatch('notification/add', {text: this.$t('NOTIFICATION.HERO_UPDATED'), color: "success"})
          this.back()
        });
      },
      back() {
        // close editing
        this.$router.go(-1)
        this.$store.commit(SET_STATE_APP, "");
      },
    },
    computed: {
      ...mapGetters([GET_HERO_BY_ID]),
      hero() {
        return this[GET_HERO_BY_ID](this.heroId);
      },
    }
  }</script>

<style scoped>

</style>