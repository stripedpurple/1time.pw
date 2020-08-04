<template>
  <div class="main-content">
    <nuxt/>
    <section class="footer has-background-dark has-text-light"><div class="container">
      <footer>
        &copy; Austin Barrett&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Made with
        <b-icon icon="heart" class="has-text-danger"/>
        by
        <a class="has-text-info" href="//stripedpurple.io" target="_blank" rel="noopener nofollow">Striped Purple</a>
      </footer>
    </div></section>
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

<style>
  .footer {
    vertical-align: center;
  }
</style>
