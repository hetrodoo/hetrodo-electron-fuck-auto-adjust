<template>
    <v-main
        class="fill-height"
    >
        <v-col
            class="fill-height"
        >
            <v-row
                align="center"
                class="fill-height"
                justify="center"
            >
                <v-card
                    elevation="8"
                >
                    <v-card-title>
                        Microphone
                    </v-card-title>

                    <v-card-text
                        class="d-flex flex-row align-end"
                    >
                        <v-progress-circular
                            :size="128"
                            :width="10"
                            :value="displayValue"
                            color="pink"
                        >
                            {{ displayValue }}
                        </v-progress-circular>

                        <div
                            class="ml-16"
                            style="width: 128px;"
                        >
                            <v-text-field
                                v-model="value"
                                dense
                                filled
                                outlined
                                type="number"
                                hide-details="auto"
                            />

                            <v-btn
                                color="pink"
                                class="mt-2"
                                block
                                @click="apply"
                            >
                                Apply
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-col>

    </v-main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Home',

    computed: {
        value: {
            get: function () {
                return this.$store.state.value;
            },
            set: function (newValue) {
                this.$store.commit("UPDATE_VALUE", newValue);
            }
        },
        displayValue: function () {
            return this.$store.state.displayValue;
        }
    },

    mounted() {
        this.value = Number.parseInt(localStorage.getItem("mic") || "100");
        this.apply();
    },

    methods: {
        apply: function () {
            this.value = Math.min(this.value, 100);
            this.value = Math.max(this.value, 0);
            localStorage.setItem("mic", this.value.toString());
            this.$store.dispatch("APPLY_NEW_VALUE");
        }
    }
})
</script>
