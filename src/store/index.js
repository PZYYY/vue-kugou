import Vue from 'vue';
import Vuex from 'vuex';
import listSong from './modules/listSong';
import songs from './modules/songs';
import collect from './modules/collect';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
    	listSong,songs,collect
    },
    getters
})

export default store;