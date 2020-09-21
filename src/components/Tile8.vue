<template>
    <div>
        <Tile81>
            <!-- The slot here has access to Tile8's properties NOT Tile81's -->
            My name is {{ user.name }}
        </Tile81>

        <!-- Named Slots -->
        <!-- To provide content to named slots, we can use the v-slot directive on a <template>,
            providing the name of the slot as v-slot‘s argument: -->
        <!-- Now everything inside the <template> elements will be passed to the corresponding slots.
            Any content not wrapped in a <template> using v-slot is assumed to be for the default slot. -->
        <!-- v-slot can only be added to template with one exception -->
        <Tile82>
            <template v-slot:header>
                <h1>Here might be a page title</h1>
            </template>

            <p>A paragraph for the main content.</p>
            <p>And another one.</p>


            <!-- You can still wrap default slot content in a template to be explicit but not required -->
            <!-- <template v-slot:default>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
            </template> -->

            <template v-slot:someOtherSlot>
                <p>This is SOME OTHER CONTENT</p>
            </template>

            <template v-slot:footer>
                <p>Here's some contact info</p>
            </template>
        </Tile82>
    </div>
</template>

<script>
import Tile81 from './Tile81'
import Tile82 from './Tile82'

export default {
    components: {
        Tile81,
        Tile82
    },
    data: function() {
        return {
            user: {
                name: 'Matt',
                age: 33
            }

        }
    }
}
</script>

<style>

</style>