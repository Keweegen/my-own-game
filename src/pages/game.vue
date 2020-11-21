<template>
  <div>
    <vs-row justify="center">
      <vs-button v-if="!statusGame" @click="setStartGame">Начать игру</vs-button>
    </vs-row>

    <template v-if="statusGame">
      <div class="user-info">
        <vs-row justify="space-between">
          <vs-col w="3">
            <span><b>Имя: </b> {{ user }}</span>
          </vs-col>

          <vs-col w="3">
            <div class="user-info-points">
              <b>Баллы:</b>
              {{ $store.state.statistic.info.points }}
              <span :class="['points-per-game', pointsPerGame >= 0 ? 'is-success' : 'is-danger']">
                ({{ pointsPerGame >= 0 ? `+${pointsPerGame}` : pointsPerGame }})
              </span>
            </div>
          </vs-col>
        </vs-row>
      </div>

      <table-questions
        :count-themes="5"
        :count-questions="5"
        :offset-themes="100"
        @set-theme="setCurrentTheme"
        @set-question="setCurrentQuestion"
      />

      <vs-row justify="center" class="footer-buttons">
        <vs-button @click="setStopGame" transparent>Закончить игру</vs-button>
      </vs-row>

      <question-dialog
        v-model="questionAnswer"
        :dialog="questionDialog"
        :question="currentQuestion"
        :timer="timer"
        @close="closeDialog"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QuestionDialog from '@/components/QuestionDialog.vue'
import TableQuestions from '@/components/TableQuestions.vue'

export default {
  name: 'game',
  components: { TableQuestions, QuestionDialog },
  data() {
    return {
      defaultTimer: 60,
      timer: 60,
      questionInterval: null,
      questionDialog: false,
      questionAnswer: null,
      currentQuestion: {},
      currentTheme: null,
    }
  },

  watch: {
    questionAnswer(value) {
      !!Object.keys(this.currentQuestion).length &&
        value.toLowerCase() === this.currentQuestionAnswer &&
        this.setQuestion(true)
    },

    timer(value) {
      value <= 0 && this.setQuestion(false)
    },
  },

  computed: {
    ...mapGetters({
      statusGame: 'game/status_game',
      pointsPerGame: 'game/points_per_game',
      user: 'auth/user',
    }),

    currentQuestionAnswer() {
      return this.currentQuestion?.answer.toLowerCase().replace(/(<([^>]+)>)/gi, '') || false
    },
  },

  beforeDestroy() {
    this.questionInterval && clearInterval(this.questionInterval)
  },

  methods: {
    ...mapActions({
      startGame: 'game/start_game',
      stopGame: 'game/stop_game',
      setPoints: 'game/set_points',
      addAnsweredQuestion: 'game/add_answered_question',
      addCorrectAnswer: 'statistic/add_correct_answer',
      addWrongAnswer: 'statistic/add_wrong_answer',
    }),

    setStartGame() {
      this.startGame()
    },

    setStopGame() {
      this.stopGame()
    },

    isAnsweredQuestion(id) {
      return this.$store.getters['game/is_answered_question'](id)
    },

    setCurrentTheme(theme) {
      this.currentTheme = theme
    },

    setCurrentQuestion(question) {
      this.currentQuestion = question
      this.questionDialog = true

      console.log(`${question.question}:`, question.answer)

      this.questionInterval = setInterval(() => {
        this.timer -= 1
      }, 1000)
    },

    closeDialog(wrong = false) {
      if (wrong) {
        this.setWrongAnswer()

        this.setPoints({ value: this.currentQuestion.value, status: false })
        this.addAnsweredQuestion({ id: this.currentQuestion.id, status: false })
      }

      this.questionDialog = false
      this.currentQuestion = {}
      this.questionAnswer = null

      clearInterval(this.questionInterval)
      this.timer = this.defaultTimer
    },

    setQuestion(status = true) {
      status ? this.setCorrectAnswer() : this.setWrongAnswer()

      this.setPoints({ value: this.currentQuestion.value, status })
      this.addAnsweredQuestion({ id: this.currentQuestion.id, status })

      this.closeDialog()
    },

    setCorrectAnswer() {
      this.$vs.notification({
        progress: 'auto',
        color: 'success',
        text: 'Поздравляем! Вы успешно ответили на вопрос',
      })

      this.addCorrectAnswer()
    },

    setWrongAnswer() {
      this.$vs.notification({
        progress: 'auto',
        color: 'danger',
        text: 'К сожалению, Вам не удалось правильно ответить на вопрос',
      })

      this.addWrongAnswer()
    },
  },
}
</script>

<style scoped lang="scss">
.user-info {
  margin-bottom: 20px;
  padding: 0 5px;

  &-points {
    text-align: right;
  }
}

.points-per-game {
  &.is-danger {
    color: rgba(var(--vs-danger), 1);
  }

  &.is-success {
    color: rgba(var(--vs-success), 1);
  }
}

.footer-buttons {
  margin-top: 40px;
}
</style>
