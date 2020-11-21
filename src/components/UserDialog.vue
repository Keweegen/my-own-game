<template>
  <vs-dialog v-model="userDialog" v-if="!user" not-close prevent-close blur>
    <template #header>
      <h4 class="not-margin">Добро пожаловать. Какое у вас <b>Имя</b>?</h4>
    </template>

    <div class="con-content">
      <vs-input v-model.trim="username" placeholder="Введите свое имя" label="Имя">
        <template #message-danger>
          <template v-if="!$v.username.required">Поле обязательно для заполнения</template>
          <template v-if="!$v.username.minLength">Мин. кол-во символов должно быть - 2</template>
        </template>
      </vs-input>
    </div>

    <template #footer v-if="!$v.$invalid">
      <div class="con-footer">
        <vs-button @click="setUsername" transparent>Продолжить</vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserDialog',

  data() {
    return {
      username: null,
      userDialog: false,
    }
  },

  validations: {
    username: {
      required,
      minLength: minLength(2),
    },
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  created() {
    this.userDialog = !this.user
  },

  methods: {
    ...mapActions({
      setUser: 'auth/set_user',
    }),

    setUsername() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.setUser(this.username)
        this.userDialog = false
      }
    },
  },
}
</script>
