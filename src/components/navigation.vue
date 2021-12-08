<template lang="pug">
  nav 
    ul
      li.nav__link--icon
        router-link(to="/ecc/msatou/Philosophia/",target="page")
          svg(version="1.1",xmlns="http://www.w3.org/2000/svg",xmlns:xlink="http://www.w3.org/1999/xlink",x="0px",y="0px",viewBox="0 0 512 512",style="enable-background:new 0 0 512 512;",xml:space="preserve")
            g
              path(d="M453.8,170.7L283.2,10.8c-15.3-14.3-39.1-14.3-54.4,0L58.2,170.7c-8,7.5-12.6,18-12.6,29v272.6 c0,22,17.8,39.8,39.8,39.8h120.9V395.1h99.3V512h120.9c21.9,0,39.8-17.8,39.8-39.8V199.7C466.4,188.7,461.8,178.2,453.8,170.7z").svg_icon
      li.nav__link--txt
        router-link(to="/biography",target="page")
          span Biography
          //- (v-bind:class="{setNav:isSetNav}")
      li.nav__link--txt
        router-link(to="/about",target="page")
          span About
      li(@click="icon").nav__link--icon
        svg(version="1.1",xmlns="http://www.w3.org/2000/svg",xmlns:xlink="http://www.w3.org/1999/xlink",x="0px",y="0px",viewBox="0 0 512 381.2",style="enable-background:new 0 0 512 381.2;",xml:space="preserve")
          g
            path(d="M512,190.6L277,0v103.6c-17.3,0-36.4,0-57.5,0C10.9,103.6-29.8,257,18.1,369.7C27.7,266.6,160.2,269,255.5,269 c7.2,0,14.4,0,21.6,0v112.2L512,190.6z").svg_icon
        ul.nav__link--shere
          li(:class="shereDisplayFlag ? 'ok' : ''")
            a(href="https://twitter.com/intent/tweet?url=http://click.ecc.ac.jp/ecc/msatou/Philosophia/&text=Philosophia%EF%BD%9CAmane%20Portfolio%20site",target="_blank")
              svg(version="1.1",xmlns="http://www.w3.org/2000/svg",xmlns:xlink="http://www.w3.org/1999/xlink",x="0px",y="0px",viewBox="0 0 400 400",style="enable-background:new 0 0 400 400;",xml:space="preserve")
                path(d="M200,0C89.5,0,0,89.5,0,200s89.5,200,200,200s200-89.5,200-200S310.5,0,200,0z M300.5,162.1 c0.1,2.1,0.1,4.2,0.1,6.2c0,63.7-48.5,137.2-137.2,137.2c-26.2,0-51.9-7.5-73.9-21.7c3.8,0.4,7.7,0.7,11.5,0.7 c21.7,0,42.8-7.2,59.8-20.6c-20.6-0.4-38.7-13.9-45-33.5c7.2,1.4,14.7,1.1,21.8-0.8c-22.5-4.5-38.7-24.3-38.7-47.3 c0-0.2,0-0.4,0-0.6c6.7,3.7,14.2,5.8,21.8,6c-21.2-14.2-27.7-42.3-14.9-64.4c24.5,30.1,60.6,48.4,99.4,50.4 c-3.9-16.8,1.4-34.4,14-46.2c19.4-18.2,50-17.2,68.2,2.2c10.8-2.1,21.1-6.1,30.6-11.7c-3.6,11.2-11.1,20.6-21.2,26.7 c9.6-1.1,18.9-3.7,27.7-7.6C318,146.8,309.9,155.2,300.5,162.1z")
          li(:class="shereDisplayFlag ? 'ok' : ''")
            a(href="https://www.facebook.com/sharer/sharer.php?u=http://click.ecc.ac.jp/ecc/msatou/Philosophia/",target="_blank")
              svg(version="1.1",xmlns="http://www.w3.org/2000/svg",xmlns:xlink="http://www.w3.org/1999/xlink",x="0px",y="0px",viewBox="0 0 1024 1024",style="enable-background:new 0 0 1024 1024;",xml:space="preserve")
                path(d="M512,0C229.2,0,0,229.2,0,512c0,255.5,187.2,467.4,432,505.8V660H302V512h130V399.2 C432,270.9,508.4,200,625.4,200c55.1,0,112.8,9.7,114.6,10c0,0,0,0,0,0v126h-64.6c-63.6,0-83.4,39.5-83.4,80v96h142l-22.7,148H592 v357.8c244.8-38.4,432-250.2,432-505.8C1024,229.2,794.8,0,512,0z")
</template>

