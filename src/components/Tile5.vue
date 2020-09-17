<template>
    <div class='card'>
        <h2>Tile5</h2>
        <h6>Event Modifiers</h6>
        <!-- the click event's propagation will be stopped -->
        <a v-on:click.stop="doThis"></a>

        <!-- the submit event will no longer reload the page -->
        <form v-on:submit.prevent="handleSubmit">
            <input type="text">
            <button class="btn-blue" type="submit">Submit</button>
        </form>

        <!-- just the modifier -->
        <form v-on:submit.prevent>
            <input type="text">
            <button class="btn-blue" type="submit" @click="handleSubmit">Submit</button>
        </form>

        <!-- modifiers can be chained -->
        <a v-on:click.stop.prevent="doThat"></a>

        <!-- use capture mode when adding the event listener -->
        <!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
        <div v-on:click.capture="doThis">...</div>

        <!-- only trigger handler if event.target is the element itself -->
        <!-- i.e. not from a child element -->
        <div v-on:click.self="func1">
            <button class="btn-blue">Can't click Me</button>
            <h5>Can't click me either</h5>
        </div>

        <!-- the click event will be triggered at most once, can also be used on components -->
        <a v-on:click.once="handleSubmit">Hello</a>

        <!-- the scroll event's default behavior (scrolling) will happen -->
        <!-- immediately, instead of waiting for `onScroll` to complete  -->
        <!-- in case it contains `event.preventDefault()`                -->
        <!-- more info on passive - https://www.youtube.com/watch?v=DJYpXxWqvmo -->
        <div v-on:scroll.passive="onScroll">...</div>

        <!-- Keyboard listeners -->
        <!-- only call `vm.submit()` when the `key` is `Enter` -->
        <input placeholder="press Enter inside me" class="border" v-on:keyup.enter="handleSubmit">

        <!-- You can directly use any valid key names exposed via KeyboardEvent.key as modifiers by converting them to kebab-case. -->
        <!-- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values -->
        <input placeholder="press down arrow inside me" class="border" v-on:keyup.arrow-down="handleSubmit">

        <!-- @@@keyCode events are deprecated so use this with caution@@@ -->
        <input class="border" v-on:keyup.13="submit">

        <!-- You can use modifiers such as Ctrl + Click -->
        <div style="height: 100px; width: 300px; background-color: red" v-on:click.alt="handleSubmit">
            Alt + click me
        </div>

        <!-- this will fire even if Alt or Shift is also pressed -->
        <button v-on:click.ctrl="onClick">A</button>

        <!-- this will only fire when Ctrl and no other keys are pressed -->
        <button v-on:click.ctrl.exact="onCtrlClick">A</button>

        <!-- this will only fire when no system modifiers are pressed -->
        <button v-on:click.exact="onClick">A</button>
    </div>
</template>

<script>
export default {
    name: 'Tile5',
    methods: {
        handleSubmit: function() {
            console.log('Submit Handled')
        },
        func1: function() {
            console.log('func1')
        }
    }
}
</script>

<style>

</style>