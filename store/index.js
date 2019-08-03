import * as MUTATION from '../constants/mutation';

export const state = () => ({
  guilds: [],
  directory: {},
});

export const getters = {
  userId: state => state.discord && state.discord.user && state.discord.user.id,
  guilds: state => state.guilds,
  directory: state => state.directory,
  logged: state => {
    return state.discord && state.discord.accessToken && state.discord.user != null;
  }
}

export const mutations = {
  [MUTATION.SET_GUILDS] (state, guilds) {
    state.guilds = guilds;
  },
  [MUTATION.SET_DIRECTORY] (state, directory) {
    state.directory = directory;
  }
};

export const actions = {

};

