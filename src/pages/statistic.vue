<template>
  <div>
    <span class="section-title">Статистика</span>

    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th>Наименование</vs-th>
          <vs-th>Значение</vs-th>
        </vs-tr>
      </template>

      <template #tbody>
        <vs-tr v-for="(item, index) in outputData" :key="index">
          <vs-td>{{ item.label }}</vs-td>
          <vs-td>{{ item.value }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'statistic',

  computed: {
    ...mapGetters({
      info: 'statistic/info',
      outputData: 'statistic/output_data',
    }),
  },

  created() {
    this.watchAuthUser()
    if (!this.info.username) this.setUsernameInfo()
  },

  methods: {
    ...mapActions({
      setInfo: 'statistic/set_info',
    }),

    setUsernameInfo() {
      this.setInfo({ username: this.$store.state.auth.user })
    },

    watchAuthUser() {
      this.$store.watch(
        (state) => state.auth.user,
        (current) => {
          if (current) this.setUsernameInfo()
        }
      )
    },
  },
}
</script>

<style scoped></style>
