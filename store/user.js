export const state = () => ({
  info: {},
});

export const mutations = {
  SetUserInfo(state, user){
    state.info = user;
  },
};

export const actions = {
  async GetUserInfo({ commit }){
    await this.$axios.get('/user/info', {
      params: {
        user: {
          token: this.$auth.user.token,
        }
      }
    }).then(response => {
      if (response.data.status){
        commit('SetUserInfo', response.data.body.user);
      }
    });
  },
};

export const getters = {
  info: state => state.info
};
