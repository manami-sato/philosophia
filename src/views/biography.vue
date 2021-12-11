<template lang="pug">
	main
		navigation
		transition(name="pageFadeIn")
			div(v-show="pageFadeInFlag").bio__wrap
				div.bio__sub
					div
						h1(v-if="mediaFlag").bio__sub--ttl Philosophia
						news
					div(v-on:click="order", v-bind:class="{setOrder:isSetOrder}").bio__sub--order
						p {{orderMsg[flag]}}
				ul.bio__thumbnail
					li(v-for="(data, i) in res" :key="data.thumbnail", @click="modalDisplay(i)").bio__thumbnail--contents
						img(v-bind:src="`https://click.ecc.ac.jp/ecc/msatou/Philosophia/img/${data.thumbnail}`", v-bind:alt="data.alt")
				foot
		transition(name="modalFadeIn")
			div(v-if="modalDisplayFlag" v-bind:style="('top: ' + modalHeight + 'px')").bio__modal
				div(@click="modalDisplay").bio__modal--back
				div(@click="prev").bio__modal--arrow
					div.bio__modal--prev
				div.bio__modal--img
					ul.bio__modal--img--list
						transition(name="modalImgFadeIn")
							li(v-for="(imgData, i) in res[selectContents].imgs" :key="i", v-if="imgDisplay === i")
								img(v-bind:src="imgData", v-bind:alt="res[selectContents].alt")
					div.bio__modal--img--info
						div.bio__modal--date {{res[selectContents].date}}
						div.circle
							div(v-for="(imgData, i) in res[selectContents].imgs" :key="i" @click="onCircle(i)" v-bind:class="{setCircle: imgDisplay === i}")
						div.bio__modal--place {{res[selectContents].place}}
				div(@click="next").bio__modal--arrow
					div.bio__modal--next
		a(href="#" v-if="mediaFlag").bio__scrollTop
			img(src="https://click.ecc.ac.jp/ecc/msatou/Philosophia/img/arrow.svg")
</template>

