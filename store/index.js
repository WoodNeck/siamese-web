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
  [MUTATION.MKDIR] (state, { updatingGuild, directory }) {
    const guildIndex = state.guilds.findIndex(guild => guild === updatingGuild);
    state.guilds[guildIndex].directories.push(directory);
  },
  [MUTATION.RMDIR] (state, { updatingGuild, dirName }) {
    const guildIndex = state.guilds.findIndex(guild => guild === updatingGuild);
    const directories = state.guilds[guildIndex].directories;
    const dirIndex = directories.findIndex(dir => dir.name === dirName);
    directories.splice(dirIndex, 1);
  },
  [MUTATION.MKIMG] (state, { guildId, dirName, images }) {
    const guild = state.guilds.find(guild => guild.id === guildId);
    const directory = guild.directories.find(dir => dir.name === dirName);
    directory.images.push(...images);
  },
};

export const actions = {

};

