<template>
  <div class="chat-preview">
    <div class="chat-preview__icon">

    </div>
    <div class="chat-preview__description">
      <p class="chat-preview__name">
        {{ ChatName }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chat-preview',
    props: {
      ChatName: {
        type: String,
        required: true,
      },
      ChatIconUrl: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .chat-preview{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    text-decoration: none;

    &__icon{
      width: 64px;
      height: 64px;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;
      border: 1px solid $main-color;
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

    &__name{
      margin-top: 4px;

      color: $main-color;
      font-size: 20px;
      font-weight: 500;
    }
  }
</style>
