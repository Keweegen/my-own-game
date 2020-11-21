<template>
  <vs-dialog :value="dialog" @close="$emit('close', true)" prevent-close blur>
    <div class="con-content" v-if="!!Object.keys(question).length">
      <p><b>Тема:</b> {{ question.category.title }}</p>
      <p><b>Вопрос:</b> {{ question.question }}</p>
      <p><b>Ставка:</b> {{ question.value }}</p>

      <vs-input
        label="Ответ"
        placeholder="Введите ответ"
        :disabled="!timer"
        :value="value"
        @input="$emit('input', $event)"
      />

      <p class="timer">
        Осталось <b>{{ timer }}</b> сек.
      </p>
    </div>
  </vs-dialog>
</template>

<script>
export default {
  name: 'QuestionDialog',

  props: {
    value: {
      type: String,
    },

    dialog: {
      type: Boolean,
      required: true,
    },

    question: {
      type: Object,
      required: true,
    },

    timer: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.timer {
  font-size: 0.75rem;
  color: rgba(var(--vs-primary), 1);
  text-align: center;
  margin-bottom: 0;
}
</style>
