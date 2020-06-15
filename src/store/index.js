/**
 * состояние приложения
 * @module store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api/api'

Vue.use(Vuex)
function yyyymmddhhmm () {
  const now = new Date()
  const year = '' + now.getFullYear()
  let month = '' + (now.getMonth() + 1)
  if (month.length === 1) {
    month = '0' + month
  }
  let day = '' + now.getDate()
  if (day.length === 1) {
    day = '0' + day
  }
  let hour = '' + now.getHours()
  if (hour.length === 1) {
    hour = '0' + hour
  }
  let minute = '' + now.getMinutes()
  if (minute.length === 1) {
    minute = '0' + minute
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
}
export const commands = {
  actions: {
    loadHistory: 'loadHistory'
  },
  mutations: {
    setSubjects: 'setSubjects',
    setSubjectId: 'setSubjectId',
    sendMessage: 'sendMessage',
    saveDraft: 'saveDraft',
    setLoading: 'setLoading',
    setSending: 'setSending'
  }
}
/**
 * @typedef {Object} Subject - обсуждение
 * @property {string} id - идентификтор обсуждения
 * @property {string} subject - тема обсуждения
 * @property {string} created - YYYY-MM-DD HH:MM время создания темы
 * @property {string} draft - черовик нового сообщения
 * @property {Array.Message} parts - сообщения по теме
 */
/**
 * @typedef {Object} Message - сообщение
 * @property {number} id - идентификатор сообщения
 * @property {string} author - автор сообщения
 * @property {string} created - YYYY-MM-DD HH:MM время создания сообщения
 * @property {string} text - содержания сообщений
 */

/**
 * @name state
 * @property {Object} state
 * @property {string} name - имя пользователя чата
 * @property {Array.Subjects} state.subjects - обсуждений
 * @property {number|undefined} state.subjectId - текущая тема, чтобы геттер
 * был реактивным
 * @property {boolean} state.loading - флаг загрузки сообщений темы для отработки в интерфейсе
 * @property {boolean} state.sending - флаг отправки сообщения для отработки в интерфейсе
 * @property {function} mutations.setSubjects - загружает начальные данные по условному апи
 * @property {function} mutations.setSubjectId - устанавливает текущую тему
 * @property {function} mutations.sendMessage - отправляет сообщение
 * @property {function} mutations.saveDraft - сохраняет черновик сообщения для темы
 * @property {function} actions.loadHistory - загрузить историю сообщений из апи
 * @property {function} getters.messageCount - считает количество сообщений по всем темам
 * @property {function} getters.getParts - получает сообщения для state.subjectId
 * @property {function} getters.getDraft - получает драфт сообщения по идентификатору темы
 */
export default new Vuex.Store({
  state: {
    name: 'Артем',
    subjectId: undefined,
    subjects: [],
    historyLoaded: false,
    loading: false,
    sending: false
  },
  mutations: {
    setSubjects (state, subjects) {
      state.subjects = [...subjects]
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setSending (state, sending) {
      state.sending = sending
    },
    setSubjectId (state, subjectId) {
      state.subjectId = subjectId
    },
    sendMessage (state, message) {
      const subject = state.subjects.find(
        subject => subject.id === state.subjectId
      )
      subject.parts = [
        ...subject.parts,
        {
          id: subject.parts.length + 2,
          author: state.name,
          text: message,
          created: yyyymmddhhmm()
        }
      ]
    },
    saveDraft (state, draft) {
      const subject = state.subjects.find(
        subject => subject.id === state.subjectId
      )
      subject.draft = draft
    }
  },
  actions: {
    loadHistory () {
      api.loadHistory().then(subjects => {
        const subjectState = subjects.map(subject => {
          return { ...subject, draft: '' }
        })
        this.commit(commands.mutations.setSubjects, subjectState)
      })
    }
  },
  getters: {
    messageCount (state) {
      return state.subjects.reduce(
        (count, subject) => count + subject.parts.length,
        0
      )
    },
    getParts (state) {
      if (state.subjectId === undefined) {
        return []
      } else {
        const subject = state.subjects.find(
          subject => subject.id === state.subjectId
        )
        if (subject === undefined) {
          // реактивно вернет как история загрузиться по идее надо отслеживать
          // console.error('store getters getParts: unexpected subjectId ' + state.subjectId)
          return []
        } else {
          return [...subject.parts]
        }
      }
    },
    getDraft: (state) => (subjectId) => {
      const subject = state.subjects.find(
        subject => subject.id === subjectId
      )
      if (subject === undefined) {
        return ''
      } else {
        return subject.draft
      }
    }
  }
})
