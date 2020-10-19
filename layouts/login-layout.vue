<template>
	<div class="login">
    <nuxt />
  </div>
</template>

<script>
  export default {
    name: 'login-layout'
  }
</script>

<style lang="scss">
  .login{
    width: 100%;
    height: 100%;

    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: linear-gradient(125deg, $main-color 0, $main-color--light 75%);
  }
</style>
