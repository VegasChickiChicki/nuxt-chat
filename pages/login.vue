<template>
  <form class="login-form" @submit.prevent>
    <p class="login-form__title">Авторизация</p>
    <input type="text" id="name" autocomplete="off" class="input-text">
    <input type="text" id="password" autocomplete="off" class="input-text">
    <button type="submit" class="btn-main btn--transparent">login</button>
  </form>
</template>

<script>
  export default {
    name: 'login',
    layout: 'login-layout'
  }
</script>

<style lang="scss">
  .login-form{
    width: auto;
    height: 320px;

    padding: 24px 48px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr;
    grid-row-gap: 24px;
    align-content: flex-start;

    border: 1px solid $helper-color;
    border-radius: 10px;

    &__title{
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: $main-color--dark;
    }

    .btn-main{
      align-self: flex-end;
    }
  }
</style>
