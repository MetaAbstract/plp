<template>
  <div class="subjects">
    <div class="message-count">
      <span class="message-count__text">Сообщений:</span>
      <span class="message-count__counter">{{ messageCount }}</span>
    </div>
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
  background-color: #F3F6F8;
}
.message-count {
  height: 3.75rem;
  line-height: 3.75rem;
  font-size: 0.875rem;
}
.message-count__text {
  display: inline-block;
  vertical-align: middle;
  color:#656B77
}
.message-count__counter {
  display: inline-block;
  vertical-align: middle;
  color:#D2D8DE;
  margin-left: 0.625rem;
}

</style>
