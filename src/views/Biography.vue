<template lang="pug">
	main
		Navigation(@yearClickData="displayYear = parseInt($event)", :biographyFlag="true")
		transition(name="pageFadeIn")
			main(v-show="pageFadeInFlag").bio
				ul.bio__thumbnail
					li(v-for="(data, i) in res" :key="i", :class="{vertical:data.vertical}" ,@click="modalDisplay(i)", v-if="data.year == displayYear").bio__thumbnail--contents
						img(:src="`${path}img/img_thumbnail_${data.id}.jpg`",  :alt="data.alt")
				Foot
		transition(name="modalFadeIn")
			div(v-if="modalDisplayFlag" :style="{top:modalHeight + 'px'}").bio__modal
				div(@click="modalDisplay").bio__modal--back
				div.bio__modal--img
					ul.bio__modal--img--list
						transition(name="modalImgFadeIn")
							li(v-for="(img, i) in imgNumber" :key="i", v-if="imgDisplay === i")
								img(:src="`${imgPath}img/img_${res[selectContents].id}_${img}.jpg`", :alt="res[selectContents].alt")
					div.bio__modal--img--info
						div.bio__modal--date {{res[selectContents].date}}
						div.circle
							div(v-for="(n, i) in imgNumber" :key="i" @click="onCircle(i)" :class="{setCircle: imgDisplay === i}")
						div.bio__modal--place {{res[selectContents].place}}
				div.bio__modal--arrow
					div(@click="prev", v-if="arrowFlag").bio__modal--arrow--prev
					div(@click="next", v-if="arrowFlag").bio__modal--arrow--next
		a(href="#" v-if="mediaFlag").bio__scrollTop
			svg(version="1.1", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink", x="0px", y="0px", viewBox="0 0 36.3 109.8", style="enable-background:new 0 0 36.3 109.8;", xml:space="preserve")
				g
					polygon(points="1,109.8 0,109.8 0,0 36.3,36.2 35.5,37 1,2.4").bio__scrollTop--arrow
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Foot from "@/components/Foot.vue";
import Mixin from "@/mixins/Mixin.vue";
let scrollY = 0;
const getHeight = () => {
  scrollY = window.pageYOffset;
  return scrollY;
};
export default {
  name: "Biography",
  components: {
    Navigation,
    Foot,
  },
  mixins: [Mixin],
  head: {
    title() {
      return {
        inner: "Biography",
        separator: "|",
        complement: "Philosophia",
      };
    },
  },
  data() {
    return {
      res: [], // data全体
      flag: 0,
      modalDisplayFlag: false, //モーダル出すか出さないか
      selectContents: 0,
      imgDisplay: 0, // 現在表示している○○枚目
      modalHeight: 0, //モーダルの高さ
      mediaFlag: window.matchMedia("(min-width: 481px)").matches, //PCか否か
      thumbnailWrap: 0,
      pageFadeInFlag: false,
      imgNumber: [],
      arrowFlag: true,
      displayYear: 0,
      scrollY: 0,
    };
  },
  methods: {
    modalDisplay(i) {
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
        for (
          let imgIndex = 1;
          imgIndex <= this.res[this.selectContents].img;
          imgIndex++
        ) {
          if (imgIndex < 10) {
            this.imgNumber.push("0" + imgIndex);
          } else {
            this.imgNumber.push(imgIndex);
          }
        }
        if (this.res[this.selectContents].img == 1) {
          this.arrowFlag = !this.arrowFlag;
        }
      } else {
        this.imgNumber = [];
        if (!this.arrowFlag) {
          this.arrowFlag = !this.arrowFlag;
        }
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
      if (this.imgDisplay == this.res[this.selectContents].img) {
        this.imgDisplay = 0;
      }
    },
    prev() {
      this.imgDisplay--;
      if (this.imgDisplay < 0) {
        this.imgDisplay = this.res[this.selectContents].imgh - 1;
      }
    },
    onCircle(i) {
      this.imgDisplay = i;
    },
  },
  mounted() {
    console.log(this.height, scrollY);
    if (this.$route.params.yearId) {
      for (let i = 0; i < this.yearList.length; i++) {
        if (this.displayYear == this.$route.params.yearId) {
          this.displayYear = this.yearList[i].id;
        }
      }
    } else {
      this.displayYear = this.yearList[0].id;
    }
    this.pageFadeInFlag = !this.pageFadeInFlag;
    // 画像リスト、モーダル
    fetch(`${this.productsData}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.res = json.photo;
      });
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
@import "@/assets/scss/common.scss";
.bio {
  align-items: center;
  flex-direction: column;
  display: flex;
  align-items: center;
  &__thumbnail {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: auto;
    padding: 152px 0 0 5%;
    @media screen and (min-width: 481px) {
      gap: 16px;
    }
    @media screen and (min-width: 1081px) {
      width: 1200px;
    }
    @media screen and (max-width: 1120px) {
      width: 800px;
    }
    @media screen and (max-width: 980px) {
      width: 800px;
    }
    @media screen and (max-width: 800px) {
      width: 500px;
    }
    @media screen and (max-width: 480px) {
      justify-content: flex-start;
      gap: 3px;
      width: 100vw;
      padding: 160px 0 0;
      li {
        width: calc((100vw - 3px) / 2);
        height: calc((100vw - 3px) / 2);
      }
    }
    &--contents {
      width: 200px;
      height: 200px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      cursor: pointer;
      @media screen and (min-width: 481px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 320px;
        height: 320px;
        position: relative;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: 0.6s width, 0.6s height;
        }
        &::before {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background: $accentColor;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.7;
          transition: 0.2s opacity;
          mix-blend-mode: hue;
        }
        &:hover {
          img {
            height: 110%;
            width: 110%;
            object-fit: cover;
          }
          &::before {
            opacity: 0;
          }
        }
      }
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  &__wrap {
    @media screen and (max-width: 480px) {
      margin: 60px 0 50px;
    }
  }
  &__modal {
    /*-------------------------------
		モーダルウィンドウここから
		-------------------------------*/
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 50;
    &--img {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @media screen and (min-width: 481px) {
        height: 80vh;
        width: 70%;
        max-width: 1200px;
        img {
          height: calc(80vh - 64px);
          width: 100%;
          object-fit: contain;
        }
      }
      @media screen and (max-width: 480px) {
        height: 60vh;
        width: 100%;
        margin: 0 auto 40px;
        &--list {
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
      }
      &--info {
        font-family: "Crimson Text", serif;
        @media screen and (min-width: 481px) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 1.5rem;
          min-height: 50px;
          padding: 0 3%;
        }
        @media screen and (max-width: 480px) {
          display: grid;
          grid-template-columns: auto auto;
          grid-template-rows: auto auto;
          width: 90%;
          margin: 0 auto;
          padding: 16px 0 0;
          font-size: 1.4rem;
        }
      }
    }
    &--date {
      @media screen and (min-width: 481px) {
        width: 20%;
      }
      @media screen and (max-width: 480px) {
        grid-column: 1;
        grid-row: 1;
      }
    }
    &--place {
      text-align: right;
      @media screen and (min-width: 481px) {
        width: 20%;
      }
      @media screen and (max-width: 480px) {
        grid-column: 2;
        grid-row: 1;
      }
    }
    &--back {
      position: absolute;
      width: 60px;
      height: 60px;
      z-index: 60;
      @media screen and (min-width: 481px) {
        right: 10%;
        top: 10%;
      }
      @media screen and (max-width: 480px) {
        right: 3%;
        top: 3%;
      }
      &:hover {
        &::before {
          background-color: $partsHoverColor;
        }
        &::after {
          background-color: $partsHoverColor;
        }
      }
      &::before {
        @include backSet;
        transform: rotateZ(45deg);
      }
      &::after {
        @include backSet;
        transform: rotateZ(135deg);
      }
    }
    &--arrow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      margin: auto;
      position: absolute;
      z-index: -1;
      @media screen and (min-width: 481px) {
        height: 100vh;
        inset: 0 0 0 0;
      }
      @media screen and (max-width: 480px) {
        width: 100%;
        inset: auto 0 80px 0;
      }
      &--prev {
        @include modalBorderSet;
        &::before {
          transform: rotateZ(45deg);
          margin: 0 0 24px;
        }
        &::after {
          transform: rotateZ(135deg);
          margin: 24px 0 0;
        }
      }
      &--next {
        @include modalBorderSet;
        &::before {
          transform: rotateZ(135deg);
          margin: 0 0 24px;
        }
        &::after {
          transform: rotateZ(45deg);
          margin: 24px 0 0;
        }
      }
    }
  }
  &__scrollTop {
    /*-------------------------------
			スクロールここから
		-------------------------------*/
    display: block;
    position: fixed;
    bottom: 50px;
    right: 30px;
    height: 150px;
    width: 100px;
    opacity: 1;
    transition: 0.2s opacity;
    &--arrow {
      fill: #282828;
    }
    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &:hover {
      opacity: 0.5;
    }
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
.vertical {
  &:hover {
    img {
      height: 170%;
      width: 170%;
      object-fit: cover;
    }
  }
}
.circle {
  display: flex;
  margin-top: auto;
  @media screen and (max-width: 480px) {
    width: 100%;
    grid-column: 1/3;
    grid-row: 2;
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
  div {
    background: rgb(199, 199, 199);
    transition: 0.2s background;
    border-radius: 7px;
    width: 12px;
    height: 12px;
    margin-right: 15px;
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
</style>
