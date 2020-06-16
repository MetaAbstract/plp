<template>
  <router-link class="subject" :class="{'subject--current':isCurrent}" :to="{name:'Subject',params:{subjectId:this.subject.id}}" tag="div" >
      <div class="subject__created">{{new Date(this.subject.created) | moment("ll")}}</div>
      <div class="subject__text">{{this.subject.subject}}</div>
   </router-link>
</template>

<script>
/**
 * компонент темы сообщенийa
 * @module Subject
 */

export default {
  props: ['subject'],
  computed: {
    isCurrent () {
      return this.subject.id === this.$store.state.subjectId
    }
  }
}
</script>

<style>
.subject {
  padding-left:1.475rem;
  padding-right: 1.25rem;
  border-top: 1px solid #E9EDF2;;
}
.subject--current{
  background-color: #FFFFFF;
}
.subject__created {
  margin-top:1.25rem;
  text-align: right;
  font-size: 0.625rem;
  color:#7D8790;
}
.subject__text {
  font-size:0.8125rem;
  /* height: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;*/
  padding-bottom: 1.25rem;
}
</style>
