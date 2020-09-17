<template>
  <div>
      <!-- Form Input Bindings -->
      <input
        class="border"
        v-model="message"
        v-on:input="func1"
        placeholder="edit me">
      <p>Message is: {{ message }}</p>
      
      <span>Multiline message is:</span>
      <p>{{ message2 }}</p>
      <br>
      <textarea
        class="border w-72 h-20"
        v-model="message2"
        v-on:input="func1"
        placeholder="add multiple lines" />
      <br />

      <!-- Single checkbox bool -->
      <input
        v-on:change="func1"
        class="mr-4"
        type="checkbox"
        id="checkbox"
        v-model="checked">
      <label for="checkbox">{{ checked }}</label>

      <br />
      <!-- Multiple checkboxes bound to same array -->
      <input class="mr-1" v-on:change="func1" type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input class="mr-1 ml-4" type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input class="mr-1 ml-4" type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>


      <br />
      <hr />
      <input type="radio" id="one" value="One" v-on:change="func1" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
      <span>Picked: {{ picked }}</span>

      <br />
      
      <!-- Make sure one of the values matches the initial selected value, otherwise it will break on ios -->
      <select class="border p-2" v-model="selected" v-on:change="func2($event)">  
        <option disabled value="">Please select one</option>
        <option value="test1">A - test1</option>
        <option value="test2">B - test2</option>
        <option value="test3">C - test3</option>
        </select>
        <br />
        <span>Selected: {{ selected }}</span>

    <br />

        <!-- Multiple select (bound to Array): -->
        <select class="border w-12" v-model="selectedMulti" multiple>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <br>
        <span>Selected: {{ selectedMulti }}</span>

    <br />
        <!-- Rendering select with v-for -->
        <select class="border" v-model="selectedWithFor">
            <option
                v-for="option in options"
                :value="option.value"
                :key="'select_option_' + option.value">
                {{ option.text }}
            </option>
        </select>
        <span>Selected: {{ selectedWithFor }}</span>

        <br />
        <!-- You can bind different values such as here an object -->
        <select class="border" v-model="selected2">
            <option v-bind:value="{ number: 123 }">123</option>
        </select>

        <br />
        <!-- .lazy, synced after "change" instead of "input" -->
        <!-- msg wont update on input but when the input essentially loses focus -->
        <input class="border" v-model.lazy="msg">

        <!-- If you want user input to be automatically typecast as a Number,
        you can add the number modifier to your v-model managed inputs: -->
        <!-- This is often useful, because even with type="number", the value of HTML input elements always returns a string.
        If the value cannot be parsed with parseFloat(), then the original value is returned. -->
        <input class="border" v-model.number="age" type="number">

        <!-- trim modifier will remove whitespace, to your v-model-managed inputs: -->
        <input class="border" v-model.trim="msg2">

        <h1>{{ user.name }}</h1>

  </div>
</template>

<script>
export default {
    name: 'Tile6',
    data: function() {
        return {
            message: "",
            message2: "",
            checked: false,
            checkedNames: [],
            picked: "",
            selected: "",
            selectedMulti: [],
            options: [
                { text: 'One - A', value: 'A' },
                { text: 'Two - B', value: 'B' },
                { text: 'Three - C', value: 'C' }
            ],
            selectedWithFor: '',
            selected2: {},
            msg: '',
            age: 0,
            msg2: ''
        }
    },
    props: {
        user: Object
    },
    methods: {
        func1: function() {
            console.log('Hello form func1')
        },
        func2: function(event) {
            console.log(event.target.value)
        }
    }
}
</script>

<style>

</style>