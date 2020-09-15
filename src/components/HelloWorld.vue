<template>
<div>
  <h1>{{count}}</h1>

  <!-- having v-once means this will NOT update on data change, this will affect all child nodes -->
  <div v-once>
    <p>{{count}}</p>
    <p>{{count}}</p>
  </div>
  <input class="border mb-4" v-model="inputText">
  <p><span>Text is: </span>{{ inputText }}</p>
  
  <hr />
  <p>{{rawHtml}}</p>
  <!-- This will = <span><span class='text-red-600'>Hello</span></span> -->
  <!-- v-html  -->
  <span v-html="rawHtml">Anything in here will be replaced completely</span>
  <!-- Can just do it as... in that case -->
  <span v-html="rawHtml" />
  <hr />
  <!-- boolean attributes -->
  <button v-on:click="disabledTest()" class="btn-blue" v-bind:disabled="isButtonDisabled">Button</button>
  <!-- each binding can only contain one single expression -->
  <p>{{ isButtonDisabled ? "Button Disabled" : "Button Not Disabled" }}</p>
  
  <img src="" v-bind:alt="msg" />
  <Tile v-bind:msg="msg" />
</div>
</template>

<script>
import Tile from './Tile'

export default {
  name: 'HelloWorld',
  components: {
    Tile
  },
  data: function() {
    return {
      inputText: "",
      rawHtml: "<span class='text-red-600'>Hello</span>",
      isButtonDisabled: false
    }
  },
  // Lifecycle Hooks - https://vuejs.org/images/lifecycle.png
  beforeCreate: function () {
    console.log('Before Create')
  },
  created: function() {
    console.log('Created' + this.$data)
  },
  beforeMount: function() {
    console.log('Before Mount')
  },
  mounted: function() {
    console.log('mounted')
  },
  beforeUpdate: function() {
    console.log('Before Update')
  },
  updated: function() {
    console.log('Updated')
  },
  // When $destroy is called
  beforeDestroy: function() {
    console.log('beforeDestroy')
  },
  destroyed: function() {
    console.log('destroyed')
  },
  props: {
    msg: String,
    count: Number
  },
  methods: {
    disabledTest: function() {
      console.log('DisabledTest')
      this.isButtonDisabled = !this.isButtonDisabled;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
