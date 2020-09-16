<template>
  <div>
      <div class="bg-blue bg-gray-500 h-64 border-1 flex justify-center items-center">
          <h1>{{ msg }}</h1>
          <div v-if="isActive">Is Active</div>
          <button class="btn-blue" v-on:click="isActive = !isActive">Click Me</button>
          <a v-bind:href="url">Website</a>
          <!-- can also be done shorthand by removing the v-bind for on AND bind as...-->
          <a :href="url">Website</a>
          <!-- shorthand for click it's @click -->
          <button class="btn-blue" @click="isActive = !isActive">Click Me</button>
      </div>
      <hr class="my-6" />
      <input v-model="firstName" type="text" class="border" />
      <input v-model="lastName" type="text" class="border" />

      <p>{{ fullname }}</p>
      <p>{{ fullname2() }}</p>
      <p>{{ theFullname }}</p>
      <button class="btn-blue" @click="handleButtonClick()">Handle Button Click</button>
      <hr class="my-6" />
  </div>
</template>

<script>
    export default {
        name: 'Tile',
        props: {
            msg: String
        },
        data: function() {
            return {
                isActive: false,
                url: "https://www.mattpilcher.co.uk",
                firstName: "Matt",
                lastName: "Pilcher",
                theFullname: ""
            }
        },
        computed: {
            // You can't pass arguments into computed
            fullname: {



                // You can write as get / set or just fullname: function() {} - for just get
                get: function() {
                    console.log('hello')
                    return this.firstName + " " + this.lastName;
                },
                set: function(name) {
                    console.log('HELLO')
                    this.theFullname = name
                }
            }
        },
        methods: {
            handleButtonClick: function() {
                // You can call the setter by doing =
                // This isn't a great example doesnt make sense to call a method then,
                // https://medium.com/@Taha_Shashtari/simplify-your-components-with-computed-setters-2f687f193fb0
                // ^ Practical example of how setter can be useful
                this.fullname = 'Bob Pilcher'
            },
            // Notice you can do the exactly same thing with a method - HOWEVER
            // the difference is that computed properties are cached based on their reactive dependencies
            fullname2: function() {
                return this.firstName + " " + this.lastName;
            }
        }
    }
</script>

<style>

</style>