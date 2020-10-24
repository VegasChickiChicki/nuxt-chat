export const state = () => ({
  user: {
    login: null,
  },
});

export const mutations = {
  SetUser(state, user){
    state.user = user;
  },
};

export const actions = {

};

export const getters = {
  user: state => state.user
};
