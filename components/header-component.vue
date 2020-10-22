<template>
  <header class="header">
    <div class="header__options">
      <button type="button" class="btn-main btn--transparent" @click="LogoutUser">Logout</button>
    </div>
    <div class="header__wrapper">
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
        <p class="site-info__version">version - 1.2.6</p>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header-component',
    data: () => {
      return {

      }
    },
    methods: {
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
      }
    }
  }
</script>
