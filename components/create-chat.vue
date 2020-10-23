<template>
  <popup-component :state="state" :name="'create-chat'" @TogglePopup="$emit('TogglePopup', $event)">
    <form class="default-form create-chat-form" @submit.prevent="CreateChat">
      <p class="default-form__title">Create new chat</p>
      <input-component
        class="input-text--default"
        :name="'new-chat-name'"
        :title="'Chat name'"
        :helper-text="this.errors.find(el => el.type === 'name') ? this.errors.find(el => el.type === 'name').text :''"
        :class="{ 'input-text--error': this.errors.find(el => el.type === 'name') }"
        v-model="ChatName"
      />
      <button type="submit" class="btn-main btn--transparent">create chat</button>
    </form>
  </popup-component>
</template>

<script>
  import { mapMutations } from 'vuex';

  import PopupComponent from "./popup-component";
  import InputComponent from "./input-component";

  export default {
    name: 'create-chat',
    components: { PopupComponent, InputComponent },
    props: {
      state: {
        type: Boolean,
        required: true,
      }
    },
    data: () => {
      return{
        ChatName: '',
        errors: []
      }
    },
    methods: {
      ...mapMutations({
        ToggleCreateChatPopupState: 'ToggleCreateChatPopupState',
      }),
      async CreateChat(){
        this.$axios.post('chat/options/create', {
          data: {
            name: this.ChatName,
            user: {
              name: this.$auth.user.login,
            }
          }
        }).then(response => {
          if (!response.data.status){
            this.errors = response.data.errors;
          } else {
            this.ToggleCreateChatPopupState(false);
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  .create-chat-form{
    height: 380px;

    grid-template-rows: auto auto 1fr;

    background-color: $main-color;
  }
</style>
