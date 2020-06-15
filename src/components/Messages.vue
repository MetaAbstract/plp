<template>
  <div class="messages-and-loader">
    <div v-if="!loading" class="messages" ref="messages">
      <Message v-for="message in parts" :key="message.id" :message="message">
      </Message>
    </div>
    <div class="loader" v-if="loading">
      <Loader></Loader>
    </div>
    <div
      class="loader"
      :style="{position:'absolute',bottom:0,left:0,opacity:0.5,backgroundColor:'grey',width:'100%',height:'100%'}"
      v-if="sending"
    >
      <Loader></Loader>
    </div>
  </div>
</template>

<script>
/**
 *

 */
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
    if (this.$refs.messages !== undefined) {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    sending () {
      return this.$store.state.sending
    }
  }
}
</script>

<style>
.messages {
  height: calc(99vh - var(--message-height));
  min-height: calc(3 * var(--message-height));
  min-width: 30rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.loader {
  height: calc(99vh - var(--message-height));
  min-height: calc(3 * var(--message-height));
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.messages-and-loader{
  position: relative;
}
</style>
