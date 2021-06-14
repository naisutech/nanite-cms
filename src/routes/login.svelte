<script type="text/typescript">
  import env from "../config/ClientEnvironment";
  import { stores } from "@sapper/app";
  import Button from "../components/controls/Button.svelte";
  import Control from "../components/form/Control.svelte";
  import type { SessionData } from "express-session";

  // form location
  const basePath = env.CMS_BASE_PATH;
  const loginFormPath = `${basePath}/login`;

  const { session } = stores();
  let errorMessage = null;
  session.subscribe((val: SessionData) => {
    // handle flash errors
    const error = val.flash && val.flash.error ? val.flash.error : null;
    errorMessage = error && error[0] ? error[0] : null;
  });
</script>

<div class="nanite-auth-container gradient-1">
  <div class="nanite-auth-form-wrapper position relative flex column">
    <div class="nanite-logo-watermark position absolute layer-1">
      <img alt="Nanite CMS Logo" src="./images/Logo.svg" />
    </div>

    <section
      class="nanite-auth-form-container glass position relative layer-2 flex column align-center"
    >
      <div class="form-row">
        <div class="responsive-image" style="--ratio: 4.1/1">
          <div>
            <img alt="Nanite CMS Logo" src="./images/LogoFull.svg" />
          </div>
        </div>
      </div>

      <div class="form-row">
        <p>Please authenticate yourself</p>
      </div>

      <div class="form-row">
        <form method="POST" action={loginFormPath}>
          <Control name="username" label="Username" placeholder="admin" />
          <Control
            name="password"
            label="Password"
            placeholder="opensesame"
            type="password"
          />
          <Button type="submit" text="Go" />
        </form>
      </div>

      <div class="form-row">
        {#if errorMessage}
          <div class="error-message-wrapper">
            <span>{errorMessage}</span>
          </div>
        {/if}
      </div>
    </section>
  </div>
</div>

<style>
  .nanite-logo-watermark {
    top: -60vh;
    height: 150vh;
    width: 150vh;
    align-self: center;
    opacity: 0.9;
    left: -195%;
  }

  .nanite-auth-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .nanite-auth-form-wrapper {
    min-width: 300px;
    max-width: 480px;
    padding: 10px;
  }

  .nanite-auth-form-container {
    padding: 36px;
  }
</style>
