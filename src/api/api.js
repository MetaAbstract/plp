/**
 * Имитация вызовов api
 * @module api
 */
import history from './fixture'
/**
 * @typedef {Object} Message - сообщение
 * @property {number} id - идентификатор сообщения
 * @property {string} author - автор сообщения
 * @property {string} created - YYYY-MM-DD HH:MM время создания сообщения
 * @property {string} text - содержания сообщений
 */
/**
 * @typedef {Object} Subject - обсуждение
 * @property {string} id - идентификтор обсуждения
 * @property {string} subject - тема обсуждения
 * @property {string} created - YYYY-MM-DD HH:MM время создания темы
 */

/**
 * Возвращает список тем с задержкой Promise
 * @function loadHistory
 * @returns {Subject[]} - массив диалогов
 */
export const loadHistory = () => new Promise((resolve, reject) => {
  const delay = parseInt(Math.random() * 1000)
  setTimeout(() => {
    resolve(history)
  }, delay)
})

/**
 * Отправляет новое сообщение Promise
 * @function sendMessage
 * @param {string} message - сообщение для отправки
 * @returns {boolean} - true с задержкой как отправит
 */
export const sendMessage = (message) => {
  return new Promise((resolve, reject) => {
    console.log(message + ' sendMessage')
    const delay = parseInt(Math.random() * 1000)
    setTimeout(() => {
      resolve(true)
    }, delay)
  })
}
