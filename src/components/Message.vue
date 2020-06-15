<template>
  <div
    class="text"
    :class="{
      'text--my': messageOwner,
      'text--contact': !messageOwner
    }"
  >
    <div
      class="text__text"
      :class="{
        'text__text--my': messageOwner,
        'text__text--contact': !messageOwner
      }"
    >
      {{ message.text }}
    </div>
    <div>
      <span class="text__author">{{ message.author }}</span>
      <span class="text__created">{{ message.created }}</span>
    </div>
  </div>
</template>

<script>
/**
 * Сообщение в чате
 * @module Message
 * @property {Object.Message} message
 */
export default {
  props: ['message'],
  computed: {
    messageOwner () {
      if (this.$store.state.name === this.message.author) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style>
.text {
  margin-top: 1.25em;
  margin-left: 2.5em;
  width: 23.75rem;
}
.text--contact {
  align-self: flex-end;
  margin-right: 1em;
}
.text__text--contact {
  background-color: #e9f5f4;
}
.text__text--my {
  background-color: #f6f7f9;
}
.text__text {
  color: #475453;
  font-size: 0.875rem;
  padding: 1.25em;
}
.text__author {
  font-size: 0.875rem;
  color: #000000;
}
.text__created {
  color: #b7c0c8;
  font-size: 0.625rem;
  margin-left: 0.75rem;
}
/* надо бэм получше изучить */
.text__text--contact + div {
  text-align: end;
}
</style>
