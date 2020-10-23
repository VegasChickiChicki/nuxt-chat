<template>
  <header class="header">
    <div class="header__options">
      <button type="button" class="btn-main btn--transparent" @click="LogoutUser">Logout</button>
      <button type="button" class="btn-main btn--transparent" @click="ToggleCreateChatPopupState(!CreateChatPopupState)">Create Chat</button>
    </div>
    <div class="header__wrapper">
      <div class="user-info">
        <div class="user-info__icon">

        </div>
        <div class="user-info__description">
          <p class="user-info__status user-info__status--active">online</p>
          <p class="user-info__name">
            {{ CurrentUser }}
            <span class="user-info__id">#{{ CurrentUser }}</span>
          </p>
        </div>
      </div>
      <div class="site-info">
        <p class="site-info__name">nuxt-chat</p>
        <p class="site-info__version">version - 1.2.7</p>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'header-component',
    data: () => {
      return {
        CurrentUser: ''
      }
    },
    mounted() {
      this.CurrentUser = this.$auth.user.login;
    },
    methods: {
      ...mapMutations({
        ToggleCreateChatPopupState: 'ToggleCreateChatPopupState',
      }),
      async LogoutUser(){
        try {
          this.socket = this.$nuxtSocket({
            channel: '/'
          });

          this.socket.emit('disconnect-user', {
            user: this.$auth.user.login,
          }, response => {
            console.log('connect-user response: ', response);
            this.messages.push(response);
          });

          await this.$auth.logout('local', {
            data: {
              UserId: this.$auth.user.id
            }
          });

          this.$router.push('/login');
        } catch (error) {
          console.log(error);
        }
      },
    },
    computed: {
      ...mapGetters({
        CreateChatPopupState: 'CreateChatPopupState'
      })
    }
  }
</script>
