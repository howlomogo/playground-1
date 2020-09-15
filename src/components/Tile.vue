<template>
  <div>
      <div class="bg-blue bg-gray-500 h-64 border-1 flex justify-center items-center">
          <h1>{{ msg }}</h1>
      </div>
  </div>
</template>

<script>
    export default {
        name: 'Tile',
        props: {
            msg: String
        }
    }
</script>

<style>

</style>