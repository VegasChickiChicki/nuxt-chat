<template>
  <div class="main-case">
    <header-component />
    <aside-component />
    <Nuxt />


    <create-chat :state="CreateChatPopupState" @TogglePopup="ToggleCreateChatPopupState($event)"/>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  import HeaderComponent from "../components/header-component";
  import AsideComponent from "../components/aside-component";
  import CreateChat from "../components/create-chat";

  export default {
    name: 'default-layout',
    components: { CreateChat, AsideComponent, HeaderComponent },
    methods: {
      ...mapMutations({
        ToggleCreateChatPopupState: 'ToggleCreateChatPopupState',
      }),
    },
    computed: {
      ...mapGetters({
        CreateChatPopupState: 'CreateChatPopupState',
      })
    }
  }
</script>

