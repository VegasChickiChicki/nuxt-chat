export const state = () => ({
  chats: [],
  FoundChats: [],
});

export const mutations = {
  SetChatsList(state, chats){
    state.chats = chats;
  },
  UpdateChats(state, chat){
    if (!state.chats.find(el => el.name === chat.name)){
      state.chats.unshift(chat);
    }
  },
  ChatSetMessages(state, data){
    state.chats.find(el => el.name === data.ChatName).messages = data.messages;
  },
  ChatUpdateMessages(state, data){
    state.chats.find(el => el.name === data.ChatName).messages.push(data.message);
  },
  SetFoundChats(state, chats){
    state.FoundChats = chats;
  }
};

export const actions = {
  async GetMessagesList({ commit }, ChatName){
    await this.$axios.get('/chat/messages/list', {
      params: {
        chat: {
          name: ChatName,
        }
      }
    }).then(response => {
      if (response.data.status){
        commit('ChatSetMessages', {
          ChatName: ChatName,
          messages: response.data.body.messages
        });
      }
    });
  },
  async GetChatsList({ commit, rootState }){
    await this.$axios.get('/chat/options/list', {
      params: {
        user: {
          name: rootState.user.info.login,
        }
      }
    }).then(response => {
      if (response.data.status){
        const ChatsList = response.data.body.chats;

        ChatsList.forEach(el => {
          el.messages = []
        });

        commit('SetChatsList', ChatsList);
      }
    });
  },
};

export const getters = {
  list: state => state.chats,
  FoundChats: state => state.FoundChats,
};
