export const state = () => ({
  LoginState: true,
});

export const mutations = {
  ToggleLoginState(state, value){
    state.LoginState = value;
  },
};

export const actions = {

};

export const getters = {
  LoginState: state => state.LoginState
};
