<template>
  <div class='body'>
    <div class="warp">
      <div class="native"><navigation></navigation></div>
    </div>

  </div>
</template>

<script>
import navigation from '@/components/navigation'
export default {
  components: { navigation },
  name: 'index',
  data () {
    return {

    }
  },
  computed: {},
  methods: {

  },
  mounted () {
  },
  destroyed () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .body{
   /* background: #ccc; */
 }
</style>
