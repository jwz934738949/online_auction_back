<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html, body {
    height: 100%;
    overflow: hidden;
    background-color: #272D2F;
  }
</style>
