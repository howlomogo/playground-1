<template>
    <div class="card">
        <button class="btn-blue" @click="toggleShowHeading">
            Toggle showHeading
        </button>
        
        <!-- You can use templates to wrap logic, if div not wanted
        These are kind of like fragments BUT you can NOT use them at the
        root level on their own an additional wrapping div is required. -->
        <template v-if="1 === 1">
            <h2>TEST</h2>
            <h2>TEST2</h2>
        </template>
        <!-- Conditional Rendering -->
        <h5 v-if="showHeading">showHeading is true will show</h5>
        <h5 v-else>else showHeading is not true</h5>
        <!--- A v-else element must immediately follow a v-if or a v-else-if element
        - otherwise it will not be recognized... -- Seems like really bad practise -->

        <!-- !important - Notice here switching between the inputs
        Vue will reuse the input element in v-if here, and the value will
        NOT be reset, I'm not really sure why this is default, but you need
        to add a key here to get them to act independantly -->
        <template v-if="showHeading">
            <input placeholder="1. Value will NOT reset - placeholder will" type="text" class="border" >
        </template>
        <template v-else>
            <input placeholder="2. Value will NOT reset - placeholder will" type="text" class="border" >
        </template>

        <!-- Vue offers a way for you to say,
        “These two elements are completely separate - don’t re-use them.”
        Add a key attribute with unique values: -->
        <!-- The label element IS reused here, but it will update -->
        <template v-if="showHeading">
            <label>email</label>
            <input placeholder="email key- this will reset" type="text" key="email-key" class="border" >
        </template>
        <template v-else>
            <label>phone</label>
            <input placeholder="phone key- this will reset" type="text" key="phone-key" class="border" >
        </template>

        <p v-show="showHeading">This is always in the DOM</p> <!-- this is always in the dom -->
        <!-- v-show is largely the same as v-if, the difference is that
        v-show will always be rendered and remain in the DOM, and it only
        toggles the `display` CSS property, v-show does NOT
        support <template> element or v-else
        -->

        <hr class="my-4" />
        <div v-if="test1 === 'A'">
            A
        </div>
        <div v-else-if="test1 === 'B'">
            B
        </div>
        <div v-else-if="test1 === 'C'">
            C
        </div>
        <div v-else>
            Not A/B/C
        </div>


    </div>
</template>

<script>
export default {
    name: 'Tile3',
    data: function() {
        return {
            showHeading: true,
            test1: 'D'
        }
    },
    methods: {
        toggleShowHeading: function() {
            this.showHeading = !this.showHeading;
        }
    }
}
</script>

<style>

</style>