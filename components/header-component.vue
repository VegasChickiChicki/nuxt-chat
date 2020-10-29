<template>
  <header class="header">
    <div class="header__wrapper">
      <chat-preview
        :chat-name="CurrentChat.name"
        v-if="CurrentChat"
      />
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  import ChatPreview from "./chat-preview";

  export default {
    name: 'header-component',
    components: { ChatPreview },
    computed: {
      ...mapGetters({
        chats: 'chats/list',
      }),
      CurrentChat(){
        return this.chats.find(el => el.name === this.$route.params.id);
      }
    }
  }
</script>
