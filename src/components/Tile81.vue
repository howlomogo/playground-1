<template>
    <div>
        <h1>Tile81</h1>
        <!-- We can provide fallback content in the slot, by just insterting it
        inside the tags like here Cheese is the fallback -->
        <slot>Cheese</slot>
        <h2>{{ mixinData }}</h2>
        <h2>{{ someText | capitalize }}</h2>
        <!-- You can also chain filters -->
        <!-- {{ message | filterA | filterB }} -->

    </div>
</template>

<script>
import mixin1 from '../mixins/mixin1'

export default {
    name: 'Tile81',
    mixins: [mixin1],
    data: function() {
        return {
            someText: "hello my name is matt"
        }
    },
    filters: {
        capitalize: function (value) {
            // Return mixinData as uppercase, filters are used for text transformation
            return value.toUpperCase()
        }
    }
}
</script>

<style>

</style>