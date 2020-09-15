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
                url: "https://www.mattpilcher.co.uk"
            }
        }
    }
</script>

<style>

</style>