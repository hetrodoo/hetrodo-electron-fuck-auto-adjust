import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from "electron"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        displayValue: 100,
        value: 100
    },
    mutations: {
        UPDATE_VALUE(state, payload) {
            state.value = payload;
        },
        UPDATE_DISPLAY_VALUE(state, payload) {
            state.displayValue = payload;
        }
    },
    actions: {
        APPLY_NEW_VALUE(store) {
            ipcRenderer.send("volume", store.state.value);
        },
        CLOSE() {
            ipcRenderer.send("close");
        }
    }
});

ipcRenderer.on("volume", (event, value) => store.commit("UPDATE_DISPLAY_VALUE", value));
ipcRenderer.send("loaded");

export default store;
