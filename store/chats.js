export const state = () => ({
  messages: [],
});

export const mutations = {
  SetMessages(state, chats){
    state.messages = chats;
  },
  UpdateMessages(state, chat){
    state.messages.push(chat);
  }
};

export const actions = {
  async GetMessagesList({ commit }){
    await this.$axios.get('/chat/messages/list', {
      params: {
        ChatName: 'BlueSky'
      }
    }).then(response => {
      if (response.status){
        commit('SetMessages', response.data.body.messages);
      }
    })
  }
};

export const getters = {
  messages: state => state.messages
};
