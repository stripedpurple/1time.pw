<template>
  <div>
    <section class="hero is-fullheight is-info">
      <div class="hero-body" style="flex-flow: row-reverse;">
        <div style="max-width: 600px" class="has-text-right">
          <h1 class="title">Share your secrets securely</h1>
          <p>1time.pw is a like snapchat for passwords and other secrets you need to share. </p>

          <br>
          <b-field label="Message" class="has-text-left">
            <b-input type="textarea"/>
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

          <b-button type="is-light is-outlined"> share</b-button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam aspernatur assumenda culpa cum cumque
            deleniti deserunt nihil nisi non, perspiciatis quis quisquam saepe ullam ut! Blanditiis nesciunt provident
            reiciendis.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam aspernatur assumenda culpa cum cumque
            deleniti deserunt nihil nisi non, perspiciatis quis quisquam saepe ullam ut! Blanditiis nesciunt provident
            reiciendis.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam aspernatur assumenda culpa cum cumque
            deleniti deserunt nihil nisi non, perspiciatis quis quisquam saepe ullam ut! Blanditiis nesciunt provident
            reiciendis.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam aspernatur assumenda culpa cum cumque
            deleniti deserunt nihil nisi non, perspiciatis quis quisquam saepe ullam ut! Blanditiis nesciunt provident
            reiciendis.
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
        expiryOpts: [
          {text: '1 hour', val: 60*60},
          {text: '12 hours', val: 60*60*12},
          {text: '1 Day', val: 60*60*24},
          {text: '1 week', val: 60*60*24*7},
          {text: '2 weeks', val: 60*60*24*14},
        ]
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

  body.has-navbar-fixed-top {
    padding: 0;
  }
</style>
