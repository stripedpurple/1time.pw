<template>
  <div class="main-content">
    <section class="has-text-centered has-background-dark has-text-white">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p style="margin: 5px 0">Support <a style="text-decoration: underline" class="has-text-warning has-text-white is-underline"
                          href="https://blacklivesmatter.com/">#BlackLivesMatter</a> and the
              <a style="text-decoration: underline" class="has-text-warning has-text-white is-underline"
                 href="https://support.eji.org/give/153413/#!/donation/checkout">Equal Justice Initiative</a>.</p>

          </div>
        </div>
      </div>
    </section>
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
  ::-webkit-scrollbar {
    display: none;
  }

  body {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
