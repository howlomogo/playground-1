<template>
  <div id="app">
    <Nav />
    <div class="container ml-auto mr-auto">
      <!-- Routes -->
      <HelloWorld
        v-bind:msg="msg"
        v-bind:count="count"
      />
      <!-- You can pass event with $event -->
      <button
        v-on:click="amendCount(3, $event, 4)"
        class="btn-blue"
      >
        Click Me!
      </button>

      <button
        v-on:click="count++"
        class="btn-blue"
      >
        Click Me to increase count
      </button>

      <hr class="my-6" />

      <!-- You can apply classes, v-bind:classes directly to components,
      this will be on the root element of that component -->
      <Tile2 class="bg-red-300"/>

      <hr class="my-6" />
      <Tile3 />

      <hr class="my-6" />

      <Tile4 />

      <hr class="my-6" />

      <Tile5 />

      <hr class="my-6" />
      <!-- Pass user prop -->
      <Tile6 v-bind:user="{ name: 'Matt'}" />

      <Tile7 />

      <!-- Need to bind object, This will just pass as a string  -->
      <!-- <Tile6 user="{ name: 'Matt'}" /> -->


      <hr class="my-6" />

      <Tile8 />
      <hr class="my-6" />
      <hr class="my-6" />
      <hr class="my-6" />
      <hr class="my-6" />
      <hr class="my-6" />
      <hr class="my-6" />

      <div class="flex flex-row flex-wrap">
        <div class="card" v-for="item in items" v-bind:key="item.key">
          <h2>Name: {{ item.name }}</h2>
          <h3>Age: {{ item.age }}</h3>
          <h3>Description: {{ item.desc }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Nav from './components/Nav'
import Tile2 from './components/Tile2'
import Tile3 from './components/Tile3'
import Tile4 from './components/Tile4'
import Tile5 from './components/Tile5'
import Tile6 from './components/Tile6'
import Tile7 from './components/Tile7'
import Tile8 from './components/Tile8'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Nav,
    Tile2,
    Tile3,
    Tile4,
    Tile5,
    Tile6,
    Tile7,
    Tile8
  },
  watch: {
    count: function(val, oldVal) {
      console.log('val = ' + val)
      console.log('oldVal = ' + oldVal)
    }
  },
  data: function() {
    return {
      count: 0,
      msg: "Hello",
      items: [
        {
          id: "1",
          name: "Matthew David Pilcher",
          age: "23",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum lacinia quis vel eros donec ac odio."
        },
        {
          id: "2",
          name: "Ben James Pilcher",
          age: "30",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          id:"3",
          name: "Christine Jayne Pilcher",
          age: "44",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim."
        },
        {
          id: "4",
          name: "Robert Edward Pilcher",
          age: "64",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim sodales ut eu sem integer vitae justo eget."
        }
      ]
    }
  },
  methods: {
    // Don't use arrow functions here as "this" WONT work
    amendCount: function(num, event, num2) {
      console.log(event.target)
      console.log(num + ' ' + num2)
      this.items.push(
        {
          id: "5",
          name: "Qing Zhang",
          age: "100",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim sodales ut eu sem integer vitae justo eget."
        }
      )
      this.secondFunc('hello')
      console.log(this)
    },
    secondFunc: function(arg1) {
      console.log('Calling secondFunc ' + arg1)
    }
  }
}
</script>

<style>
  /* You CAN (Not required) tell tailwind which bucket to put the custom styles in
  i.e. base, components, utilities, by using @layer
  for example here I'm putting the btn class in components because it's a component
  */
  @layer components {
    .btn-blue {
      @apply m-2 bg-blue-500 py-2 px-4 rounded-full font-light shadow;
      color: green;
    }
    .btn-blue:hover {
      @apply bg-myfavcolour shadow-md;
    }
    .btn-blue:focus {
      @apply outline-none;
    }

    .card {
      @apply bg-purple-200 border-purple-800 border border-solid mx-2 mb-2 flex-grow py-4 px-2;
      width: 320px;
    }
  }
</style>
