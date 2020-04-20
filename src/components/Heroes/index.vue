<template>
  <div>
    <!-- hero details -->
    <div v-if="selectedHero" class="my-2" >
      <hero-detail :heroId="selectedHero.id" @deleted="selectedHero = null" @editing="handleEditing" />
    </div>
    <v-alert v-if="!currentPageHeroes.length">Loading...</v-alert>
    <!-- list items -->
    <v-list-item
      v-for="(hero) in currentPageHeroes"
      :class="{active : hero === selectedHero}"
      :key="hero.name"
      @click="selectHero(hero)"
    >
      <v-list-item-avatar>
        <v-img :src="hero.imgUrl"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-html="`${hero.id} - ${hero.name}`"></v-list-item-title>
        <v-list-item-subtitle v-html="hero.description"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!--  pagination  -->
    <pagination :heroes="heroes" @input="changePage" />
  </div>
</template>

<script>
import HeroDetail from "../HeroDetails/index";
import Pagination from "./_subs/Pagination";
import {mapState} from 'vuex'

export default {
  name: "Heroes",
  components: {
    HeroDetail,
    Pagination
  },
  data() {
    return {
      selectedHero: null,
      editing: false
    };
  },
  methods: {
    handleEditing(isEditing){
      this.editing = isEditing
    },
    selectHero(hero) {
      if (!this.editing) {
        this.selectedHero = hero;
      }
    },
    changePage: function() {
      // clear selected hero
      this.selectedHero = "";
    }
  },
  computed: {
    ...mapState(['heroes', 'pagination']),
    currentPageHeroes() {
      // where to slice : currentPage - 1 * nbItemsPerPage
      let startSlice =
        this.pagination.visibleItemsPerPageCount *
        (this.pagination.currentPage - 1);
      // the end of slice : startSilce + nbItemsPerPage except if end of array in this case length + 1
      let endSlice =
        startSlice + this.pagination.visibleItemsPerPageCount <
        this.heroes.length
          ? startSlice + this.pagination.visibleItemsPerPageCount
          : this.heroes.length + 1;
      // set the current page hero list
      return this.heroes.slice(startSlice, endSlice);
    }
  }
};
</script>

<style scoped>
.active {
  background: lightgrey;
}
</style>