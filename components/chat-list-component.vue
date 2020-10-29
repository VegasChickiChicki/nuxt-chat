<template>
	<aside class="chat-list">
    <div class="chat-list__head" ref="chat-list__head">
      <transition :name="HeaderOptionsTransition" mode="out-in">
        <div class="chat-list-options" v-if="!SearchChat.state && !CreateChat.state" :key="'header-options'">
          <p class="chat-list-options__text">Chats</p>
          <div class="chat-list-options__settings">
            <button type="button" class="btn-icon chat-list-options__settings--search" @click="ShowSearchChatForm()">
              <svg-icon name="search-icon"/>
            </button>
            <button type="button" class="btn-icon chat-list-options__settings--create" @click="ShowCreateChatForm()">
              <svg-icon name="plus-icon"/>
            </button>
          </div>
        </div>

        <div class="chat-list-search" v-else-if="SearchChat.state" :key="'header-search'">
          <form @submit.prevent="SearchNewChat" class="chat-list-search__form">
            <input-component
              class="input-text--default chat-list-search__input"
              :name="'search-chat'"
              :placeholder="'chat name'"
              :helper-text="this.SearchChat.errors.find(el => el.type === 'name') ? this.SearchChat.errors.find(el => el.type === 'name').text :''"
              :class="{ 'input-text--error': this.SearchChat.errors.find(el => el.type === 'name') }"
              :ref="'search-chat-input'"
              v-model="SearchChat.value"
            />
            <button type="submit" class="btn-icon chat-list-search__button">
              <svg-icon name="search-icon"/>
            </button>
          </form>
        </div>

        <div class="chat-list-create" v-else-if="CreateChat.state" :key="'header-create'">
          <form @submit.prevent="CreateNewChat" class="chat-list-create__form">
            <input-component
              class="input-text--default chat-list-create__input"
              :name="'search-chat'"
              :placeholder="'chat name'"
              :helper-text="this.CreateChat.errors.find(el => el.type === 'name') ? this.CreateChat.errors.find(el => el.type === 'name').text :''"
              :class="{ 'input-text--error': this.CreateChat.errors.find(el => el.type === 'name') }"
              :ref="'create-chat-input'"
              v-model="CreateChat.value"
            />
            <button type="submit" class="btn-icon chat-list-create__button">
              <svg-icon name="plus-icon"/>
            </button>
          </form>
        </div>
      </transition>
    </div>
    <div class="chat-list__content">
      <transition name="chat-list-chats" mode="out-in">
        <transition-group name="chat-list-chats" class="chat-list-chats" tag="ul" :key="'ChatList'" v-if="FoundChats.length ===0">
          <li class="chat-list-chats__item"
              v-for="chat in ChatsList"
              :key="`chan-${chat.name}`"
          >
            <nuxt-link class="chat-list-chats__link" :to="`/chat/${chat.name}`">
              <chat-preview
                :chat-name="chat.name"
              />
            </nuxt-link>
          </li>
        </transition-group>

        <transition-group name="chat-list-chats" class="chat-list-chats" tag="ul" :key="'FoundChats'" v-else>
          <li class="chat-list-chats__item"
              v-for="chat in FoundChats"
              :key="`chan-${chat.name}`"
              @click="JoinChat(chat.name)"
          >
            <chat-preview
              :chat-name="chat.name"
            />
          </li>
        </transition-group>
      </transition>
    </div>
  </aside>
</template>

