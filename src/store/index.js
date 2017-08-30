import Vue from 'vue';
import Vuex from 'vuex';
import listSong from './modules/listSong';
import songs from './modules/songs';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
    	listSong,songs
    },
    getters
})

export default store;