<template>
  <header class="header">
    <div class="header__options">

      <button type="button" class="btn-main btn--transparent" @click="ToggleCreateChatPopupState(!CreateChatPopupState)">Create Chat</button>
    </div>
    <div class="header__wrapper">
      <div class="user-info">
        <div class="user-info__icon">

        </div>
        <div class="user-info__description">
          <p class="user-info__name">
            {{ UserInfo.login }}
          </p>
        </div>
      </div>
      <div class="user-settings">
        <button type="button" class="user-settings__option">
          <svg-icon name="settings-icon"/>
        </button>
        <button type="button" class="user-settings__option" @click="LogoutUser">
          <svg-icon name="logout-icon"/>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'header-component',
    methods: {
      ...mapMutations({
        ToggleCreateChatPopupState: 'ToggleCreateChatPopupState',
      }),
      async LogoutUser(){
        await this.$auth.logout('local', {
          data: {
            UserId: this.UserInfo.id
          }
        });

        this.$router.push('/login');
      },
    },
    computed: {
      ...mapGetters({
        UserInfo: 'user/info',
        CreateChatPopupState: 'CreateChatPopupState'
      })
    }
  }
</script>