<script>
  import  { mapGetters, mapMutations, mapActions } from 'vuex';

  import ChatPreview from "./chat-preview";
  import InputComponent from "./input-component";

  export default {
    name: 'chat-list-component',
    components: { ChatPreview, InputComponent },
    data: () => {
      return {
        HeaderOptionsTransition: '',
        SearchChat: {
          state: false,
          value: '',
          errors: [],
        },
        CreateChat: {
          state: false,
          value: '',
          errors: [],
        }
      }
    },
    methods: {
      ...mapMutations({
        UpdateChats: 'chats/UpdateChats',
        SetChatsList: 'chats/SetChatsList',
        SetFoundChats: 'chats/SetFoundChats'
      }),
      ...mapActions({
        GetChatsList: 'chats/GetChatsList',
        GetMessagesList: 'chats/GetMessagesList',
      }),
      async CreateNewChat(){
        await this.$axios.post('chat/options/create', {
          data: {
            chat: {
              name: this.CreateChat.value,
            },
            user: {
              name: this.UserInfo.login,
            }
          }
        }).then(response => {
          if (!response.data.status){
            this.CreateChat.errors = response.data.errors;
          } else {
            this.UpdateChats(response.data.body.chat);
            this.$router.push(`/chat/${this.CreateChat.value}`);
            this.CreateChat.state = false;
            this.CreateChat.value = '';
          }
        })
      },
      async SearchNewChat(){
        await this.$axios.get('chat/options/find', {
          params: {
            chat: {
              name: this.SearchChat.value,
            }
          }
        }).then(response => {
          if (!response.data.status){
            this.SearchChat.errors = response.data.errors;
          } else {
            if (response.data.body.chat === null){
              this.SearchChat.errors = [{
                text: 'Chat not found',
                type: 'name',
              }]
            } else {
              this.SetFoundChats(response.data.body.chats);
            }
          }
        })
      },
      async JoinChat(name){
        console.log('join chat: ', name);
        await this.$axios.post('chat/options/join', {
          data: {
            chat: {
              name: name,
            },
            user: {
              name: this.UserInfo.login,
            },
          }
        }).then(response => {
          if (!response.data.status){
            console.log('some error to join the chat!');
          } else {
            console.log('join response: ', response.data);
            if (response.data.body.chat !== null){
              this.UpdateChats(response.data.body.chat);

              this.$router.push(`/chat/${response.data.body.chat.name}`);
            } else {
              console.log('some error to join the chat!');
            }
          }
        });
      },
      ShowSearchChatForm(){
        this.HeaderOptionsTransition = 'chat-list-options--search';

        this.SearchChat.state = true;

        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs['search-chat-input'].$el.querySelector('input').focus();

            const CloseSearchForm = event => {
              if (event.target !== undefined && this.$refs['chat-list__head'] !== undefined){
                if (!this.$refs['chat-list__head'].contains(event.target)){
                  this.SearchChat.state = false;
                  this.SearchChat.errors = [];
                  this.SetFoundChats([]);

                  document.removeEventListener('click' , CloseSearchForm);
                }
              }
            };

            document.addEventListener('click' , CloseSearchForm);
          },700);
        })
      },
      ShowCreateChatForm(){
        this.HeaderOptionsTransition = 'chat-list-options--create';

        this.CreateChat.state = true;

        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs['create-chat-input'].$el.querySelector('input').focus();
          },700);

          const CloseCreateForm = event => {
            if (event.target){
              if (!this.$refs['chat-list__head'].contains(event.target) && this.$refs['chat-list__head'] !== undefined){
                this.CreateChat.state = false;
                this.CreateChat.errors = [];

                document.removeEventListener('click' , CloseCreateForm);
              }
            }
          };

          document.addEventListener('click' , CloseCreateForm);
        })
      }
    },
    computed: {
      ...mapGetters({
        UserInfo: 'user/info',
        ChatsList: 'chats/list',
        FoundChats: 'chats/FoundChats'
      }),
    },
  }
</script>

<style lang="scss">
  .chat-list{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    grid-area: chat-list;

    border-right: 1px solid $main-color;

    &__head{
      width: 420px;
      height: 100px;

      padding: 12px 24px;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

      border-bottom: 1px solid $main-color;
    }

    &__content{
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .chat-list-chats{
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

      border-bottom: 1px solid $main-color;

      cursor: pointer;
      background-color: transparent;
      transition: background-color ease 0.25s, trasnform ease 0.35s;

      &:hover{
        background-color: rgba(109, 144, 138, 0.275);
      }
    }

    &__link{
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      text-decoration: none;
    }

    &-enter-active, &-leave-active {
      transition: opacity ease 0.35s;
    }

    &-enter, &-leave-to{
      opacity: 0;
    }

    &-move {
      transition: transform ease 0.35s;
    }
  }

  .chat-list-options{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    overflow: hidden;

    .btn-main{
      width: calc(50% - 12px)
    }

    &__text{
      width: auto;
      height: auto;

      font-size: 32px;
      color: $main-color;
      font-weight: 400;
    }

    &__settings{
      width: auto;
      height: auto;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-shrink: 0;

      .btn-icon{
        svg{
          width: 24px;
          height: 24px;
        }

        &:not(:first-of-type){
          margin-left: 16px;
        }
      }
    }

    &--search{
      &-enter-active, &-leave-active {
        transition: opacity ease 0.35s;

        .chat-list-options__text{
          transition: opacity ease 0.35s;
        }

        .chat-list-options__settings{
          transition: transform ease 0.35s;
        }

        .chat-list-search__input{
          transition: width ease 0.5s;
        }
      }
      &-enter, &-leave-to{
        .chat-list-options__text{
          opacity: 0;
        }

        .chat-list-options__settings{
          transform: translateX(calc(48px + 16px));
        }

        .chat-list-search__input{
          width: 0;
        }
      }
    }

    &--create{
      &-enter-active, &-leave-active {
        transition: opacity ease 0.35s;

        .chat-list-options__text, .chat-list-options__settings--search{
          transition: opacity ease 0.35s;
        }

        .chat-list-create__input{
          transition: width ease 0.5s;
        }
      }

      &-enter, &-leave-to{
        .chat-list-options__text, .chat-list-options__settings--search{
          opacity: 0;
        }

        .chat-list-create__input{
          width: 0;
        }
      }
    }
  }

  .chat-list-search, .chat-list-create{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &__form{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__input{
      width: 100%;

      margin-right: 16px;
      margin-top: 28px;

      overflow: hidden;

      .input-text__input{
        font-size: 20px;
      }

      .input-text__footer-inner{
        white-space: nowrap;
      }
    }

    &__button{
      flex-shrink: 0;

      svg{
        width: 24px;
        height: 24px;
      }
    }
  }
</style>
