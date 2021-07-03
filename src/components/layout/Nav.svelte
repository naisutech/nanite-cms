<script type="text/typescript">
  import { goto } from '@sapper/app'
  import NaniteButton from '../controls/NaniteButton.svelte'
  import Logo from '../../../designs/output/Logo.svg'
  import LogoFull from '../../../designs/output/LogoFull.svg'
  import env from '../../config/ClientEnvironment.ts'
  const { CMS_BASE_PATH } = env

  // nav stuff
  export let segment: string
  const pages: NavPage[] = [
    {
      title: 'Site',
      href: '.'
    },
    {
      title: 'Pages',
      href: 'pages'
    },
    {
      title: 'Content',
      href: 'content'
    }
  ]

  $: pageObj = pages.find((p) => p.href === segment)

  // logout stuff
  function handleLogout(e: Event) {
    goto(CMS_BASE_PATH + '/logout')
  }
  // sizing stuff
  let pageWidth = null
  let isMobile = false
  $: isMobile = pageWidth < 640
  $: logoImgSrc = isMobile ? Logo : LogoFull
  $: logoStyle = isMobile ? 'width: 36px;' : 'width: 210px;'

  let pageAnchors: HTMLAnchorElement[] = []

  let activeAnchorDetail = {
    width: 0,
    offset: 0
  }
  $: {
    pageWidth && true
    if (pageAnchors.length > 0) {
      const segmentHref = segment ? segment : '.'
      const activeLink = pages.findIndex((p) => p.href === segmentHref)
      if (activeLink !== -1) {
        activeAnchorDetail.width = pageAnchors[activeLink].clientWidth
        activeAnchorDetail.offset = pageAnchors[activeLink].offsetLeft
      }
    }
  }
</script>

<nav bind:clientWidth={pageWidth}>
  <div class="left-nav flex row">
    <a href="." class="nav-icon-link flex row align-center justify-start">
      <div class="nav-icon" style={logoStyle}>
        <img alt="Nanite CMS Logo" src={logoImgSrc} />
      </div>
    </a>
    <div class="hidden-on-desktop account-actions">
      <NaniteButton type="button" text="Log out" on:click={handleLogout} />
    </div>
  </div>

  <div class="hidden-on-devices middle-nav" />
  <div class="nav-menu right-nav">
    <ul class="nav-menu-content">
      {#each pages as page, i}
        <a
          aria-current={segment === page.href ? 'page' : undefined}
          href={page.href}
          on:click|preventDefault={() => goto(page.href)}
          class="nav-item"
          bind:this={pageAnchors[i]}
        >
          <li>
            <span>{page.title}</span>
          </li>
        </a>
      {/each}
      <span
        class="current-page-indicator"
        style="--position: {activeAnchorDetail.offset
          ? activeAnchorDetail.offset + 'px'
          : 0}; --width: {activeAnchorDetail.width
          ? activeAnchorDetail.width + 'px'
          : 0}"
      />
    </ul>
    <div class="hidden-on-devices account-actions">
      <NaniteButton type="button" text="Log out" on:click={handleLogout} />
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
    margin: 4px 0;
  }

  .middle-nav {
    flex-basis: 100%;
  }

  .nav-icon {
    display: inline-block;
    height: 40px;
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
    align-items: center;
    list-style-type: none;
    padding: 0;
  }

  ul.nav-menu-content a.nav-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--col-nanite-2);
    height: 38px;
    padding: 6px 14px;
    background-color: transparent;
    transition: all 0.15s ease-in-out;
  }

  ul.nav-menu-content a.nav-item span {
    font-size: var(--fnt-d);
    text-transform: uppercase;
    font-weight: 500;
  }

  ul.nav-menu-content a.nav-item:hover {
    background-color: var(--col-nanite-2);
    color: var(--col-light);
  }

  ul.nav-menu-content .current-page-indicator {
    position: absolute;
    left: var(--position, 0);
    width: var(--width, 0);
    bottom: 0;
    display: block;
    height: 2px;
    background-color: var(--bg, var(--col-nanite-1));
    margin: 0;
    padding: 0;
    transition: left 0.4s cubic-bezier(0.64, 0.57, 0.67, 1.53);
  }

  .account-actions {
    margin: 0 0 0 8px;
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
