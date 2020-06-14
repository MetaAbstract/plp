<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  box-sizing: border-box;
  --left-width:18.75rem;
  --right-width:calc(100vw - var(--left-width) - 15px);/* 15px браузер забирает под скроллбар*/
  --message-height:4.9375rem;
  --subject-height:6.25rem;
  --break-point-width: calc(2 * var(--left-width));
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
body {
  margin: 0rem;
}
</style>
