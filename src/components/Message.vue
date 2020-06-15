<template>
  <div>{{message.text}}{{message.created}}</div>
</template>

<script>
/**
 * Сообщение в чате
 * @module Message
 * @property {Object.Message} message
 */
export default {
  props: ['message']
}
</script>

<style lang="scss" scoped></style>
