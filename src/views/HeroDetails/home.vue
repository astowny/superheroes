<template>
  <div class="align-self-start">
    <v-list-item-title class="headline overflow-bw mb-1">{{ $t('details', {name: hero.name})}}</v-list-item-title>
    <p v-if="hero.description" class="text-justify">{{ $t('DESCRIPTION_LABEL') }} : {{hero.description}}</p>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import {GET_HERO_BY_ID} from "../../store/types/getters-types";

  export default {
    props: {
      heroId: {
        type: Number,
        required:true
      }
    },
    name: "home",
    computed: {
      ...mapState(["favoriteHeroesId", "stateApp"]),
      ...mapGetters([GET_HERO_BY_ID]),
      hero() {
        return this[GET_HERO_BY_ID](this.heroId);
      },
      isInFavorites() {
        return this.favoriteHeroesId.indexOf(this.heroId.toString()) !== -1
      }
    }
  }
</script>

<style scoped>

</style>