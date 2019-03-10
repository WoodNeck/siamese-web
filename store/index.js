import * as MUTATION from '../constants/mutation';

export const state = () => ({
  guilds: [],
});

export const getters = {
  guilds: state => state.guilds,
}

export const mutations = {
  [MUTATION.SET_GUILDS] (state, guilds) {
    state.guilds = guilds;
  }
};

export const actions = {

};

