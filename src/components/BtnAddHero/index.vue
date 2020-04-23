<template v-slot:extension>
	<v-btn @click="addHeroOrClose()" :class="{active: stateApp}" :color="stateApp ? 'info' : 'secondary'" dark small absolute top right fab>
		<v-icon>fas fa-plus</v-icon>
	</v-btn>
</template>

<script>
import { SET_STATE_APP } from '../../store/types/mutations-types'
import { mapState } from 'vuex'

export default {
  methods:{
    addHeroOrClose() {
      if (!this.stateApp){
        this.$store.commit(SET_STATE_APP, 'ADD')
      } else {
        this.$store.commit(SET_STATE_APP, '')
      }
    }
  },
  computed: {
    ...mapState(['stateApp'])
  }
}
</script>

<style scoped>
.active {
  transform: rotateZ(45deg);
  transition: all .5s;
}
</style>