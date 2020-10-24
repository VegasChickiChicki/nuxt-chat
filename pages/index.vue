<template>
  <div class="home">
    <div class="home__wrapper">
      <h1 class="home__title">Welcome to Nuxt-chat!</h1>
      <p class="home__content">If you want to start a chatting, you just need to join the chat. The chat list is
        located in the left sidebar. If the chat list is empty, you can create your own chat or find and join existing
        chats.
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
  }
</script>

<style lang="scss">
  .home{
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    &__wrapper{
      width: auto;
      height: auto;

      padding-top: 180px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__title, &__content{
      color: $main-color--dark;
      text-align: center;
    }

    &__title{
      font-size: 64px;
      font-weight: 500;
      color: $main-color--dark;
    }

    &__content{
      max-width: 800px;
      margin-top: 48px;

      font-size: 24px;
      font-weight: 400;
      line-height: 1.5;
    }
  }
</style>
