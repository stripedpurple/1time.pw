<template>
  <div >
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
