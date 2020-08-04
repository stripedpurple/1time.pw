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
          <b-field label="Message" class="has-text-left">
            <b-input type="textarea" v-model="messege" :placeholder="`Your eyes are fire.\nTheir image burnt into my soul,\nScarred by beauty.`"/>
          </b-field>

          <b-field label="Expires in" class="has-text-left">
            <b-select placeholder="Select a name" expanded>
              <option
                v-for="option in expiryOpts"
                :value="option.val"
                :key="option.val">
                {{ option.text }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Passphrase">
            <b-input v-model="passphrase" placeholder="Optional password"/>
          </b-field>

          <b-button type="is-light is-outlined"> share</b-button>

          {{encodedMessage}}
        </div>
      </div>
    </section>

    <section class="section has-background-light" id="about">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title">About</h2>
            <p>1time.pw is a simple tool for securely share passwords, message, and other text. Message self destruct
              after its specified expiration time.
              Messages are never sent to the server. Encryption is done completely client side. In order to enforce the
              expiration time, the encryption key is stored on the server. The actual encrypted message is stored in the
              URL.</p>
            <br>

            <p>Note that this service is not intended to store large amounts of data (only short messages such as
              passwords). As URL lengths are often limited, you may only have up to 2k characters in certain browsers.
              You should use other forms of encryption for anything super sensitive or larger in size.</p>

          </div>
        </div>
      </div>
    </section>

    <section class="section" id="how">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title is-size-4 has-text-centered">How it works?</h2>

            <b-steps v-model="activeStep" :has-navigation="false" mobile-mode="compact" type="is-info">
              <b-step-item step="1" label="Add Text" clickable>
              </b-step-item>

              <b-step-item step="2" label="Set Expiration" clickable>
              </b-step-item>

              <b-step-item step="3" label="Share" clickable></b-step-item>
            </b-steps>

            <h4 class="title is-size-5">Technical Details</h4>
            <p><strong>Encryption:</strong></p>
            <div class="content">
              <ul>
                <li>A random encryption key is generated on the client side.</li>
                <li>Your message is encrypted with the randomly generated key (and your password if specified)</li>
                <li>The client hashes the encrypted message.</li>
                <li>The client sends both the hash and the encryption key to the server for storage.</li>
                <li>At this point, you may share the encrypted message.</li>
              </ul>
            </div>


            <p><strong>Decryption:</strong></p>
            <div class="content">
              <ul>
                <li>The client hashes the encrypted message.</li>
                <li>The client sends the hash to the server and gets back the encryption key.</li>
                <li>The client decrypts the message.</li>
              </ul>
            </div>
            <p><strong>Security Specifics</strong></p>
            <p>We use AES for encryption and SHA-256 for hashing. The server uses a simple Redis store for mapping the
              hashes to encryption keys. Expiration is done using the native Redis expiration feature.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section has-background-light" id="donate">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title">Help pay the bills or buy me a cup of coffee</h2>

            <p class="is-size-4">Though this service is free to use, it is not free to operate. Servers, databases,
              time, etc all adds up fast. You can help keep this free by donating to me on
              <a class="has-text-info" href="https://ko-fi.com/stripedpurple" target="_blank" rel="noopener nofollow">Ko-fi.com</a>
            </p>
            <br>
            <a class="has-text-info" href='https://ko-fi.com/F1F61H9SP' rel="noopener nofollow" target='_blank'>
              <img height='50'
                   style='border:0px;height:50px;'
                   src='https://cdn.ko-fi.com/cdn/kofi1.png?v=2'
                   border='0'
                   alt='Buy Me a Coffee at ko-fi.com'/></a>

            <p></p>
          </div>
        </div>
      </div>
    </section>

    <section class="section has-background-grey-lighter">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title">Analytics and Adverts</h2>
            <p>A quick note on analytics and advertisements. It is our promise that we will never serve ads, or collect
              your data.</p>
            <p>We do however use a very minimal version of Google Analytics call
              <a class="has-text-info" href="https://minimalanalytics.com/" target="_blank" rel="noopener nofollow">Minimal
                Google Analytics Snippet</a>. We only use it to keep a record of how many people view the site. This
              helps us plan for scalability</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>


  export default {
    name: 'Home',
    data() {
      return {
        window: '',
        messege: '',
        key: '',
        passphrase: '',
        expiryOpts: [
          {text: '1 hour', val: 60 * 60},
          {text: '2 hour', val: 60 * 60 *2},
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
      }
    },
    computed: {
      encodedMessage(){
        let encrypted = this.$CryptoJS.AES.encrypt(this.messege, this.passphrase +  this.generateKey()).toString()
        return this.$CryptoJS.enc.Base64.stringify(this.enc.Utf8.parse(encrypted))
      }
    },
    methods: {
      generateKey: function () {
        // https://medium.com/@dazcyril/generating-cryptographic-random-state-in-javascript-in-the-browser-c538b3daae50
        const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let array = new Uint8Array(256);
        this.window.crypto.getRandomValues(array);
        array = array.map(x => validChars.charCodeAt(x % validChars.length));
        return String.fromCharCode.apply(null, array);
      }
    },
    created() {
      if (process.client || process.browser) {
        this.window =  window;
      }
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
