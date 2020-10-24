export const state = () => ({
  chats: [],
});

export const mutations = {
  SetChats(state, chats){
    state.chats = chats;
  },
  UpdateChats(state, chat){
    state.chats.unshift(chat);
  },
  ChatSetMessages(state, data){
    state.chats.find(el => el.name === data.ChatName).messages = data.messages;
  },
  ChatUpdateMessages(state, data){
    state.chats.find(el => el.name === data.ChatName).messages.push(data.message);
  },
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
  async GetChatsList({ commit }){
    await this.$axios.get('/chat/options/list', {
      params: {
        user: {
          name: this.$auth.user.login,
        }
      }
    }).then(response => {
      if (response.data.status){
        const ChatsList = response.data.body.chats;

        ChatsList.forEach(el => {
          el.messages = []
        });

        commit('SetChats', ChatsList);
      }
    });
  },
};

export const getters = {
  chats: state => state.chats
};
