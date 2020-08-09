<template>
  <div>
    <Navi/>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="box has-background-info">
              <p class="is-size-1 has-text-white">{{stats.total}}</p>
              <p class="has-text-light">total links served</p>
            </div>
          </div>
          <div class="column">
            <div class="box has-background-info">
              <p class="is-size-1 has-text-white">{{stats.active}}</p>
              <p class="has-text-light">total active links</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "stats",
    data() {
      return {
        stats: {
          total: '',
          active: ''
        }
      }
    },
    mounted() {
      this.$axios.get('/stats').then(res => {
        this.stats = res.data
      })
    },
  }
</script>

<style scoped>
  .box {
    background: #167df0 url("/pattern-clipart-triangle-pattern-triangle-transparent-free-for-triangle-pattern-png-2400_2400.png") center center repeat;
    background-attachment: fixed;
  }
</style>
