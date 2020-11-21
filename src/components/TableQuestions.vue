<template>
  <div class="table-questions">
    <div class="table-questions-themes" v-if="!!themes.length && !fetchThemes">
      <vs-row justify="center">
        <vs-col w="12"><span class="section-title">Выберите тему</span></vs-col>

        <vs-col w="2" v-for="theme in themes" :key="theme.id">
          <div
            :class="['table-questions-theme-item', { 'is-active': isActiveTheme(theme) }]"
            @click="setCurrentTheme(theme.id)"
          >
            {{ theme.title }}
          </div>
        </vs-col>
      </vs-row>
    </div>

    <div
      class="table-questions-list"
      v-if="!!currentTheme && !!questions.length && !fetchQuestions"
    >
      <hr />

      <vs-row justify="center">
        <vs-col w="12"><span class="section-title">Выберите ставку</span></vs-col>

        <vs-col w="2" v-for="question in questions" :key="question.id">
          <div class="table-questions-list-item" @click="setCurrentQuestion(question.id)">
            {{ question.value }}
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TableQuestions',

  props: {
    countThemes: {
      type: Number,
      default: 5,
    },

    offsetThemes: {
      type: Number,
      default: 0,
    },

    countQuestions: {
      type: Number,
      default: 5,
    },

    offsetQuestions: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      loadingThemes: null,
      loadingQuestions: null,
      currentQuestion: {},
      currentTheme: null,
    }
  },

  watch: {
    currentTheme(value) {
      value &&
        this.getQuestions({
          category: value.id,
          count: this.countQuestions,
          offset: this.offsetQuestions,
        })
    },

    fetchThemes(value) {
      if (value) {
        this.loadingThemes = this.$vs.loading()
      } else {
        this.loadingThemes.close()
      }
    },

    fetchQuestions(value) {
      if (value) {
        this.loadingQuestions = this.$vs.loading()
      } else {
        this.loadingQuestions.close()
      }
    },
  },

  computed: {
    ...mapGetters({
      themes: 'game/themes',
      questions: 'game/questions',
      fetchThemes: 'game/fetching_themes',
      fetchQuestions: 'game/fetching_questions',
    }),
  },

  created() {
    this.getThemes({ count: this.countThemes, offset: this.offsetThemes })
  },

  methods: {
    ...mapActions({
      getThemes: 'game/get_themes',
      getQuestions: 'game/get_questions',
    }),

    setCurrentTheme(id) {
      this.currentTheme = this.$store.getters['game/theme'](id)

      this.$emit('set-theme', this.currentTheme)
    },

    setCurrentQuestion(id) {
      if (this.isAnsweredQuestion(id)) {
        return
      }

      this.currentQuestion = this.$store.getters['game/question'](id)

      this.questionInterval = setInterval(() => {
        this.timer -= 1
      }, 1000)

      this.$emit('set-question', this.currentQuestion)
    },

    isAnsweredQuestion(id) {
      return this.$store.getters['game/is_answered_question'](id)
    },

    isActiveTheme(theme) {
      return this.currentTheme?.id === theme.id && !!this.questions.length
    },
  },
}
</script>

<style scoped lang="scss">
.table-questions {
  &-theme-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 14px;
    text-align: center;
    box-shadow: 0 0 10px rgba(158, 176, 178, 0.3);
    padding: 0.75rem 1rem;
    margin: 5px;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease;
    font-size: 0.9rem;
    height: 75px;

    &:hover,
    &.is-active {
      background: #f4f7f8;
    }
  }

  &-list {
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 14px;
      text-align: center;
      padding: 0.75rem 1rem;
      box-shadow: 0 0 10px rgba(158, 176, 178, 0.3);
      margin: 5px;
      cursor: pointer;
      transition: background 0.25s ease, color 0.25s ease;
      font-size: 0.9rem;

      &:hover {
        background: #f4f7f8;
      }
    }
  }
}
</style>
