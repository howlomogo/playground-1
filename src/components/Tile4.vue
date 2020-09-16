<template>
    <div class="card">
        <ul>
            <button @click="addItemToArray(true)" class="btn-blue">
                Add Item to array
            </button>
            <!-- index is optional -->
            <!-- Inside v-for you have full access to parent scope properties. -->
            <!-- You can also use 'of' instead of 'in' - exactly the same -->
            <li v-for="(item, index) in items" v-bind:key="index + item.message">
                {{ item.message }} - {{ index }} - {{ parentMessage }}
            </li>

            <!-- 2nd argument for 'v-for' on object is the object key -->
            <!-- 3rd key is the index -->
            <!-- As a note, if you use v-for you get an error if there is no key
            However with :for you dont get this error, no idea why
            -->
            <!-- 
                Note: When iterating over an object, the order is based on the enumeration
                order of Object.keys(), which is not guaranteed to be consistent across
                JavaScript engine implementations.
             -->
            <hr class="my-2" />
            <li v-for="(value, name, index) in someObj" v-bind:key="'test1' + index">
                -- {{ name }}: {{ value }} - {{ index }}
            </li>

            <li v-for="(n, index) in evenNumbers" v-bind:key="'test2' + index">
                {{n}}
            </li>

            <!-- v-for can also take an integer to repeat -->
            <span v-for="(n, index) in 10" v-bind:key="'test3' + index" >
                {{ n }} 
            </span>

            <!-- You can also you v-for in template element,
            note the other elements will need keys... -->
            <template v-for="(item, index) in items">
                <p v-bind:key="'test4' + index">>{{ item.message }} - {{ index }} - </p>
                <p v-bind:key="'test5' + index">>{{ parentMessage }}</p>
            </template>
        </ul>

        <!-- You can use v for directly on components
        and for example pass the props -->
        <Tile42 v-for="(item, index) in items"
            v-bind:key="index + 'tile'"
            v-bind:message="item.message" />

        <!-- Note this also does the same with is, which I believe is required check -->
        <!-- the todo example here https://vuejs.org/v2/guide/list.html#v-for-with-a-Component -->
        <!-- <div is="Tile42" v-for="(item, index) in items"
            v-bind:key="index + 'tile'"
            v-bind:message="item.message" /> -->


    </div>
</template>

<script>

import Tile42 from './Tile42';

export default {
    name: 'Tile4',
    components: {
        Tile42
    },
    data: function() {
        return {
            parentMessage: 'Parent',
            items: [
                { message: 'Foo' },
                { message: 'Bar' }
            ],
            someObj: {
                title: 'How to do lists in Vue',
                author: 'Jane Doe',
                publishedAt: '2016-04-10'
            },
            numbers: [1,2,3,4,5,6,7,8,9,10]
        }
    },
    methods: {
        addItemToArray: function(shouldPush) {
            if (shouldPush) {
                // In vue you can mutate like this
                this.items.push({
                    message: 'Cheese'
                })
            } else {
                // OR just replace as normal
                const newArr = [
                    { message: 'newFoo' },
                    { message: 'newBar' }
                ]
                this.items = newArr
            }
        }
    },
    computed: {
        // Example filtering and not affecting 'numbers'
        // You could use methods for more complex examples
        evenNumbers: function() {
            return this.numbers.filter(function (number) {
                return number % 2 === 0
            })
        }
    }
}
</script>

<style>

</style>