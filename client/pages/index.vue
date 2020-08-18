<template>
  <div>
    <section class="hero is-fullheight is-info">
      <div class="hero-head">
        <Navi/>
      </div>
      <div class="hero-body">
        <div style="max-width: 768px">
          <h1 class="title is-size-4-mobile is-size-2-tablet">Share your secrets securely</h1>
          <p class="is-size-4-tablet">1time.pw it's like snapchat for secrets. Need to send a password? Love
            Note? Haiku? This is the place.</p>

          <br>
          <form v-on:submit.prevent="generateLink">
            <b-field label="Message" class="has-text-left">
              <b-input type="textarea" v-model="message"
                       :placeholder="`Your eyes are fire.\nTheir image burnt into my soul,\nScarred by beauty.`"
                       required/>
            </b-field>

            <b-field label="Expiration">
              <b-select v-model="expiry" placeholder="Please set an expiry" expanded required>
                <option
                  v-for="option in expiryOpts"
                  :value="option.val"
                  :key="option.val">
                  {{ option.text }}
                </option>
              </b-select>
            </b-field>

            <b-field v-if="showPassword" :addons="false" label="Password"
                     :type="`${(confirmPassphrase !== passphrase && confirmPassphrase !== '' && passphrase !== '') ? 'is-danger' : ''}`"
                     :message="`${(confirmPassphrase !== passphrase && confirmPassphrase !== '' && passphrase !== '') ? 'Passwords dont match' : ''}`">
              <b-input v-model="passphrase" placeholder="Password" type="password" expanded/>
              <br>
              <b-input v-model="confirmPassphrase" placeholder="Confirm password" type="password" expanded/>

            </b-field>

            <b-field>
              <b-checkbox v-model="showPassword" type="is-warning">Password protect my note</b-checkbox>
            </b-field>

            <b-field grouped>
              <p class="control">
                <b-button native-type="submit" size="is-medium" type="is-dark is-pulled-right">share</b-button>
              </p>
              <!--              <p class="control">-->
              <!--                <b-button size="is-medium" type="is-warning" @click="generatePassword">generate password</b-button>-->
              <!--              </p>-->
            </b-field>
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
        confirmPassphrase: '',
        showPassword: false,
        expiry: null,
        expiryOpts: [
          {text: '1 hour', val: 60 * 60},
          {text: '2 hours', val: 60 * 60 * 2},
          {text: '3 hours', val: 60 * 60 * 3},
          {text: '6 hours', val: 60 * 60 * 6},
          {text: '12 hours', val: 60 * 60 * 12},
          {text: '1 Day', val: 60 * 60 * 24},
          {text: '2 Days', val: 60 * 60 * 24 * 2},
          {text: '3 Days', val: 60 * 60 * 24 * 3},
          {text: '4 Days', val: 60 * 60 * 24 * 4},
          {text: '5 Days', val: 60 * 60 * 24 * 5},
          {text: '6 Days', val: 60 * 60 * 24 * 6},
          {text: '1 week', val: 60 * 60 * 24 * 7},
          {text: '2 weeks', val: 60 * 60 * 24 * 14},
        ],
        activeStep: 3,
        url: ''
      }
    },
    methods: {
      generateLink() {
        if (this.confirmPassphrase !== this.passphrase && this.showPassword) {
          return this.alertMsg('Please correct your password!', 'danger')
        }

        let key = this.$CryptoJS.lib.WordArray.random(1024 / 8).toString();
        let encrypted = this.$CryptoJS.AES.encrypt(this.message, this.passphrase + key).toString();
        let hash = this.$CryptoJS.SHA256(encrypted).toString();
        let url = this.url = window.location.protocol + '//' + window.location.host + '/d#' + (!!this.passphrase ? '#' : '') + encrypted;
        this.url = url;


        this.$axios.post('/key', {hash: hash, key: key, expiry: this.expiry}).then(res => {
          this.$buefy.snackbar.open({
            message: `<a href="${url}" class="has-text-light" style="overflow-wrap: anywhere; text-align: center;">${url}</a>`,
            type: 'is-info',
            position: 'is-top',
            actionText: 'Copy',
            indefinite: true,
            onAction: () => {
              this.copyData();
              this.alertMsg('Copied!', 'success')
            }
          })
        }).catch(err => {
          this.alertMsg('An error occurred!\nPlease try again later', 'danger')
        })
      },
      copyData() {
        let textToCopy = document.querySelector('#copyThis');
        textToCopy.setAttribute('type', 'text');
        textToCopy.select();

        try {
          document.execCommand('copy');
        } catch (err) {
          return this.alertMsg('Oops, unable to copy!', 'danger');
        }
        this.alertMsg('Copied', 'success');
        /* unselect the range */
        textToCopy.setAttribute('type', 'hidden');
        window.getSelection().removeAllRanges();
      },
      generatePassword() {
        this.message = String.fromCodePoint(...Array.from({length: 128}, () => Math.floor(Math.random() * 123))).replace(/[^\w\d\#\!\-\_\=\+\@\$\%\&\.\*]/g, '').slice(0 - (Math.random() * 20 + 12)).toString()
      },
      alertMsg(msg, type, duration) {
        this.$buefy.toast.open({
          message: msg,
          type: `is-${type || 'dark'}`,
          duration: duration || 3000
        })
      }
    },
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

  .buttons.is-expanded {
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
  }

  .buttons.is-expanded .button {
    width: 100%;
  }


  >>> .b-checkbox.checkbox input[type=checkbox] + .check {
    border: 1px solid white;
  }

  >>> .control-label:hover {
    color: white;
  }
</style>
