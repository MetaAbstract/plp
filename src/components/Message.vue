<template>
  <div>{{message.text}}{{message.created}}</div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="scss" scoped></style>
