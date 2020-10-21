<template>
	<div class="main-case login">
    <header class="header">
      <div class="header__login">
        <button type="button" class="btn-main btn--transparent" @click="ToggleLoginState(!LoginState)">Sign in</button>
        <button type="button" class="btn-main btn--transparent" @click="ToggleLoginState(!LoginState)">Sign up</button>
      </div>
      <div class="site-info">
        <p class="site-info__name">nuxt-chat</p>
        <p class="site-info__version">version - 1.1.9</p>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'login-layout',
    methods: {
      ...mapMutations({
        ToggleLoginState: 'login-page/ToggleLoginState'
      })
    },
    computed: {
      ...mapGetters({
        LoginState: 'login-page/LoginState'
      })
    }
  }
</script>

<style lang="scss">
  .login{
    .header{
      grid-column-start: 1;
      grid-column-end: -1;
    }
  }
</style>
