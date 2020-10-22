<template>
  <div class="chat">
    <div class="chat-main">
      <vue-custom-scrollbar class="chat-main__list" :settings="ScrollAreaSettings" :tagname="'ul'">
        <li class="chat-main__message" v-for="(message, index) in messages" :key="`message-${index}`">
          {{ message }}
        </li>
      </vue-custom-scrollbar>
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
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import "vue-custom-scrollbar/dist/vueScrollbar.css"

  export default {
    name: 'index',
    components: { vueCustomScrollbar },
    data: () => {
      return {
        NewMessage: '',
        socket: null,
        messages: [],
        ScrollAreaSettings: {
          suppressScrollY: false,
          suppressScrollX: true,
          wheelPropagation: false
        }
      }
    },
    mounted() {
      this.socket = this.$nuxtSocket({
        channel: '/'
      });

      this.socket.on('update-chat', message => {
        this.messages.push(message);
      });

      this.socket.emit('connect-user', this.$auth.user.login, response => {
        this.messages.push(response);
      });
    },
    methods: {
      SendMessage(){
        this.socket.emit('new-message', this.NewMessage, response => {
          console.log('new-message response: ', response);
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

    padding: 16px 8px 32px 32px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    overflow: hidden;

    &__list{
      width: 100%;
      height: auto;

      padding: 0 48px 0 24px;

      display: flex;
      flex-direction: column;
      align-items: flex-end;

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

      &:not(:first-of-type){
        margin-top: 24px;
      }
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

<style lang="scss">
  .ps .ps__rail-x:hover,
  .ps .ps__rail-y:hover,
  .ps .ps__rail-x:focus,
  .ps .ps__rail-y:focus,
  .ps .ps__rail-x.ps--clicking,
  .ps .ps__rail-y.ps--clicking {
    background-color: transparent;
    opacity: 1;
  }

  .ps__thumb-y {
    background-color: $helper-color;
    opacity: 0.5;
    border-radius: 6px;
    cursor: pointer;
  }

  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: $helper-color;
  }

  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    opacity: 1;
    width: 12px;
  }
</style>
