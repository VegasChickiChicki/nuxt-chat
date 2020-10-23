export const state = () => ({
  CreateChatPopupState: false,
});

export const mutations = {
  ToggleCreateChatPopupState(state, value){
    state.CreateChatPopupState = value;
  },
};

export const actions = {

};

export const getters = {
  CreateChatPopupState: state => state.CreateChatPopupState
};
