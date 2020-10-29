<template>
	<aside class="user-profile">
    <div class="user-profile__head">
      <div class="user-profile__settings">
        <button type="button" class="btn-main btn--transparent">
          settings
        </button>
        <button type="button" class="btn-main btn--transparent" @click="LogoutUser">
          logout
        </button>
      </div>
    </div>
    <div class="user-profile__content">
      <div class="user-profile__image">

      </div>
      <div class="user-profile__info">
        <p class="user-profile__name">{{ UserInfo.login }}</p>
      </div>
    </div>
  </aside>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'user-profile-component',
    data: () => {
      return {

      }
    },
    methods: {
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
      }),
    }
  }
</script>

<style lang="scss">
  .user-profile{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    grid-area: user-profile;

    border-left: 1px solid $main-color;

    &__head{
      width: 100%;
      height: 100px;

      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &__settings{
      width: 100%;
      height: 100px;

      display: flex;
      justify-content: center;
      align-items: center;

      .btn-main{
        width: 50%;
        height: 100%;

        border-top: none;

        font-size: 24px;

        &:nth-of-type(1){
          border-left: none;
        }

        &:nth-of-type(2){
          border-left: none;
          border-right: none;
        }
      }
    }

    &__content{
      width: 100%;
      height: auto;

      margin-top: 32px;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    &__image{
      width: 100px;
      height: 100px;

      display: flex;
      justify-content: center;
      align-items: center;

      border: 1px solid $main-color;
      border-radius: 50%;
      overflow: hidden;
    }

    &__info{
      width: auto;
      height: auto;

      margin-top: 32px;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    &__name{
      font-size: 24px;
      font-weight: 500;
      color: $main-color;
    }
  }
</style>