<script>
// import common from "@/assets/js/common.js";
import navigation from "@/components/navigation.vue";
import news from "@/components/news.vue";
import foot from "@/components/foot.vue";
let scrollY = 0;
const getHeight = () => {
  scrollY = window.pageYOffset;
  return scrollY;
};
export default {
  name: "biography",
  components: {
    navigation,
    news,
    foot,
  },
  head: {
    title() {
      return {
        inner: "Biography",
        separator: "|",
        complement: "Philosophia",
      };
    },
  },
  // el: "main",
  data() {
    return {
      res: [], // data全体
      flag: 0,
      modalDisplayFlag: false, //モーダル出すか出さないか
      orderMsg: ["Oldest", "Newest"],
      selectContents: 0,
      imgDisplay: 0, // 現在表示している○○枚目
      modalHeight: 0, //モーダルの高さ
      isSetOrder: false, // orderのflag
      mediaFlag: window.matchMedia("(min-width: 481px)").matches, //PCか否か
      thumbnailWrap: 0,
      pageFadeInFlag: false,
    };
  },
  methods: {
    order() {
      // ソート
      this.isSetOrder = !this.isSetOrder;
      const thumbnailList = document.querySelectorAll(
        ".bio__thumbnail--contents"
      );
      for (let i = 0; i < thumbnailList.length; i++) {
        if (this.isSetOrder) {
          this.flag = 1;
          let num = thumbnailList.length - i;
          thumbnailList[i].style.order = `${num}`;
        } else {
          this.flag = 0;
          thumbnailList[i].style.order = "";
        }
      }
    },
    modalDisplay(i) {
      // console.log(i);
      this.selectContents = i;
      this.modalDisplayFlag = !this.modalDisplayFlag;
      this.imgDisplay = 0;
      if (this.modalDisplayFlag) {
        getHeight(); // モーダルの表示位置をトップに固定
        this.modalHeight = scrollY;
        // スクロール禁止
        document.addEventListener("touchmove", disableScroll, {
          passive: false,
        });
        document.addEventListener("mousewheel", disableScroll, {
          passive: false,
        });
      } else {
        // スクロール再開
        document.removeEventListener("touchmove", disableScroll, {
          passive: false,
        });
        document.removeEventListener("mousewheel", disableScroll, {
          passive: false,
        });
      }
    },
    next() {
      this.imgDisplay++;
      if (this.imgDisplay == this.res[this.selectContents].imgs.length) {
        this.imgDisplay = 0;
      }
    },
    prev() {
      this.imgDisplay--;
      if (this.imgDisplay < 0) {
        this.imgDisplay = this.res[this.selectContents].imgs.length - 1;
      }
    },
    onCircle(i) {
      this.imgDisplay = i;
    },
    // scrollTop() {
    //   getHeight();
    //   console.log(scrollY);
    //   this.scrollFlag = scrollY;
    // },
  },
  mounted() {
    this.pageFadeInFlag = !this.pageFadeInFlag;
    // 画像リスト、モーダル
    fetch("https://click.ecc.ac.jp/ecc/msatou/Philosophia/products.php")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.res = json.photo;
      });
  },
  updated() {
    // リサイズ
    let bioWrap = document.querySelectorAll(".bio__wrap>*"); // news+sort、サムネを取得
    let maxWidth = 1015;
    const contentsResize = (thumbnailWidth, margin) => {
      let windowX = document.querySelector("body").clientWidth;
      if (this.mediaFlag) {
        this.thumbnailWrap = (windowX - 80) * 0.9; //サムネの横幅限界
      } else {
        this.thumbnailWrap = windowX;
      }
      let maxRow = Math.floor(this.thumbnailWrap / (thumbnailWidth + margin));
      // 計算 四捨五入 サムネ横幅÷(コンテンツのサイズ+margin) でその横幅に収まるコンテンツの最大数
      let num = maxRow * (thumbnailWidth + margin);
      // コンテンツの最大数*(コンテンツのサイズ+margin) ギリギリのサイズを算出
      for (let i = 0; i < bioWrap.length; i++) {
        if (num > maxWidth) {
          bioWrap[i].style.width = maxWidth + `px`;
        } else {
          bioWrap[i].style.width = num + `px`;
        }
      }
    };
    const switchByWidth = () => {
      // SP版
      if (window.matchMedia("(max-width: 480px)").matches) {
        contentsResize(170, 3);
      }
      // PC版
      if (window.matchMedia("(min-width:481px)").matches) {
        contentsResize(200, 3);
        window.addEventListener("resize", () => {
          contentsResize(200, 3);
        });
      }
    };
    switchByWidth();
    if (window.matchMedia("(min-width:481px)").matches) {
      window.addEventListener("resize", () => {
        contentsResize(200, 3);
      });
    }
  },
  beforeDestroy() {
    this.pageFadeInFlag = !this.pageFadeInFlag;
  },
};
// モーダル開いた時スクロールを拒否
function disableScroll(event) {
  event.preventDefault();
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rajdhani&display=swap");
@import "@/assets/scss/ress.scss";
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/common.scss";
/*--------- 写真ここから ---------*/
.bio__wrap {
  align-items: center;
  flex-direction: column;
  display: flex;
  align-items: center;
}
.bio__thumbnail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: auto;
  li {
    width: 200px;
    height: 200px;
    margin: 0 3px 3px 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
      img {
        opacity: 0.6;
      }
    }
  }
  img {
    height: 100%;
    width: 100%;
    transition: 0.3s opacity;
    object-fit: cover;
  }
}
.bio__sub {
  display: flex;
  align-items: center;
  > div:first-child {
    display: flex;
    align-items: center;
  }
  &--ttl {
    font-family: "Sacramento", cursive;
    font-size: 4rem;
    color: $accentColor;
    margin-right: 30px;
  }
  &--order {
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 20px;
    box-shadow: 0 0 15px rgb(197, 197, 197);
    transition: 0.2s background, 0.2s color;
    display: flex;
    // background: #fff;
    background-repeat: no-repeat, no-repeat;
    background-position: left 15px center, center center;
    background-size: auto 80%;
    font-family: "Rajdhani", sans-serif;
    font-size: 1.6rem;
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      background: $accentColor;
      color: $baceColor;
    }
  }
}
.setOrder {
  background: $accentColor;
  color: $baceColor;
}
/*--------- 写真ここまで ---------*/
/*-------------------------------
モーダルウィンドウここから
-------------------------------*/
.bio__modal {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 50;
  &--img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.bio__modal--img--info {
  font-family: "Crimson Text", serif;
  width: 100%;
}
.bio__modal--place {
  text-align: right;
}
.circle {
  display: flex;
  margin-top: auto;
  div {
    background: rgb(199, 199, 199);
    transition: 0.2s background;
    border-radius: 7px;
    &:last-child {
      margin: 0;
    }
    &:hover {
      background: rgb(119, 119, 119);
    }
  }
  .setCircle {
    background-color: rgb(119, 119, 119);
    animation: imgTransition 0.3s;
  }
}
.bio__modal--back {
  position: absolute;
  width: 60px;
  height: 60px;
  z-index: 60;
  &::before {
    @include backSet;
    transform: rotateZ(45deg);
  }
  &::after {
    @include backSet;
    transform: rotateZ(135deg);
  }
}
.bio__modal--back:hover::before,
.bio__modal--back:hover::after,
.bio__modal--arrow:hover .bio__modal--prev::before,
.bio__modal--arrow:hover .bio__modal--prev::after,
.bio__modal--arrow:hover .bio__modal--next::before,
.bio__modal--arrow:hover .bio__modal--next::after {
  background-color: $partsHoverColor;
}
.bio__modal--arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bio__modal--prev {
  @include arrowSet1;
  &::before {
    @include arrowSet2;
    transform: rotateZ(45deg);
    position: absolute;
    top: 0;
    left: 25px;
  }
  &::after {
    @include arrowSet2;
    transform: rotateZ(135deg);
    top: 24px;
    left: 25px;
    position: absolute;
  }
}
.bio__modal--next {
  @include arrowSet1;
  &::before {
    @include arrowSet2;
    transform: rotateZ(135deg);
    position: absolute;
    top: 0;
    right: 25px;
  }
  &::after {
    @include arrowSet2;
    transform: rotateZ(45deg);
    top: 24px;
    right: 25px;
    position: absolute;
  }
}
.modalFadeIn-enter-active,
.modalFadeIn-leave-active,
.modalImgFadeIn-enter-active {
  transition: opacity 0.2s;
}
.modalImgFadeIn-leave-active {
  position: absolute;
}
.modalFadeIn-enter,
.modalFadeIn-leave-to,
.modalImgFadeIn-enter,
.modalImgFadeIn-leave-to {
  opacity: 0;
}
/*-------------------------------
	モーダルウィンドウここまで
-------------------------------*/
/*-------------------------------
	スクロールここから
-------------------------------*/
.bio__scrollTop {
  display: block;
  position: fixed;
  bottom: 50px;
  right: 30px;
  height: 150px;
  width: 100px;
  opacity: 1;
  transition: 0.2s opacity;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &:hover {
    opacity: 0.5;
  }
}
/*-------------------------------
	スクロールここまで
-------------------------------*/
@media screen and (min-width: 481px) {
  /* PCサイト */
  /*--------- 写真ここから ---------*/
  .bio__wrap {
    padding: 80px 5% 50px;
    margin-left: 80px;
  }
  .bio__thumbnail {
    justify-content: flex-start;
    max-width: 1050px;
    li {
      width: 200px;
      height: 200px;
      margin: 0 3px 3px 0;
    }
  }
  .bio__sub {
    margin-bottom: 30px;
    justify-content: space-between;
  }
  /*--------- 写真ここまで ---------*/
  /*-------------------------------
	モーダルウィンドウここから
	-------------------------------*/
  .bio__modal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 1000px;
    &--img {
      height: 80vh;
      width: 70%;
      max-width: 1200px;
      img {
        height: calc(80vh - 64px);
        width: 100%;
        object-fit: contain;
      }
      &--info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        min-height: 50px;
        padding: 0 3%;
      }
    }
    &--arrow {
      width: 15%;
      height: 100vh;
    }
    &--back {
      right: 10%;
      top: 10%;
    }
    &--date,
    &--place {
      width: 20%;
    }
  }
  .circle {
    div {
      width: 14px;
      height: 14px;
      margin-right: 22px;
    }
  }
  /*-------------------------------
		モーダルウィンドウここまで
	-------------------------------*/
}
@media screen and (max-width: 480px) {
  /* スマホサイト */
  /*--------- 写真ここから ---------*/
  .bio__wrap {
    margin: 60px 0 50px;
  }
  .bio__thumbnail {
    justify-content: center;
    li {
      width: 170px;
      height: 170px;
    }
  }
  .bio__sub {
    margin-bottom: 10px;
    &--order {
      background: #fff;
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 70px;
      height: 70px;
      border-radius: 35px;
    }
    .news__wrap {
      padding: 0;
    }
  }
  /*--------- 写真ここまで ---------*/
  /*-------------------------------
		モーダルウィンドウここから
	-------------------------------*/
  .bio__modal {
    display: grid;
    padding: 0 7vw;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto;
    &--img {
      grid-column: 1/3;
      grid-row: 2;
      height: 70vh;
      width: 100%;
      // width: 80vw;
      margin: 0 auto;
    }
    &--arrow {
      align-items: flex-end;
    }
    > div {
      &:nth-child(2) {
        grid-column: 1;
        grid-row: 1;
        justify-content: flex-start;
      }
      &:last-child {
        grid-column: 2;
        grid-row: 1;
        justify-content: flex-end;
      }
    }
  }
  .bio__modal--img--list {
    width: 100%;
    height: 100%;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }
  .bio__modal--img--info {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    font-size: 1.6rem;
    padding: 10px 0 0;
  }
  .circle {
    width: 100%;
    grid-column: 1/3;
    grid-row: 2;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    div {
      width: 12px;
      height: 12px;
      margin-right: 15px;
    }
  }
  .bio__modal--date {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    align-self: center;
    padding-left: 10px;
  }
  .bio__modal--place {
    grid-column: 2;
    grid-row: 1;
    padding-right: 10px;
  }
  .bio__modal--back {
    right: 3%;
    top: 3%;
  }
  /*-------------------------------
		モーダルウィンドウここまで
	-------------------------------*/
}
</style>
