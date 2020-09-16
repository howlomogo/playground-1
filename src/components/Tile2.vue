<template>
    <div class="card"> <!-- class applied here from App.vue -->
        <!-- Note below how you can use class Aswell as v-bind:class -->
        <h1 class="class3" v-bind:class="{
                'class1': class1Active,
                'class2': class2Active
            }">
            Classes
        </h1>
        <button @click="toggleActiveClasses" class="btn-blue">
            Toggle Classes Active
        </button>

        <!--- Morealess the same for styling as classes, here just using the styleObject
        from data but can be done inline also, again you can use array syntax for this also --->
        <h1 style="background-color: blue" v-bind:style="styleObject">
            Styles
        </h1>
    </div>
</template>

<script>
export default {
    name: 'Tile2',
    data: function() {
        return {
            class1Active: false,
            class2Active: false,
            styleObject: {
                color: 'red',
                fontSize: '32px'
            }
        }
    },
    methods: {
        toggleActiveClasses: function() {
            this.class1Active = !this.class1Active;
            this.class2Active = !this.class2Active;
        }
    }
}
</script>

<style>
    .class1 {
        @apply text-red-500 font-bold;
    }
    .class2 {
        @apply underline;
    }
    .class3 {
        @apply bg-green-300;
    }
</style>