<script defer>
/* eslint-disable no-console */
const widthFlag = window.matchMedia("(min-width:481px)").matches;
export default {
  name: "nav",
  el: "nav",
  data() {
    return {
      shereDisplayFlag: false,
      isSetNav: false,
    };
  },
  methods: {
    icon() {
      if (widthFlag) {
        this.shereDisplayFlag = !this.shereDisplayFlag;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rajdhani&display=swap");
@import "@/assets/scss/ress.scss";
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/common.scss";
nav {
  font-family: "Rajdhani", sans-serif;
  position: fixed;
  top: 0;
  z-index: 25;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: 0.2s color, 0.2s background;
    font-size: 2rem;
  }
}

.nav__link--icon {
  transition: 0.2s background;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@media screen and (min-width: 481px) {
  /* PCサイト */
  nav {
    width: $navWidth;
    height: 100vh;
    left: 0;
    li {
      border-top: 1px solid rgb(134, 134, 134);
      &:first-child {
        border-top: none;
      }
      a {
        background: $accentColor;
        color: $baceColor;
      }
    }
    .nav__link--txt {
      a {
        height: calc((100vh - 160px) / 2);
        span {
          display: inline-block;
          transform: rotateZ(90deg);
        }
        &:hover {
          background: $partsHoverColor;
          color: $accentColor;
        }
      }
    }
  }

  .nav__link--icon {
    height: $navWidth;
    width: $navWidth;
    background: $accentColor;
    a {
      &:hover {
        background: $partsHoverColor;
        .svg_icon {
          fill: $accentColor;
        }
      }
    }
    &:hover {
      background: $partsHoverColor;
      .svg_icon {
        fill: $accentColor;
      }
    }
    svg {
      width: 30px;
      .svg_icon {
        fill: $baceColor;
        transition: 0.2s fill;
      }
    }
  }

  .nav__link--shere {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 150px;
    z-index: -1;
    li {
      border: none;
      transform-origin: bottom;
      width: 50px;
      height: inherit;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      transform: rotate(0);
      transition: transform 0.3s;
      &.ok:first-child {
        transform: rotateZ(40deg);
        svg {
          transform: rotateZ(-40deg);
        }
      }
      &.ok:last-child {
        transform: rotateZ(70deg);
        svg {
          transform: rotateZ(-70deg);
        }
      }
    }
    a {
      background: transparent;
      width: inherit;
      height: 50px;
      margin-bottom: auto;
      svg {
        width: inherit;
        fill: $accentColor;
        transition: 0.2s;
      }
      &:hover {
        background: transparent;
        svg {
          fill: rgb(133, 133, 133);
        }
      }
    }
  }
  .icon1-enter-active,
  .icon1-leave-active,
  .icon2-enter-active,
  .icon2-leave-active {
    transition: transform 0.3s;
    transition: opacity 0.3s;
  }
  .icon1-enter-to,
  .icon1-leave {
    transform: rotateZ(40deg);
  }
  .icon2-enter-to,
  .icon2-leave {
    transform: rotateZ(70deg);
  }
  .icon1-enter,
  .icon1-leave-to {
    opacity: 0;
    transform: rotateZ(0deg);
  }
  .icon2-enter,
  .icon2-leave-to {
    opacity: 0;
    transform: rotateZ(0deg);
  }
}
@media screen and (max-width: 480px) {
  /* スマホサイト */
  nav {
    background: rgba(238, 238, 238, 0.8);
    height: 50px;
    right: 0;
    z-index: 25;
    width: 100vw;
    ul {
      display: flex;
      justify-content: flex-start;
      padding-left: 15px;
      li {
        a {
          color: $accentColor;
        }
        &:last-child {
          display: none;
        }
      }
    }
    .nav__link--txt {
      a {
        padding: 0 10px;
        span {
          display: inline-block;
        }
        &:hover {
          color: darken($accentColor, 20%);
        }
      }
    }
  }
  .nav__link--icon {
    height: 50px;
    width: 50px;
    a {
      &:hover {
        .svg_icon {
          fill: darken($accentColor, 20%);
        }
      }
    }
    &:hover {
      .svg_icon {
        fill: darken($accentColor, 20%);
      }
    }
    svg {
      width: 20px;
      .svg_icon {
        fill: $accentColor;
        transition: 0.2s fill;
      }
    }
  }
  .nav__link--shere {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    li {
      &:last-child {
        a {
          margin: 0;
        }
      }
    }
    a {
      width: 40px;
      height: 40px;
      display: block;
      margin-right: 10px;
      svg {
        width: inherit;
        fill: $accentColor;
        transition: 0.2s;
      }
      &:hover {
        svg {
          fill: rgb(133, 133, 133);
        }
      }
    }
  }
}
</style>
