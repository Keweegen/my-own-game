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
        <vs-tr>
          <vs-td>Имя</vs-td>
          <vs-td>{{ info.username }}</vs-td>
        </vs-tr>

        <vs-tr>
          <vs-td>Всего игр</vs-td>
          <vs-td>{{ info.count_games }}</vs-td>
        </vs-tr>

        <vs-tr>
          <vs-td>Правильных ответов</vs-td>
          <vs-td>{{ info.count_correct_answers }}</vs-td>
        </vs-tr>

        <vs-tr>
          <vs-td>Неправильных ответов</vs-td>
          <vs-td>{{ info.count_wrong_answers }}</vs-td>
        </vs-tr>

        <vs-tr>
          <vs-td>Баллы</vs-td>
          <vs-td>{{ info.points }}</vs-td>
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
