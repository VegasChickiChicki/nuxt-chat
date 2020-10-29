export const state = () => ({

});

export const mutations = {

};

export const actions = {
  async nuxtServerInit({ dispatch, state }, VuexContext){
    if (VuexContext.$auth.$state.user){
      await dispatch('user/GetUserInfo');
      await dispatch('chats/GetChatsList');
    }
  },
};

export const getters = {

};
