export const state = () => ({
  chats: [],
  messages: [],
});

export const mutations = {
  SetChats(state, chats){
    state.chats = chats;
  },
  UpdateChats(state, chat){
    state.chats.unshift(chat);
  },
  SetMessages(state, messages){
    state.messages = messages;
  },
  UpdateMessages(state, message){
    state.messages.push(message);
  },
};

export const actions = {
  async GetMessagesList({ commit }){
    await this.$axios.get('/chat/messages/list', {
      params: {
        chat: {
          name: 'BlueSky',
        }
      }
    }).then(response => {
      if (response.data.status){
        commit('SetMessages', response.data.body.messages);
      }
    });
  },
  async GetChatsList({ commit }){
    await this.$axios.get('/chat/options/list', {
      params: {
        user: {
          name: this.$auth.user.login,
        }
      }
    }).then(response => {
      if (response.data.status){
        commit('SetChats', response.data.body.chats);
      }
    });
  },
};

export const getters = {
  messages: state => state.messages,
  chats: state => state.chats
};
