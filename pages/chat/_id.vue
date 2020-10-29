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
    <div class="chat__helper-stage">
      <transition name="chat-message">
        <div class="chat-message chat-message--helper" v-if="WritingUser.length > 0 && UserInfo.login !== WritingUser">
          <span class="chat-message__text">
            {{ this.WritingUser }} is typing a message...
          </span>
        </div>
      </transition>
    </div>
    <div class="chat-footer">
      <form class="chat-footer__message-area" @submit.prevent="SendMessage">
        <input type="text" autocomplete="off" id="new-message" class="chat-footer__message-text"
               @focus="UserStartWriting"
               @blur="UserStopWriting"
               v-model="NewMessage"
        >
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
        WritingUser: '',
      }
    },
    async mounted() {
      if (this.ChatsList.find(el => el.name === this.$route.params.id) !== undefined){
        if (this.ChatsList.find(el => el.name === this.$route.params.id).hasOwnProperty('messages')){
          if (this.ChatsList.find(el => el.name === this.$route.params.id).messages.length === 0){
            await this.GetMessagesList(this.$route.params.id);
          }

          this.socket = this.$nuxtSocket({
            channel: `/`
          });

          this.socket.emit('join-in-chat', {
            chat: {
              name: this.$route.params.id
            },
            user: {
              name: this.UserInfo.login
            }
          });

          this.socket.on('update-chat', data => {
            this.ChatUpdateMessages({
              ChatName: this.$route.params.id,
              message: data,
            });
          });

          this.socket.on('update-writing-user', data => {
            this.WritingUser = data.user;
          });
        }
      }

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
      UserStartWriting(){
        this.socket.emit('user-start-writing', {
          chat: {
            name: this.$route.params.id
          },
          user: {
            name: this.UserInfo.login
          },
        });
      },
      UserStopWriting(){
        this.socket.emit('user-stop-writing', {
          chat: {
            name: this.$route.params.id
          },
          user: {
            name: this.UserInfo.login
          },
        });
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
        ChatsList: 'chats/list',
      }),
      messages(){
        if (this.ChatsList.find(el => el.name === this.$route.params.id) !== undefined){
          if (this.ChatsList.find(el => el.name === this.$route.params.id).hasOwnProperty('messages')){
            return this.ChatsList.find(el => el.name === this.$route.params.id).messages;
          }
        }

        return [];
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
