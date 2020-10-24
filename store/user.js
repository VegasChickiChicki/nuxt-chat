export const state = () => ({
  info: {},
});

export const mutations = {
  SetUser(state, user){
    state.info = user;
  },
};

export const actions = {
  async GetUser({ commit }){
    await this.$axios.get('/user/info', {
      params: {
        user: {
          token: this.$auth.user.token,
        }
      }
    }).then(response => {
      if (response.data.status){
        commit('SetUser', response.data.body.user);
      }
    });
  },
};

export const getters = {
  info: state => state.info
};
