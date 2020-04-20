<template>
  <v-card class="mx-auto" max-width="90%" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{hero.id}}</div>
        <div v-if="!showEdit">
          <v-list-item-title class="headline mb-1">{{ $t('details', {name: hero.name})}}</v-list-item-title>
          <p>{{hero.description}}</p>
        </div>
        <div v-if="showEdit">
          <v-text-field v-model="cachedHero.name" dense filled label="Name"></v-text-field>
          <v-textarea v-model="cachedHero.description" dense filled label="Description"></v-textarea>
          <!-- v-textfield for img src -->
          <v-btn @click="save()">
            <v-icon>fas fa-save</v-icon>
          </v-btn>
        </div>
      </v-list-item-content>

      <div class="d-flex ml-4 flex-column">
        <v-list-item-avatar color="grey" tile size="80">
          <v-img :src="hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension"></v-img>
        </v-list-item-avatar>
        <v-btn class="my-2" @click="edit()">
          <v-icon>fas fa-edit</v-icon>
        </v-btn>
        <v-btn class="my-2">
          <v-icon>fas fa-eraser</v-icon>
        </v-btn>
      </div>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "HeroDetail",
  props: {
    heroId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cachedHero: null,
      showEdit: false
    };
  },
  methods: {
    edit() {
      // copy the hero
      if (!this.cachedHero) {
        this.cachedHero = JSON.parse(JSON.stringify(this.hero));
      }
      this.showEdit = !this.showEdit;
    },
    save() {
      // save in store
      this.$store.commit('updateHero', this.cachedHero)
      // .
      this.$nextTick(() => {
          // Add the component back in
          this.showEdit = false;
        });
    }
  },
  computed: {
    ...mapGetters(['getHeroById']),
    hero() {
      return this.getHeroById(this.heroId)
    }
  }
};
</script>

<style scoped>
</style>