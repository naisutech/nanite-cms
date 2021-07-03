<script type="text/typescript">
  import { fly, fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import LogoPrimary from '../../static/images/LogoPrimary.svg'
  import env from '../config/ClientEnvironment'
  import { stores } from '@sapper/app'
  import NaniteButton from '../components/controls/NaniteButton.svelte'
  import Control from '../components/form/Control.svelte'
  import type { SessionData } from 'express-session'

  // page rendering
  let formVisibible = false
  onMount(() => {
    formVisibible = true
  })

  // form location
  const basePath = env.CMS_BASE_PATH
  const loginFormPath = `${basePath}/login`

  const { session } = stores()
  let errorMessage = null
  session.subscribe((val: SessionData) => {
    // handle flash errors
    const error = val.flash && val.flash.error ? val.flash.error : null
    errorMessage = error && error.length > 0 ? error[error.length - 1] : null
  })
</script>

{#if formVisibible}
  <div
    class="nanite-bg-container position absolute fill-container gradient-1"
    in:fade={{ duration: 300 }}
  />
  <div class="flex-items fill flex column justify-center align-center">
    <div class="nanite-auth-form-wrapper position relative flex column">
      <div class="nanite-logo-watermark position absolute layer-1">
        <img alt="Nanite CMS Logo" src={LogoPrimary} />
      </div>

      <section
        class="nanite-auth-form-container glass position relative layer-2 flex column align-center"
        in:fly={{ y: 400, duration: 500, delay: 300 }}
      >
        <div class="responsive-image" style="--ratio: 4.1/1">
          <div>
            <img alt="Nanite CMS Logo" src="./images/LogoFull.svg" />
          </div>
        </div>

        <div class="form-row">
          <p class="text text-center">Please authenticate yourself</p>
        </div>

        <div class="form-row">
          <form method="POST" action={loginFormPath} class="flex column">
            <Control
              name="username"
              label="Username"
              placeholder="admin"
              containerStyles="margin: 8px 0"
              autocomplete="off"
            />
            <Control
              name="password"
              label="Password"
              placeholder="opensesame"
              type="password"
              containerStyles="margin: 8px 0 12px"
              autocomplete="off"
            />
            <NaniteButton type="submit" text="Log in" fill />
          </form>
        </div>

        <div class="form-row">
          {#if errorMessage}
            <div class="error-message-wrapper">
              <span>ERROR: {errorMessage}</span>
            </div>
          {/if}
        </div>
      </section>
    </div>
  </div>
{/if}

<style>
  .nanite-logo-watermark {
    top: -60vh;
    height: 150vh;
    width: 150vh;
    align-self: center;
    opacity: 0.9;
    left: -195%;
  }

  .nanite-bg-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .nanite-auth-form-wrapper {
    max-width: 480px;
    padding: 10px;
  }

  /*
  * Main Login Box
  */
  .nanite-auth-form-container {
    padding: 36px;
  }

  @media screen and (max-width: 640px) {
    .nanite-auth-form-container {
      padding: 24px;
    }
  }

  .form-row {
    width: 100%;
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
  }

  .error-message-wrapper {
    margin: 8px 0;
    padding: 8px;
    background-color: var(--col-light);
  }

  .error-message-wrapper span {
    color: var(--col-nanite-1);
    font-weight: 700;
    font-size: var(--fnt-s);
  }
</style>
