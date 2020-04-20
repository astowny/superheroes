<template>
  <v-card class="mx-auto" max-width="90%" outlined>
    <v-list-item class="justify-start align-start d-flex">
      <!-- show details mode -->
      <v-list-item-content class="d-flex flex-column align-start justify-start align-self-start">
        <div class="overline mb-4">{{hero.id}}</div>
        <div v-if="!editorOpen">
          <v-list-item-title class="headline overflow-bw mb-1">{{ $t('details', {name: hero.name})}}</v-list-item-title>
          <p v-if="hero.description">{{hero.description}}</p>
        </div>
        <div v-if="editorOpen">
          <v-text-field v-model="cachedHero.name" dense filled label="Name"></v-text-field>
          <v-textarea v-model="cachedHero.description" dense filled label="Description"></v-textarea>
          <!-- v-textfield for img src -->
          <v-btn @click="save()">
            <v-icon>fas fa-save</v-icon>
          </v-btn>
        </div>
      </v-list-item-content>
      <!-- end content to show -->
      <!-- edit mode -->
      <div class="d-flex ml-4 flex-column">
        <v-list-item-avatar color="grey" tile size="80">
          <v-img :src="hero.imgUrl"></v-img>
        </v-list-item-avatar>
        <v-btn @click="edit()" class="my-2">
          <v-icon>fas fa-edit</v-icon>
        </v-btn>
        <delete-dialog @yes="deleteHero()" />
      </div>
      <!-- end edit mode -->
    </v-list-item>

    <!-- dialog -->

    <!-- end dialog -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteDialog from "./_subs/deleteDialog";
import {UPDATE_HERO, DELETE_HERO} from '../../store/mutations-types'
import { GET_HERO_BY_ID } from "../../store/getters-type";

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
      this.$emit('editing', this.editorOpen)
    },
    save() {
      // save in store
      this.$store.commit(UPDATE_HERO, this.cachedHero);
      // .
      this.$nextTick(() => {
        // Add the component back in
        this.editorOpen = false;
        this.$emit('editing', this.editorOpen)
      });
    },
    deleteHero() {
      this.$store.commit(DELETE_HERO, this.heroId);
      this.$emit("deleted");
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