<template>
  <div class="main-case">
    <header-component />
    <chat-list-component/>
    <user-profile-component />

    <section class="main-case__wrapper">
      <Nuxt />
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import HeaderComponent from "../components/header-component";
  import ChatListComponent from "../components/chat-list-component";
  import UserProfileComponent from "../components/user-profile-component";

  export default {
    name: 'default-layout',
    components: { UserProfileComponent, ChatListComponent, HeaderComponent },
    async mounted() {
      if (Object.keys(this.UserInfo).length === 0){
        await this.GetUserInfo();
      }

      if (this.ChatsList.length === 0){
        await this.GetChatsList();
      }
    },
    methods: {
      ...mapActions({
        GetUserInfo: 'user/GetUserInfo',
        GetChatsList: 'chats/GetChatsList',
      })
    },
    computed: {
      ...mapGetters({
        UserInfo: 'user/info',
        ChatsList: 'chats/list',
      })
    }
  }
</script>

