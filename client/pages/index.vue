<template>
  <div>
    <section class="hero is-fullheight is-info">
      <div class="hero-head">
        <b-navbar type="is-info" transparent>
          <template slot="brand">
            <b-navbar-item tag="nuxt-link" to="/">
              <span class="title has-text-white is-size-4">1TIME.PW</span>
            </b-navbar-item>
          </template>

          <template slot="end">
            <b-navbar-item tag='a' href="#about">About</b-navbar-item>
            <b-navbar-item tag='a' href="#how">How it works?</b-navbar-item>
            <b-navbar-item tag='a' href="#donate">Donate</b-navbar-item>
          </template>
        </b-navbar>
      </div>
      <div class="hero-body">
        <div style="max-width: 600px">
          <h1 class="title">Share your secrets securely</h1>
          <p class="is-size-5">1time.pw it's like snapchat for secrets. Need to send a password? Love
            Note? Haiku? This is the place.</p>

          <br>
          <form v-on:submit.prevent="generateLink">
            <b-field label="Message" class="has-text-left">
              <b-input type="textarea" v-model="message"
                       :placeholder="`Your eyes are fire.\nTheir image burnt into my soul,\nScarred by beauty.`"
                       required/>
            </b-field>

            <b-field label="Expires in" class="has-text-left">
              <b-select v-model="expiry" placeholder="Please set expiry" expanded>
                <option
                  v-for="option in expiryOpts"
                  :value="option.val"
                  :key="option.val">
                  {{ option.text }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Passphrase">
              <b-input v-model="passphrase" placeholder="Optional password" type="password"/>
            </b-field>

            <div class="buttons is-expanded">
              <b-button tag="a" type="is-warning is-light" @click="generatePassword">generate password</b-button>
              <b-button tag="a" type="is-dark is-pulled-right" @click="generateLink">share</b-button>
            </div>
          </form>

        </div>
      </div>
    </section>

    <HomeBodyCopy/>

    <input type="hidden" :value="url" id="copyThis">
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        window: '',
        message: '',
        key: '',
        passphrase: '',
        expiry: 3600,
        expiryOpts: [
          {text: '1 hour', val: 60 * 60},
          {text: '2 hour', val: 60 * 60 * 2},
          {text: '3 hour', val: 60 * 60 * 3},
          {text: '6 hour', val: 60 * 60 * 6},
          {text: '12 hours', val: 60 * 60 * 12},
          {text: '1 Day', val: 60 * 60 * 24},
          {text: '2 Day', val: 60 * 60 * 24 * 2},
          {text: '3 Day', val: 60 * 60 * 24 * 3},
          {text: '4 Day', val: 60 * 60 * 24 * 4},
          {text: '5 Day', val: 60 * 60 * 24 * 5},
          {text: '6 Day', val: 60 * 60 * 24 * 6},
          {text: '1 week', val: 60 * 60 * 24 * 7},
          {text: '2 weeks', val: 60 * 60 * 24 * 14},
        ],
        activeStep: 3,
        url: ''
      }
    },
    methods: {
      generateLink() {
        let key = this.$CryptoJS.lib.WordArray.random(1024 / 8).toString();
        let encrypted = this.$CryptoJS.AES.encrypt(this.message, this.passphrase + key).toString();
        let hash = this.$CryptoJS.SHA256(encrypted).toString();
        let url = this.url = window.location.protocol + '//' + window.location.host + '/d#' + (!!this.passphrase ? '#' : '') + encrypted;
        this.url = url;

        console.log({hash: hash, key: key, expiry: this.expiry})

        this.$axios.post('/key', {hash: hash, key: key, expiry: this.expiry}).then(res => {
          console.log(res);
          this.$buefy.snackbar.open({
            message: `<p style="overflow-wrap: anywhere; text-align: center;">${url}</p>`,
            type: 'is-info',
            position: 'is-top',
            actionText: 'Copy',
            indefinite: true,
            onAction: () => {
              this.copyData()
              this.$buefy.toast.open({
                message: 'Copied!',
                queue: false,
                type: 'is-success'
              })
            }
          })
        }).catch(err => {
          this.$buefy.toast.open({type: 'is-danger', message: 'An error occurred!\nPlease try again later'})
        })
      },
      copyData() {
        let textToCopy = document.querySelector('#copyThis');
        textToCopy.setAttribute('type', 'text');
        textToCopy.select();

        try {
          document.execCommand('copy');
        } catch (err) {
          return this.$buefy.toast.open({
            message: 'Oops, unable to copy!',
            type: 'is-danger'
          });
        }
        this.$buefy.toast.open({
          message: 'Copied',
          type: 'is-success'
        });
        /* unselect the range */
        textToCopy.setAttribute('type', 'hidden');
        window.getSelection().removeAllRanges();
      },
      generatePassword() {
        this.message = String.fromCodePoint(...Array.from({length: 128}, () => Math.floor(Math.random() * 123))).replace(/[^\w\d\#\!\-\_\=\+\@\$\%\&\.\*]/g, '').slice(0 - (Math.random() * 20 + 12)).toString()
      }
    },
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

  .buttons.is-expanded {
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
  }

  .buttons.is-expanded .button {
    width: 100%;
  }

</style>
