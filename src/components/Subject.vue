<template>
  <router-link :to="{name:'Subject',params:{subjectId:this.subject.id}}" tag="div">
      {{this.subject.subject}}
   </router-link>
</template>

<script>
/**
 * компонент темы сообщений
 * @module Subject
 */

export default {
  props: ['subject']
}
</script>

<style lang="scss" scoped>

</style>
