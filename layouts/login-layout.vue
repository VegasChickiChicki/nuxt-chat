<template>
	<div class="main-case login">
    <header class="header">
      <div class="header__wrapper">
        <div class="header__login">
          <button type="button" class="btn-main btn--transparent" @click="ToggleLoginState(false)">Sign in</button>
          <button type="button" class="btn-main btn--transparent" @click="ToggleLoginState(true)">Sign up</button>
        </div>
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
