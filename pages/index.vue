<template>
  <div class="chat">
    <div class="chat-main">
      <ul class="chat-main__list">
        <li class="chat-main__message" v-for="(message, index) in messages" :key="`message-${index}`">
          {{ message }}
        </li>
      </ul>
    </div>
    <div class="chat-footer">
      <form class="chat-footer__message-area" @submit.prevent="SendMessage">
        <input type="text" autocomplete="off" id="new-message" class="chat-footer__message-text" v-model="NewMessage">

        <button type="submit" class="chat-footer__message-submit">

        </button>
      </form>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data: () => {
      return {
        NewMessage: '',
        socket: null,
        messages: []
      }
    },
    mounted() {
      this.socket = this.$nuxtSocket({
        channel: '/'
      });

      this.socket.on('update-chat', message => {
        this.messages.push(message);
        console.log('update-chat, new message: ', message);
      });
    },
    methods: {
      SendMessage(){
        this.socket.emit('NewMessage', this.NewMessage, response => {
          console.log('response socket emit: ', response);
        });
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
  }

  .chat-main{
    width: 100%;
    height: 100%;

    padding: 64px 32px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__list{
      width: 100%;
      height: 100%;

      padding: 0;

      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 16px;
      justify-content: flex-end;
      align-content: flex-end;
      justify-items: end;
      align-items: end;


      list-style: none;
    }

    &__message{
      width: auto;
      height: auto;

      padding: 16px 24px;

      text-align: left;

      background-color: $main-color;
      border-radius: 10px;

      font-size: 20px;
      color: $main-color--dark;
      font-weight: 500;
    }
  }

  .chat-footer{
    width: 100%;
    height: 100px;

    padding: 12px 32px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    border-top: 1px solid $helper-color;

    &__message-area{
      width: 100%;
      height: 64px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      border-radius: 10px;
      border: 1px solid $helper-color;
      background-color: transparent;
      outline: none;
      overflow: hidden;
    }

    &__message-text{
      width: 100%;
      height: 64px;

      padding: 0 12px;

      font-size: 20px;
      color: $main-color--dark;
      font-weight: 500;

      border: none;
      outline: none;
      background-color: transparent;
    }

    &__message-submit{
      width: 100px;
      height: 64px;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

      border: none;
      border-left: 1px solid $helper-color;
      outline: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
</style>
