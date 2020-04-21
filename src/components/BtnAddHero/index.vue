<template v-slot:extension>
	<v-btn @click="addHeroOrClose()" :class="{active: isAddingHero}" color="secondary" dark small absolute bottom right fab>
		<v-icon>fas fa-plus</v-icon>
	</v-btn>
</template>

<script>
import { IS_ADDING_HERO, IS_NOT_ADDING_HERO } from '../../store/types/mutations-types'
import { mapState } from 'vuex'

export default {
  methods:{
    addHeroOrClose() {
      if (!this.isAddingHero){
        this.$store.commit(IS_ADDING_HERO)
      } else {
        this.$store.commit(IS_NOT_ADDING_HERO)
      }
    }
  },
  computed: {
    ...mapState({
      isAddingHero: state => state.isAddingHero
    })
  }
}
</script>

<style scoped>
.active {
  transform: rotateZ(45deg);
  transition: all .5s;
}
</style>