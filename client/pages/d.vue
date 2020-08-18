<template>
  <section class="hero is-fullheight is-info">
    <div class="hero-head">
      <Navi/>
    </div>
    <div class="hero-body">
      <div style="max-width: 768px; width: 100%;">
        <h1 class="title is-size-2-tablet">
          {{ !message ? 'Show my secret!' : 'Secrets ahoy!' }}
        </h1>
        <p class="is-size-4">
          {{ !message ? 'You can only view your message once, so be sure to save any data you need.' : 'Don\'t forget to save your data'}}
        </p>

        <br>
        <form @submit.prevent="viewMessage">
          <b-field label="Message" class="has-text-left" v-if="!!message">
            <b-input type="textarea" v-model="message" id="copyThis"
                     :placeholder="`Your eyes are fire.\nTheir image burnt into my soul,\nScarred by beauty.`"/>
          </b-field>


          <b-field label="Enter your password to view" v-show="viewPassword && !message">
            <b-input v-model="passphrase" type="password" :required="viewPassword"/>
          </b-field>

          <b-button type="is-dark is-fullwidth" size="is-medium" native-type="submit" v-show="!message">view</b-button>
          <b-button type="is-dark is-fullwidth" size="is-medium" @click="copyData" v-show="!!message">copy data
          </b-button>
        </form>

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
        if (process.browser) {
          let encrypted = this.$route.hash.replace(/#/g, '');
          let hash = this.$CryptoJS.SHA256(encrypted).toString();

          if (this.key){
            this.message = this.$CryptoJS.AES.decrypt(encrypted, this.passphrase + this.key).toString(this.$CryptoJS.enc.Utf8)

            if (!this.message) {
              return this.$buefy.toast.open({type: 'is-danger', message: 'Incorrect password! Please try again'})
            }
            localStorage.removeItem('key')
            return
          }

          this.$axios.get(`/key/${hash}`).then(res => {
            if (res.status !== 200)
              return this.$buefy.toast.open({
                type: 'is-danger',
                message: 'Message has expired 😔',
                duration: 5000
              });

            this.key = res.data;
            localStorage.setItem("key", res.data);
            this.message = this.$CryptoJS.AES.decrypt(encrypted, this.passphrase + this.key).toString(this.$CryptoJS.enc.Utf8)

            if (!!this.message) {
              localStorage.removeItem('key')
            }
          }).catch(err => {
            return this.$buefy.toast.open({type: 'is-danger', message: 'An error occurred!\nPlease try again later'})
          })
        }
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
      this.key = localStorage.getItem('key')
    }
  }
</script>

<style scoped>
  >>> .label {
    color: inherit;
  }

  .hero {
    background: #167df0 url("/pattern-clipart-triangle-pattern-triangle-transparent-free-for-triangle-pattern-png-2400_2400.png") center center repeat;
    background-attachment: fixed;
  }

  @media screen and (min-width: 769px) {
    .hero-body {
      padding-left: 10vw;
      padding-right: 10vw;
    }
  }
</style>
