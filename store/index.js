export const state = () => ({
  CreateChatPopupState: false,
});

export const mutations = {
  ToggleCreateChatPopupState(state, value){
    state.CreateChatPopupState = value;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch, state }, VuexContext){
    await dispatch('user/GetUser');
    await dispatch('chats/GetChatsList');
  },
};

export const getters = {
  CreateChatPopupState: state => state.CreateChatPopupState
};
