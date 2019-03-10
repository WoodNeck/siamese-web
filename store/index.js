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
  },
  [MUTATION.MKDIR] (state, updatingGuild, directory) {
    console.log(updatingGuild, directory);
    const guildIndex = state.guilds.findIndex(guild => guild === updatingGuild);
    state.guilds[guildIndex].directories.push(directory);
  },
  [MUTATION.RMDIR] (state, updatingGuild, index) {
    const guildIndex = state.guilds.findIndex(guild => guild === updatingGuild);
    state.guilds[guildIndex].directories.splice(index, 1);
  }
};

export const actions = {

};

