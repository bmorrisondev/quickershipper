<template>
    <v-app>
        <MainNav />
        <div class="container">
            <router-view />
        </div>
        <div v-if="isBetaVersion">
          <BetaModal />
        </div>
    </v-app>
</template>

<script>
import MainNav from '@/components/Navbars/MainNav.vue';
import BetaModal from '@/components/BetaModal.vue';
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    components: {
        MainNav,
        BetaModal
    },
    created: function() {
        this.importSourceAddress()
    },
    computed: {
      ...mapGetters([
        'isBetaVersion'
      ])
    },
    methods: {
        ...mapActions({
            importSourceAddress: 'SourceAddressModule/importSourceAddress'
        })
    }
}
</script>


<style>
#app {
  /* background-image: linear-gradient(#F3701E, #FF9833) */
  background-color: F1F1F3;
}
/* h2 {
  padding: 20px;
}
.progress {
  height: 30px;
}
.img-logo {
  padding-top: 20px;
  display: inline !important;
}
.router-container {
  padding-top: 20px;
}
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #333;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 56px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
