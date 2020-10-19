<template>
  <header class="header">
    <div class="user-info">
      <div class="user-info__icon">

      </div>
      <div class="user-info__description">
        <p class="user-info__status user-info__status--active">online</p>
        <p class="user-info__name">
          Las Vegas
          <span class="user-info__id">#VegasChicki</span>
        </p>
      </div>
    </div>
    <div class="site-info">
      <p class="site-info__name">nuxt-chat</p>
      <p class="site-info__version">version - 1.1.3</p>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header-component',
    data: () => {
      return {

      }
    }
  }
</script>

<style lang="scss">
  .header{
    width: 100%;
    height: 100%;

    padding: 12px 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    grid-area: header;

    border-bottom: 0.1rem solid $helper-color;

    .user-info{
      width: auto;
    }
  }

  .site-info{
    width: auto;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    &__name{
      font-size: 24px;
      color: $main-color--dark;
      font-weight: 500;
    }

    &__version{
      margin-top: 8px;

      font-size: 16px;
      color: $main-color--dark;
      font-weight: 300;
    }
  }

  .user-info{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__icon{
      width: 64px;
      height: 64px;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;
      border: 1px solid $helper-color;
    }

    &__description{
      width: auto;
      height: auto;

      margin-left: 32px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    &__status{
      font-size: 12px;
      color: $main-color--dark;
      font-weight: 300;
    }

    &__name{
      margin-top: 4px;

      font-size: 20px;
      color: $main-color--dark;
      font-weight: 500;
    }

    &__id{
      margin-left: 4px;

      font-size: 16px;
      color: $main-color--dark;
      font-weight: 300;

      cursor: pointer;
    }
  }
</style>
