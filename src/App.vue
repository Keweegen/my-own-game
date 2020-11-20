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
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

* {
  font-family: 'Nunito', sans-serif;
}

body {
  background-color: #f4f7f8;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.content {
  margin: 74px 0 34px;
  background-color: #fff;
  padding: 1rem 2rem;
  border-radius: 14px;
  box-shadow: 0 0 10px rgba(158, 176, 178, 0.12);
}

hr {
  border: 1px solid #f4f7f8;
}

.section-title {
  display: block;
  font-weight: 700;
  font-size: 1.25rem;
  padding-top: 20px;
  padding-bottom: 10px;
  color: rgba(var(--vs-dark), 1);
  text-align: center;
}
</style>
