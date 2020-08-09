<template>
  <b-navbar type="is-info" transparent>
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" to="/">
        <span class="title has-text-white is-size-4">1TIME.PW</span>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag='nuxt-link' to="/#about">About</b-navbar-item>
      <b-navbar-item tag='nuxt-link' to="/#how">How it works?</b-navbar-item>
      <b-navbar-item tag='nuxt-link' to="/#donate">Donate</b-navbar-item>
      <b-navbar-item tag='nuxt-link' to="/stats">Stats</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
    export default {
        name: "Navi"
    }
</script>

<style scoped>
  .navbar.is-info{
    background: #167df0 url("/pattern-clipart-triangle-pattern-triangle-transparent-free-for-triangle-pattern-png-2400_2400.png") center center repeat;
    background-attachment: fixed;
  }

</style>
