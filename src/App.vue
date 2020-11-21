<template>
  <div id="app">
    <TheNavbar />

    <user-dialog />

    <div class="container">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheNavbar from '@/components/TheNavbar.vue'
import UserDialog from '@/components/UserDialog.vue'

export default {
  components: { UserDialog, TheNavbar },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
}
</script>

<style lang="scss">
@import '@/assets/main';
</style>
