<template>
  <div class="chat" :class="{'chat--loading': LoadingState}">
    <div class="chat__wrapper">
      <vuescroll class="chat__inner" :tagname="'div'" ref="chat-main">
        <transition-group name="chat-message" tag="ul" class="chat__list" ref="chat-main__scroll-area">
          <li class="chat-message"
              v-for="(message, index) in messages" :key="`message-${index}`"
              :class="message.user === UserInfo.login ? 'chat-message--right' : 'chat-message--left'"
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
          <svg-icon name="double-arrow-icon"/>
        </button>
      </form>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  import vuescroll from 'vuescroll';

  export default {
    name: 'chat',
    components: { vuescroll },
    data: () => {
      return {
        NewMessage: '',
        LoadingState: true,
      }
    },
    async mounted() {
      if (this.chats.find(el => el.name === this.$route.params.id).messages.length === 0){
        await this.GetMessagesList(this.$route.params.id);
      }

      this.socket = this.$nuxtSocket({
        channel: '/'
      });

      this.socket.on('update-chat', data => {
        this.ChatUpdateMessages({
          ChatName: this.$route.params.id,
          message: data,
        });
      });

      this.$nextTick(() => {
        this.ScrollChatDown(0);

        setTimeout(() => {
          this.LoadingState = false;
        }, 475)
      });
    },
    methods: {
      ...mapMutations({
        GetMessagesList: 'chats/GetMessagesList',
        ChatUpdateMessages: 'chats/ChatUpdateMessages',
      }),
      ...mapActions({
        GetMessagesList: 'chats/GetMessagesList',
      }),
      async SendMessage(){
        if (this.NewMessage.length > 0){
          await this.socket.emit('new-message', {
            chat: {
              name: this.$route.params.id
            },
            user: {
              name: this.UserInfo.login
            },
            message: this.NewMessage,
          });

          this.NewMessage = '';
        }
      },
      ScrollChatDown(duration = 575){
        this.$refs['chat-main'].scrollTo({
            y: this.$refs['chat-main__scroll-area'].$el.clientHeight
          },
          duration,
          'easeInQuart'
        );
      }
    },
    computed: {
      ...mapGetters({
        UserInfo: 'user/info',
        chats: 'chats/chats',
      }),
      messages(){
        return this.chats.find(el => el.name === this.$route.params.id).messages;
      }
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
