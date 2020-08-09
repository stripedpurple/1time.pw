<template>
  <div>
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
  data() {
    return {
      activeStep: 3,
    }
  }
}
</script>

<style scoped>
  @media screen and (max-width: 768px) {
    >>> .b-steps:not(.is-vertical) .steps.mobile-compact .step-items .step-item:not(.is-active) .step-details {
      display: block !important;
    }
  }
</style>
