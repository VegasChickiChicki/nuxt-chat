<template>
  <div class="chat" :class="{'chat--loading': LoadingState}">
    <div class="chat__wrapper">
      <vuescroll class="chat__inner" :tagname="'div'" ref="chat-main">
        <transition-group name="chat-message" tag="ul" class="chat__list" ref="chat-main__scroll-area">
          <li class="chat-message"
              v-for="(message, index) in messages" :key="`message-${index}`"
              :class="message.user === CurrentUser ? 'chat-message--right' : 'chat-message--left'"
          >
            <div class="chat-message__head">
              <span class="chat-message__author">{{ message.user }}</span>
              <span class="chat-message__date">{{ message.date }}</span>
            </div>
            <span class="chat-message__text">{{ message.message }}</span>
          </li>
        </transition-group>
      </vuescroll>
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
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  import vuescroll from 'vuescroll';

  export default {
    name: 'index',
    components: { vuescroll },
    data: () => {
      return {
        NewMessage: '',
        CurrentUser: '',
        LoadingState: true,
      }
    },
    async mounted() {
      this.CurrentUser = this.$auth.user.login;

      if (this.messages.length === 0){
        await this.GetMessagesList();
      }

      this.socket = this.$nuxtSocket({
        channel: '/'
      });

      this.socket.emit('connect-user', {
        user: this.$auth.user.login,
      }, response => {
        this.UpdateMessages(response);
      });

      this.socket.on('update-chat', data => {
        this.UpdateMessages(data);
      });

      this.$nextTick(() => {
        this.ScrollChatDown();

        setTimeout(() => {
          this.LoadingState = false;
        }, 950)
      });
    },
    methods: {
      ...mapMutations({
        UpdateMessages: 'chats/UpdateMessages',
      }),
      ...mapActions({
        GetMessagesList: 'chats/GetMessagesList',
      }),
      async SendMessage(){
        if (this.NewMessage.length > 0){
          await this.socket.emit('new-message', {
            ChatName: 'BlueSky',
            UserName: this.$auth.user.login,
            message: this.NewMessage,
          });

          this.NewMessage = '';
        }
      },
      ScrollChatDown(){
        this.$refs['chat-main'].scrollTo({
            y: this.$refs['chat-main__scroll-area'].$el.clientHeight
          },
          475,
          'easeInCubic'
        );
      }
    },
    computed: {
      ...mapGetters({
        messages: 'chats/messages'
      })
    },
    watch: {
      messages: function () {
        this.$nextTick(() => {
          this.ScrollChatDown()
        });
      }
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

    &__wrapper{
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-self: center;

      padding: 24px 10px 24px 12px;

      overflow: hidden;
      transition: filter ease 0.35s;
    }

    &__inner{
      width: 100%;

      display: grid;
      flex-direction: column;
      align-items: center;
    }

    &__list{
      width: 100%;
      height: auto;

      padding: 0 22px 0 24px;

      display: flex;
      flex-direction: column;

      transition: opacity ease 0.35s;
      list-style: none;
    }

    &--loading{
      .chat-wrapper{
        filter: blur(16px);
        pointer-events: none;
      }

      .chat__list{
        opacity: 0;
      }

      .__bar-is-vertical{
        opacity: 0!important;
      }
    }
  }

  .chat-message{
    width: auto;
    height: auto;

    padding: 16px 24px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    text-align: left;

    background-color: $main-color;
    border-radius: 10px;

    &:not(:first-of-type){
      margin-top: 24px;
    }

    &__head{
      width: auto;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &__author, &__date{
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: $main-color--dark;
      font-weight: 400;
    }

    &__date{
      margin-left: 16px;
      font-family: 'Roboto', sans-serif;
    }

    &__text{
      font-family: 'Roboto', sans-serif;
      margin-top: 4px;

      font-size: 20px;
      color: $main-color--dark;
      font-weight: 500;
    }

    &--left{
      margin-right: auto;
    }

    &--right{
      margin-left: auto;
    }

    &-enter-active, &-leave-active {
      transition: opacity ease 0.5s;
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
  .__bar-is-vertical{
    transition: opacity ease 0.35s;
    background-color: $main-color!important;
  }

  .__view{
    //danger, can crush scroll plugin!
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
</style>
