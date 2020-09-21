<template>
    <div>
        <slot></slot>
        <h1>Start</h1>
        <slot></slot>
        <h1>End</h1>
        <slot></slot>
        <h2>{{ testPropName }}</h2>
        <h2>testPropAge is {{ typeof testPropAge }}</h2>
        <h2>testPropAgeString typeof is {{ typeof testPropAgeString }}</h2>
        <!-- Bool will default to true IF TYPE is set in props, otherwise appears to just be empty string -->
        <h2>testPropBool is {{ typeof testPropBool }} - {{ testPropBool }}</h2>
        <h2>testPropBool2 is {{ typeof testPropBool2 }} - {{ testPropBool2 }}</h2>
        <br />
        <h2>testArr will be an object as it is primative object {{ typeof testArr }}</h2>
        <div v-for="item in testArr" v-bind:key="item + '_test'">
            <h6>{{ item }}</h6>
        </div>
        <h2>testProp is {{ typeof testProp }}</h2>
        <br />
    </div>
</template>

<script>
export default {
    name: 'Tile73',
    props: [
        'testPropName',
        'testPropAge',
        'testPropAgeString',
        'testPropBool',
        'testPropBool2',
        "testArr",
        "testProp"
    ],
    // Basic Prop type checks
    // props: {
    //     testPropName: String,
    //     testPropAge: {
    //         type: Number,
    //         default: 50
    //     },
    //     testPropAgeString: String,
    //     testPropBool: Boolean,
    //     testPropBool2: Boolean,
    //     testArr: Array, // Even though Array is object, you will define here as Array
    //     testProp: Object
    // }
}
</script>

<style>

</style>