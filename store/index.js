import * as MUTATION from '../constants/mutation';
import * as ACTION from '../constants/action';
import URL from '../constants/url';

export const state = () => ({
  guilds: [],
  directories: [],
  directory: {},
  images: [],
  im: '',
});

export const getters = {
  user: state => state.discord && state.discord.user,
  userId: state => state.discord && state.discord.user && state.discord.user.id,
  guilds: state => state.guilds,
  directories: state => state.directories,
  images: state => state.images,
  directory: state => state.directory,
  logged: state => {
    return state.discord && state.discord.accessToken && state.discord.user != null;
  }
}

export const mutations = {
  [MUTATION.SET_GUILDS] (state, guilds) {
    state.guilds = guilds;
  },
  [MUTATION.SET_DIRECTORIES] (state, directories) {
    state.directories = directories;
  },
  [MUTATION.SET_IMAGES] (state, images) {
    state.images = images;
  },
  [MUTATION.SET_DIRECTORY] (state, directory) {
    state.directory = directory;
  },
  [MUTATION.RESET_DIRECTORIES] (state) {
    state.directories = [];
  },
  [MUTATION.RESET_DIRECTORY] (state) {
    state.directory = {};
  },
  [MUTATION.RESET_IMAGES] (state) {
    state.images = [];
  },
  'SET_IM': (state, im) => {
    state.im = im;
  }
};

export const actions = {
  nuxtServerInit ({ commit }, { req, env }) {
    commit('SET_IM', env.im);
  },
  async [ACTION.FETCH_GUILD] ({ commit, getters }) {
    const userId = getters.userId;
    const guilds = await this.$axios.$get(URL.GUILDS, {
      params: { id: userId }
    });

    commit(MUTATION.SET_GUILDS, guilds);
  },
  async [ACTION.UPDATE_GUILD] ({ commit }) {
    const guildId = this.$router.currentRoute.params.guild;

    this.$axios.$get(URL.DIRECTORIES, {
      params: { id: guildId }
    }).then(directories => {
      commit(MUTATION.SET_DIRECTORIES, directories);
    });

    this.$axios.$get(URL.IMAGES, {
      params: { id: guildId }
    }).then(images => {
      commit(MUTATION.SET_IMAGES, images);
    });
  },
  async [ACTION.UPDATE_DIRECTORY] ({ commit }) {
    const directoryId = this.$router.currentRoute.params.directory;

    const directory = await this.$axios.$get(URL.DIRECTORY, {
      params: { id: directoryId }
    });
    commit(MUTATION.SET_DIRECTORY, directory);
  }
};

