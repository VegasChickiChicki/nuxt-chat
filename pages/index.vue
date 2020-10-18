<template>
  <div class="chat">
    <div class="chat__main">

    </div>
    <div class="chat__footer">
      <label for="new-message">
        <input type="text" id="new-message">
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: () => {
      return {

      }
    },
    methods: {
      CreateRequest(){
        this.$axios.post('http://194.67.87.60:8080', {
          value: 256,
        }).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error);
        })
      },
    }
  }
</script>

<style lang="scss">
  .chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    grid-area: content;

    &__main{
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__footer{
      width: 100%;
      height: 100px;

      padding: 12px 32px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;

      border-top: 1px solid $helper-color;

      label{
        width: 100%;
        height: 64px;
      }

      input{
        width: 100%;
        height: 64px;

        padding: 0 12px;

        border-radius: 10px;
        border: 1px solid $helper-color;
        background-color: transparent;
        outline: none;

        font-size: 20px;
        color: $main-color--dark;
        font-weight: 500;
      }
    }
  }
</style>
