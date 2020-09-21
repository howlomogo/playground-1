<template>
    <div>
        <h1>Tile82</h1>
        <div class="container">
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <!-- A <slot> outlet without name implicitly has the name “default”. -->
                <slot></slot>
            </main>

            <footer>
                <slot name="footer"></slot>
            </footer>
            <div>
                <slot name="someOtherSlot"></slot>
            </div>
            <!-- This will only update THIS component as expected,
            not others using the mixin jut wanted to check -->
            <button class="btn-blue" @click="changeData">
                Click me to change data pulled in from mixin
            </button>
        </div>
        
        <div id="demo">
            <button class="btn-blue" v-on:click="show = !show">
                Click to toggle hello
            </button>
            <!-- transition wrapper component -->
            <transition name="fade">
                <p v-if="show">hello</p>
            </transition>
        </div>
        {{ this.mixinData }}
    </div>
</template>

<script>
import mixin1 from '../mixins/mixin1'

export default {
    name: 'Tile82',
    mixins: [mixin1],
    data: function() {
        return {
            show: true
        }
    },
    methods: {
        changeData: function() {
            this.mixinData = "This has been changed"
        }
    }
}
</script>

<style>
    /* Styles relating to 'fade' */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>