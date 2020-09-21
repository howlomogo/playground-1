<template>
  <div>
      <!-- custom event name must be kebab case not camel -->
      <!-- matts-func3 recieves $event (which is 10) from the $emits 2nd param -->
      <!-- matts-func2 recieves countValue (in method which is 5) from $emits 2nd param -->
      <Tile72
        v-on:matts-func="func1"
        v-on:matts-func2="func2"
        v-on:matts-func3="count2 += $event"
        v-bind:hello="func1"
        />
      <h1>{{ count2 }}</h1>

      <br />
      <hr />
      <!-- The content inside Tile73 will be placed whereever <slot></slot>
      is within Tile73, it can be html, another component or just any content
      -->
      <!-- Docs say to use kebab case for props, however camelCase here works? -->
      <!-- Passing numbers, we need to v-bind if a number otherwise it will be a string -->
      <!-- Passing booleans, we need to v-bind otherwise it will be a string -->
      <!-- Array need to v-bind otherwise String -->
      <!-- Object need to v-bind otherwise String -->
      <Tile73
        v-bind:testPropName="testProp.name + ' Is my name'"
        v-bind:testPropAge="testProp.age"
        testPropAgeString="testProp.age"
        testPropBool
        v-bind:testPropBool2="false"
        v-bind:testArr="['Cheese', 'Flower', 'Playstation']"
        v-bind:testProp="testProp"
      >
          <!-- Hello there! is added inside <slot></slot>, if <slot> is not in the component this content is just disgarded -->
          HELLO THERE!
      </Tile73>

      <br />
      <hr />

    <div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>



    <!-- Sometimes, it’s useful to dynamically switch between components,
    like in a tabbed interface, you can do this using vues <component> element
        with the 'is' special attribute-->
        <!-- you can also do this with objects. https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-dynamic-components-with-binding -->
      <component v-bind:is="currentTab" class="tab"></component>
    </div>

    <br />
    <!-- You can add native events to the root of a component from the parent like below
    by using the v-on native, here focus the input to change border color, This isn't really
    a good idea though as the component structure may be change at some point -->
    <Tile74 v-on:focus.native="inputFocused($event)" />
    <!-- To solve this however, -->

    <br />
  </div>
</template>

<script>
import Tile72 from './Tile72'
import Tile73 from './Tile73'
import Tile74 from './Tile74'

// These do NOT have to be in the same folder btw
import Tab1 from './tabs/Tab1'
import Tab2 from './tabs/Tab2'
import Tab3 from './tabs/Tab3'

export default {
    name: 'Tile7',
    data: function() {
        return {
            count2: 0,
            currentTab: "Tab1",
            tabs: ["Tab1", "Tab2", "Tab3"],
            testProp: {
              name: "Matt",
              age: 33
            }
        }
    },
    components: {
        Tile72,
        Tile73,
        Tile74,
        Tab1,
        Tab2,
        Tab3
    },
    methods: {
        func1: function() {
            this.count2++;
        },
        func2: function(countValue) {
            // The countValue here is the $emits 2nd param, in this case an array [1, 10, 5]
            console.log(countValue)
            this.count2+=countValue[2];
        },
        inputFocused: function(event) {
          console.log(event.target)
          event.target.classList.add("border-red-500")
          console.log('FOCUSED')
        }
    }
}
</script>

<style>
      .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
      }
      .tab-button:hover {
        background: #e0e0e0;
      }
      .tab-button.active {
        background: #e0e0e0;
      }
      .tab {
        border: 1px solid #ccc;
        padding: 10px;
      }
</style>