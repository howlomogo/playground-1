<template>
  <div class="bg-green-300 size">
    <button class="btn-blue" v-on:click="$emit('matts-func')">
        Click me to $emit
    </button>

    <button class="btn-blue" v-on:click="hello">
        Click me to call parent method directly
    </button>
    <!-- We can use $emit‘s 2nd parameter to provide a value: -->
    <button class="btn-blue" v-on:click="$emit('matts-func2', [1, 10, 5])">
        Click me to $emit and send value
    </button>

    <button class="btn-blue" v-on:click="$emit('matts-func3', 10)">
        Click me to $emit and send event value
    </button>

    <br />
    <hr />

    
  </div>


</template>

<script>
export default {
    name: 'Tile72',
    props: ['hello']
}
</script>

<style>
    .size {
        width: 500px;
        height:200px;
    }
</style>