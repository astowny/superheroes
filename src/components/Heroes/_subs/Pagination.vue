<template>
  <v-pagination
    v-model="currentPage"
    :length="pageCount"
    circle
    @input="emitInput()"
    :total-visible="totalVisible"
  ></v-pagination>
</template>

<script>
/**
 * Set the array of heroes for the current page
 */

export default {
  props: {
    heroes: {
      type: Array,
      required: true
    }
  },
  name: "Pagination",
  data() {
    return {
      totalVisible: 7
    };
  },
  methods: {
    emitInput() {
      this.$emit("input", this.currentPageHeroes);
    }
  },
  watch: {
    /**
     * Loads more heroes when the current page is before the last
     */
    currentPage() {
      let offset = this.heroes.length;
      if (this.currentPage >= this.pageCount - 1) {
        this.$store.dispatch("getMoreHeroes", offset);
      }
    }
  },
  computed: {
    visibleItemsPerPageCount() {
      return this.$store.state.pagination.visibleItemsPerPageCount;
    },
    // number of pages in pagination
    pageCount() {
      let euclidianDiv = Math.trunc(
        this.heroes.length / this.visibleItemsPerPageCount
      );
      let rest = this.heroes.length % this.visibleItemsPerPageCount;
      if (rest === 0) {
        return euclidianDiv;
      } else {
        return euclidianDiv + 1;
      }
    },
    currentPage: {
      get() {
        return this.$store.state.pagination.currentPage;
      },
      set(value) {
        this.$store.commit("setCurrentPage", value);
      }
    }
  }
};
</script>

<style scoped>
</style>