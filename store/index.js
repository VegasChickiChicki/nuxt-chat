export const state = () => ({
  CreateChatPopupState: false,
});

export const mutations = {
  ToggleCreateChatPopupState(state, value){
    state.CreateChatPopupState = value;
  },
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, VuexContext){
    commit('user/SetUser', VuexContext.$auth.$state.user);

    await dispatch('chats/GetMessagesList');
  },
};

export const getters = {
  CreateChatPopupState: state => state.CreateChatPopupState
};
