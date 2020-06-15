<template>
  <div class="subjects">
    <div>Сообщений: {{ messageCount }}</div>
    <Subject
      v-for="subject in subjects"
      :key="subject.id"
      :subject="subject"
    ></Subject>
  </div>
</template>

<script>
/**
 * темы сообщений
 * @module Subjects
 * @property {Array.Subject } props.subjects - массив тем
 * @property {number} computed.messageCount - количество сообщений из состояния
 */
import Subject from './Subject'
export default {
  props: ['subjects'],
  components: {
    Subject
  },
  computed: {
    messageCount () {
      return this.$store.getters.messageCount
    }
  }
}
</script>

<style>
.subjects {
  float: left;
  height: 100vh;
  width: var(--left-width);
  min-height: calc(3 * var(--subject-height));
  overflow-y: auto;
}
</style>
