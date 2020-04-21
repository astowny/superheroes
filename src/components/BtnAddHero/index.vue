<template v-slot:extension>
	<v-btn @click="toAddHero()" color="secondary" dark small absolute bottom right fab>
		<v-icon>fas fa-plus</v-icon>
	</v-btn>
</template>

<script>
import {IS_ADDING_HERO} from '../../store/types/mutations-types'

export default {
  methods:{
    toAddHero() {
      this.$store.commit(IS_ADDING_HERO)
    }
  }
}
</script>