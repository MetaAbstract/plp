<template>
  <div class="chat">
    <Subjects :subjects="subjects"></Subjects>
    <div class="texts">
      <Messages :parts="parts"></Messages>
      <div class="message">
        <textarea :disabled="sending" class="message__input" v-model="draft" placeholder="Введите текст..."></textarea
        >
        <span class="message__send" @click="sendMessage">
          <img :src="require('@/assets/send.svg')" alt="&gt;" />
        </span>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
/**
 * окно чата
 * @module Chat
 * @property {number|undefined} state.subjectId - идентификтор текущеей темы с сообщениями
 * или undefined в корне роутера или при начале работы приложения
 * @property {string} state.draft - черновик сообщения текущей темы
 * @property {Array.Subject} computed.subjects - темы сообщений из состояния
 * @property {number} computed.parts - сообщения по текущей темы
 * @property {} watch.$route - отслеживает переходы роутера
 */
import { commands } from '../store/index.js'
import Subjects from './Subjects'
import Messages from './Messages'

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
        this.$store.commit(commands.mutations.setSending, true)
        setTimeout(() => {
          this.$store.commit(commands.mutations.setSending, false)
          this.$store.commit(commands.mutations.saveDraft, '')
          this.$store.commit(commands.mutations.sendMessage, this.draft)
        }, 1000)
        this.draft = ''
      }
    }
  },
  components: {
    Subjects,
    Messages
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
  computed: {
    subjects () {
      return this.$store.state.subjects
    },
    parts () {
      return this.$store.getters.getParts
    },
    sending () {
      return this.$store.state.sending
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
        this.$store.commit(commands.mutations.setLoading, true)
        setTimeout(() => this.$store.commit(commands.mutations.setLoading, false), 1000)
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
.chat {
  min-width: calc(3 * var(--left-width));
  min-height: calc(3 * var(--message-height));
  max-height: 45rem;
  overflow: visible;
}
.texts {
  float: left;
  height: 99vh;
  width: calc(var(--right-width));
  min-width: var(--left-width);
}
.clearfix {
  clear: both;
}
.message {
  height: var(--message-height);
  line-height: var(--message-height);
  min-width: 30rem;
}
.message__input {
  display: inline-block;
  height: var(--message-height);
  width: calc(var(--right-width) - var(--message-height));
  min-width: calc(30rem - - var(--message-height));
  resize: none;
  padding: 0;
  border: 0;
  border-top: 1px solid #E9EDF2;
  vertical-align: bottom
}
.message__input:focus{
  outline-width: 0px;
}
.message__send {
  display: inline-flex;
  background-color: #398bff;
  height: var(--message-height);
  width: var(--message-height);
  justify-content: center;
  align-items: center;
  vertical-align: bottom
}
</style>
