<script type="text/typescript">
  import { goto } from '@sapper/app'
  import Button from '../controls/Button.svelte'
  import env from '../../config/ClientEnvironment.ts'
  const { CMS_BASE_PATH } = env

  export let segment: string

  const pages: NavPage[] = [
    {
      title: 'Site',
      href: '.',
      navPosition: '0%'
    },
    {
      title: 'Pages',
      href: 'pages',
      navPosition: '33.3%'
    },
    {
      title: 'Content',
      href: 'content',
      navPosition: '66.6%'
    }
  ]

  $: pageObj = pages.find((p) => p.href === segment)

  function handleLogout(e: Event) {
    goto(CMS_BASE_PATH + '/logout')
  }

</script>

<nav>
  <div class="left-nav flex row">
    <a href="." class="nav-icon-link flex row align-center justify-start">
      <div class="nav-icon responsive-image" style="--ratio: 4.1/1">
        <div>
          <img alt="Nanite CMS Logo" src="./images/LogoFull.svg" />
        </div>
      </div>
    </a>
    <div class="hidden-on-desktop account-actions">
      <Button type="button" text="Log out" on:click={handleLogout} />
    </div>
  </div>

  <div class="hidden-on-devices flex-items fill middle-nav" />
  <div class="nav-menu right-nav">
    <ul class="nav-menu-content">
      {#each pages as page}
        <a
          aria-current={segment === page.href ? 'page' : undefined}
          href={page.href}
        >
          <li>
            <span>{page.title}</span>
          </li>
        </a>
      {/each}
      <span
        class="current-page-indicator"
        style="--position: {pageObj ? pageObj.navPosition : '0%'};"
      />
    </ul>
    <div class="hidden-on-devices account-actions">
      <Button type="button" text="Log out" on:click={handleLogout} />
    </div>
  </div>
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    margin: 2px 0;
  }

  .nav-icon-link {
    height: 48px;
  }

  .nav-icon {
    width: 190px;
  }

  .nav-menu {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  ul.nav-menu-content {
    position: relative;
    display: flex;
    height: 48px;
    flex-direction: row;
    align-items: stretch;
    list-style-type: none;
    padding: 0;
  }

  ul.nav-menu-content a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--col-nanite-2);
    width: 150px;
    transition: all 0.2s ease-in-out;
  }

  ul.nav-menu-content a:hover {
    background-color: var(--col-nanite-1);
    color: var(--col-light);
  }

  ul.nav-menu-content li {
    padding: 6px 14px;
  }

  ul.nav-menu-content li span {
    font-size: var(--fnt-d);
    text-transform: uppercase;
    font-weight: 500;
  }

  ul.nav-menu-content .current-page-indicator {
    position: absolute;
    width: 33%;
    left: var(--position, 0);
    bottom: 0;
    display: block;
    height: 2px;
    background-color: var(--bg, var(--col-nanite-1));
    transition: left 0.4s cubic-bezier(0.64, 0.57, 0.67, 1.53);
  }

  .account-actions {
    margin: 0 8px;
  }

  @media screen and (max-width: 768px) {
    nav,
    .nav-menu {
      flex-direction: column;
      align-items: stretch;
      overflow-y: hidden;
      overflow-x: auto;
    }

    .left-nav {
      justify-content: space-between;
      align-items: center;
    }

    .nav-menu-content a {
      flex-shrink: 0;
      flex-grow: 1;
      max-width: 40%;
    }
  }

</style>
