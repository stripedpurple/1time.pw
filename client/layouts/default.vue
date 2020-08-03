<template>
  <div class="main-content">
    <b-navbar type="is-info" fixed-top>
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" to="/">
          <span class="title has-text-white is-size-4">1TIME.PW</span>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="nuxt-link" :to="route.path" v-for="(route, key) in $router.options.routes" style="text-transform: capitalize" :key="key">
          {{route.name | isHome}}
        </b-navbar-item>
      </template>
    </b-navbar>
    <nuxt/>
  </div>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
    }
  },
  filters: {
    isHome: (v) => {
      if (!v) return ''

      return v == 'index' ? 'home' : v
    }
  }
}
</script>
