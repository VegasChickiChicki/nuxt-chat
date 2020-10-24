<template>
	<aside class="aside">
    <div class="aside__content">
      <ul class="aside-chats">
        <li class="aside-chats__item" v-for="chat in chats">
          <div class="user-info">
            <div class="user-info__icon">

            </div>
            <div class="user-info__description">
              <p class="user-info__status user-info__status--active">online</p>
              <p class="user-info__name">
                {{ chat.name }}
                <span class="user-info__id">#{{ chat.name }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
  import  { mapGetters } from 'vuex';

  export default {
    name: 'aside-component',
    computed: {
      ...mapGetters({
        chats: 'chats/chats',
      })
    },
  }
</script>

<style lang="scss">
  .aside{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    grid-area: aside;

    border-right: 1px solid $helper-color;

    &__content{
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .aside-chats{
    width: 100%;
    height: 100%;

    padding: 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    list-style: none;

    &__item{
      width: 100%;
      height: 100px;

      padding: 12px 24px;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      border-bottom: 1px solid $helper-color;

      cursor: pointer;
      background-color: transparent;
      transition: background-color ease 0.25s;

      &:hover{
        background-color: $main-color--light;
      }
    }
  }
</style>
