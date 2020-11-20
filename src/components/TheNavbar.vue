<template>
  <vs-navbar center-collapsed v-model="active">
    <vs-navbar-item :to="{ name: 'game' }" :active="active === 'game'" id="game">
      Игра
    </vs-navbar-item>

    <vs-navbar-item :to="{ name: 'statistic' }" :active="active === 'statistic'" id="statistic">
      Статистика
    </vs-navbar-item>
  </vs-navbar>
</template>

<script>
export default {
  name: 'TheNavbar',

  data() {
    return {
      active: this.$route.name,
    }
  },
}
</script>

<style scoped></style>
