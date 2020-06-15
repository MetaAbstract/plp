<template>
      <div class="messages" ref="messages">
        <Message v-for="message in parts" :key="message.id" :message="message">
        </Message>
        <Loader></Loader>
      </div>
</template>

<script>
/**
 * отправленные и полученные сообщения
 * @module Messages
 * @property {Array.Message} props.parts - массив сообщений
 */
import Message from './Message'
import Loader from './Loader'
export default {
  props: ['parts'],
  components: {
    Loader,
    Message
  },
  updated () {
    // прокрутим вниз до последнего сообщенияю получилась фича
    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
  }
}
</script>

<style>
.messages {
  height: calc(100vh - var(--message-height));
  min-height: calc(3 * var(--message-height));
  overflow-y: auto;
}
</style>
