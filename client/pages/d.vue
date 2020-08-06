<template>
  <section class="hero is-fullheight is-info">
    <div class="hero-head">
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
        </template>
      </b-navbar>
    </div>
    <div class="hero-body">
      <div style="max-width: 600px">
        <h1 class="title">Show my secret!</h1>
        <p class="is-size-5">You can only view your message once, so be sure to save any data you need.</p>

        <br>
        <b-field label="Message" class="has-text-left" v-if="!!message">
          <b-input type="textarea" v-model="message"
                   :placeholder="`Your eyes are fire.\nTheir image burnt into my soul,\nScarred by beauty.`"/>
        </b-field>


        <b-field label="Enter your password to view" v-show="viewPassword && !message">
          <b-input v-model="passphrase" type="password"/>
        </b-field>

        <b-button type="is-light is-outlined" @click="viewMessage" v-show="!message">view</b-button>

      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        message: '',
        key: '',
        passphrase: '',
        url: '',
        viewPassword: false
      }
    },
    methods: {
      viewMessage() {
        let encrypted = this.$route.hash.replace(/#/g,'');
        let hash = this.$CryptoJS.SHA256(encrypted).toString();
        console.log(hash);
        this.$axios.get(`/key/${hash}`).then(res => {
          if (res.status !== 200)
            return this.$buefy.toast.open({
              type: 'is-danger',
              message: 'Message has expired 😔',
              duration: 5000
            });

          return this.message = this.$CryptoJS.AES.decrypt(encrypted, this.passphrase + res.data.toString()).toString(this.$CryptoJS.enc.Utf8)
        }).catch(err => {
          return this.$buefy.toast.open({type: 'is-danger', message: 'An error occurred!\nPlease try again later'})
        })
      },
      copyData() {
        let textToCopy = document.querySelector('#copyThis');
        textToCopy.setAttribute('type', 'text');
        textToCopy.select();

        try {
          document.execCommand('copy');
          this.$buefy.toast.open({
            message: 'Copied',
            type: 'is-success'
          });
        } catch (err) {
          this.$buefy.toast.open({
            message: 'Oops, unable to copy!',
            type: 'is-danger'
          });
        }

        /* unselect the range */
        textToCopy.setAttribute('type', 'hidden');
        window.getSelection().removeAllRanges();
      },
    },
    mounted() {
      this.viewPassword = this.$route.hash.substring(0, 2) == '##'
    }
  }
</script>

<style>
  .navbar.is-info {
    background: transparent;
  }

  .label {
    color: inherit;
  }

  .hero {
    background: transparent url("/pattern-clipart-triangle-pattern-triangle-transparent-free-for-triangle-pattern-png-2400_2400.png") center center repeat;
    background-attachment: fixed;
  }

  @media screen and (min-width: 769px) {
    .hero-body {
      padding-left: 10vw;
      padding-right: 10vw;
    }
  }

  @media screen and (max-width: 768px) {
    .b-steps:not(.is-vertical) .steps.mobile-compact .step-items .step-item:not(.is-active) .step-details {
      display: block !important;
    }

  }

  body.has-navbar-fixed-top {
    padding: 0;
  }
</style>
