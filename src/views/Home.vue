<template lang="pug">
  main
    navigation
    transition(name="pageFadeIn")
      div.index__main
        ul.index__main--img
          li(v-for="(img, i) in res" :key="img" v-show="coverImgDisplay === i")
            transition(name="mainImg")
              img(v-bind:src="img" alt="Philosophia" v-show="coverImgDisplay === i")
        div.index__main--ttl
          h1 Philosophia
          p 祢 Portfolio Site
    //-       //- video(autoplay muted)
            source(src="@/assets/img/logo.mp4",type="video/mp4")
        news
</template>

<script defer>
import navigation from "@/components/navigation.vue";
import news from "@/components/news.vue";

export default {
  name: "Home",
  components: {
    navigation,
    news,
  },
  el: "main",
  head: {
    title() {
      return {
        inner: "",
        separator: " ",
        complement: "Philosophia",
      };
    },
  },
  data() {
    return {
      res: [],
      coverImg: 0,
      coverImgDisplay: 0,
      height: 0,
      SPindex() {
        // SP版indexの処理
        if (window.matchMedia("(max-width: 480px)").matches) {
          // 高さを画面いっぱいに
          document.querySelector("main").style.height = this.height + `px`;
        }
      },
    };
  },
  mounted() {
    // PCindex();
    fetch(
      "https://click.ecc.ac.jp/ecc/msatou/Philosophia_old/js/products_index.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log(json);
        this.res = json;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updated(i) {
    this.height = window.innerHeight;
    this.SPindex();
    // ファーストビューのアニメーション
    this.coverImg = i;
    const mainImgSlide = () => {
      this.coverImgDisplay++;
      if (this.coverImgDisplay == this.res.length) {
        this.coverImgDisplay = 0;
      }
    };
    setTimeout(mainImgSlide, 6000);
  },
};
// const PCindex = () => {
//   const contents = [
//     document.querySelector(".index__main--ttl h1"),
//     document.querySelector(".index__main--ttl p"),
//     document.querySelector(".index__main--img"),
//     document.querySelector("nav"),
//     document.querySelector(".news__wrap"),
//   ];
//   let count = 0;
//   // PC版indexの処理
//   if (window.matchMedia("(min-width:481px)").matches) {
//     const display = (e, o, p) => {
//       e.style.opacity = o;
//       e.style.pointerEvents = p;
//       if (count == 1) {
//         e.style.transition = "1.5s opacity";
//       }
//     };
//     const fadeInSet = () => {
//       count++;
//       for (let i = 0; i < contents.length; i++) {
//         display(contents[i], "1", "auto");
//       }
//     };
//     for (let i = 0; i < contents.length; i++) {
//       display(contents[i], "0", "none");
//     }
//     setTimeout(fadeInSet, 3200);
//   }
// };
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/common.scss";
.mainImg-enter-active {
  transition: opacity 0.4s;
}
.mainImg-leave-active {
  position: absolute;
}
.mainImg-enter,
.mainImg-leave-to {
  opacity: 0;
}

@media screen and (min-width: 481px) {
  /* PCサイト */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      pointer-events: none;
    }
    100% {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .page-enter-active {
    animation: fadeIn 1.5s;
    animation-delay: 3.2s;
  }
  .page-enter {
    opacity: 0;
    pointer-events: none;
  }
  .page-enter-to {
    pointer-events: auto;
  }
  .index__main {
    width: calc(100% - 80px);
    margin-left: 80px;
    height: 100vh;
    position: relative;
    flex-direction: column;
    opacity: 1;
    transform: translateX(0);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    &--img {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 85%;
      max-width: 1200px;
      height: 80vh;
      min-height: 500px;
      overflow: hidden;
      li {
        width: 100%;
        height: 100%;
        min-width: 800px;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    &--ttl {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 20% auto auto 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h1 {
        font-family: "Sacramento", cursive;
        font-size: 5rem;
        color: #ffffff;
        z-index: 5;
        background: transparent;
        mix-blend-mode: difference;
      }
      p {
        font-family: "Rajdhani", sans-serif;
        font-size: 1.5rem;
        mix-blend-mode: difference;
        padding-top: 10px;
        line-height: 20px;
        z-index: 5;
        width: 202px;
        text-align: right;
        color: #ffffff;
        font-weight: bold;
      }
      video {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 202px;
        padding: 10px 0 30px 5px;
        z-index: -10;
      }
    }
    .news__wrap {
      justify-content: flex-start;
      margin: 20px auto 0;
      width: 85%;
    }
  }
}
@media screen and (max-width: 480px) {
  /* スマホサイト */
  main {
    height: inherit;
  }
  .index__main {
    width: 100vw;
    height: inherit;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    opacity: 1;
    transform: translateX(0);
    &--img {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      li {
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
    }
    &--ttl {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto 10% 50% auto;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      flex-direction: column;
      h1 {
        font-family: "Sacramento", cursive;
        font-size: 4rem;
        color: #ffffff;
        z-index: 5;
        background: transparent;
        mix-blend-mode: difference;
      }
      p {
        font-family: "Rajdhani", sans-serif;
        font-size: 1.2rem;
        mix-blend-mode: difference;
        padding-top: 5px;
        line-height: 20px;
        z-index: 5;
        color: #ffffff;
        font-weight: bold;
      }
      video {
        display: none;
      }
    }
    .news__wrap {
      background: rgba(255, 255, 255, 0.7);
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
