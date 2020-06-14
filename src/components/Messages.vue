<template>
  <div class="container">
    <div class="subjects">
      <div>Сообщений: {{ messageCount }}</div>
      <Subject
        v-for="subject in this.subjects"
        :key="subject.id"
        :subject="subject"
      ></Subject>
    </div>
    <div class="messages">
      <div class="texts" ref="texts">
        <Message v-for="message in parts" :key="message.id" :message="message">
        </Message>
        <Loader></Loader>
      </div>
      <div class="message">
        <textarea v-model="draft"></textarea
        ><img
          :src="require('@/assets/send.svg')"
          alt="&gt;"
          @click="sendMessage"
        />
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
/**
 * окно чата
 * @module Messages
 * @property {number|undefined} state.subjectId - идентификтор текущеей темы с сообщениями
 * или undefined в корне роутера или при начале работы приложения
 * @property {string} state.draft - черновик сообщения текущей темы
 * @property {Array.Subject} computed.subjects - темы сообщений из состояния
 * @property {number} computed.messageCount - количество сообщений из состояния
 * @property {number} computed.parts - сообщения по текущей темы
 * @property {} watch.$route - отслеживает переходы роутера
 */
import { commands } from '../store/index.js'
import Subject from './Subject'
import Message from './Message'
import Loader from './Loader'

export default {
  data: function () {
    return {
      subjectId: undefined,
      draft: ''
    }
  },
  methods: {
    sendMessage () {
      if (this.draft.trim().length > 0) {
        this.$store.commit(commands.mutations.saveDraft, '')
        this.$store.commit(commands.mutations.sendMessage, this.draft)
        this.draft = ''
      }
    }
  },
  components: {
    Subject,
    Message,
    Loader
  },
  created () {
    // загрузим историю сообщений
    this.$store.dispatch(commands.actions.loadHistory)
    // если открыли ссылку с темой сразу, то попробуем ее прочитать
    if (this.$route.name === 'Subject') {
      this.subjectId = Number.parseInt(this.$route.params.subjectId)
      this.$store.commit(
        commands.mutations.setSubjectId,
        Number.parseInt(this.$route.params.subjectId)
      )
    }
  },
  updated () {
    // прокрутим вниз до последнего сообщенияю получилась фича
    this.$refs.texts.scrollTop = this.$refs.texts.scrollHeight
  },
  computed: {
    subjects () {
      return this.$store.state.subjects
    },
    messageCount () {
      return this.$store.getters.messageCount
    },
    parts () {
      return this.$store.getters.getParts
    }
  },
  watch: {
    $route (to, from) {
      if (from.name === 'Subject') {
        if (this.draft.trim().length > 0) {
          this.$store.commit(commands.mutations.saveDraft, this.draft)
          this.draft = ''
        }
      }
      if (to.name === 'Subject') {
        this.subjectId = Number.parseInt(to.params.subjectId)
        this.draft = this.$store.getters.getDraft(this.subjectId)
        this.$store.commit(
          commands.mutations.setSubjectId,
          Number.parseInt(to.params.subjectId)
        )
      } else if (to.name === 'Messages' || to.name === 'Default') {
        this.subjectId = undefined
        this.$store.commit(commands.mutations.setSubjectId, undefined)
      }
    }
  }
}
</script>

<style>
.container {
  min-width: calc(2 * var(--left-width));
  min-height: calc(3 * var(--message-height));
  overflow: visible;
}
.subjects {
  float: left;
  height: 100vh;
  width: var(--left-width);
  min-height: calc(3 * var(--subject-height));
  overflow-y: auto;
}
.messages {
  float: right;
  height: 100vh;
  width: calc(var(--right-width));
  min-width: var(--left-width);
}
.clearfix {
  clear: both;
}
.texts {
  height: calc(100vh - var(--message-height));
  min-height: calc(3 * var(--message-height));
  overflow-y: auto;
}
.message {
  height: var(--message-height);
}
</style>
