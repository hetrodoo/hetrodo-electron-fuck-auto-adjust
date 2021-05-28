<template>
    <v-app>
        <v-app-bar
            app
            dark
            dense
            color="pink"
        >
            <v-app-bar-title>
                Fuck Auto Adjust
            </v-app-bar-title>

            <v-spacer
                class="drag"
            />

            <v-btn
                icon
                @click="close"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'App',

    mounted() {
        const tagCollection = document.getElementsByTagName("html");
        const tagArray = [...tagCollection] as HTMLElement[];
        const htmlElement = tagArray.shift() as HTMLElement;
        htmlElement.style.overflow = "hidden";
    },

    methods: {
        close() {
            this.$store.dispatch("CLOSE");
        }
    }
});
</script>

<style>
* {
    -webkit-user-select: none;
    -webkit-user-drag: none;
}

html {
    overflow: hidden;
}

.drag {
    -webkit-user-select: none;
    -webkit-app-region: drag;
    height: 100%;
}
</style>
