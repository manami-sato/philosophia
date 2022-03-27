<template lang="pug">
	main
		Navigation(@yearClickData="displayYear = parseInt($event)", :biographyFlag="true")
		transition(name="pageFadeIn")
			main(v-show="pageFadeInFlag").bio
				ul.bio__thumbnail
					li(v-for="(data, i) in res" :key="i", :class="{vertical:data.vertical}" ,@click="modalDisplay(i)", v-if="data.year == displayYear").bio__thumbnail--contents
						img(v-bind:src="`${path}img/img_thumbnail_${data.id}.jpg`",  v-bind:alt="data.alt")
				Foot
		transition(name="modalFadeIn")
			div(v-if="modalDisplayFlag" v-bind:style="('top: ' + modalHeight + 'px')").bio__modal
				div(@click="modalDisplay").bio__modal--back
				div(@click="prev", v-if="arrowFlag").bio__modal--arrow
					div.bio__modal--prev
				div.bio__modal--img
					ul.bio__modal--img--list
						transition(name="modalImgFadeIn")
							li(v-for="(img, i) in imgNumber" :key="i", v-if="imgDisplay === i")
								img(v-bind:src="`${imgPath}img/img_${res[selectContents].id}_${img}.jpg`", v-bind:alt="res[selectContents].alt")
					div.bio__modal--img--info
						div.bio__modal--date {{res[selectContents].date}}
						div.circle
							div(v-for="(n, i) in imgNumber" :key="i" @click="onCircle(i)" v-bind:class="{setCircle: imgDisplay === i}")
						div.bio__modal--place {{res[selectContents].place}}
				div(@click="next", v-if="arrowFlag").bio__modal--arrow
					div.bio__modal--next
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
    &--contents {
      width: 200px;
      height: 200px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
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
    &--info {
      font-family: "Crimson Text", serif;
      width: 100%;
    }
  }
  &--place {
    text-align: right;
  }
  &--back {
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
  &--arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &--prev {
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
  &--next {
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
.bio__modal--back:hover::before,
.bio__modal--back:hover::after,
.bio__modal--arrow:hover .bio__modal--prev::before,
.bio__modal--arrow:hover .bio__modal--prev::after,
.bio__modal--arrow:hover .bio__modal--next::before,
.bio__modal--arrow:hover .bio__modal--next::after {
  background-color: $partsHoverColor;
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
/*-------------------------------
	スクロールここまで
-------------------------------*/
@media screen and (min-width: 481px) {
  .bio__thumbnail {
    gap: 16px;
    // margin: 0 auto;
    &--contents {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 320px;
      height: 320px;
      // margin: 8px;
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
@media screen and (min-width: 1081px) {
  .bio__thumbnail {
    width: 1200px;
  }
}
@media screen and (max-width: 1120px) {
  .bio__thumbnail {
    width: 800px;
  }
}
@media screen and (max-width: 980px) {
  .bio__thumbnail {
    width: 800px;
  }
}
@media screen and (max-width: 800px) {
  .bio__thumbnail {
    width: 500px;
  }
}
@media screen and (max-width: 480px) {
  /* スマホサイト */
  /*--------- 写真ここから ---------*/
  .bio__wrap {
    margin: 60px 0 50px;
  }
  .bio__thumbnail {
    justify-content: flex-start;
    // width: auto;
    gap: 3px;
    width: 100vw;
    padding: 160px 0 0;
    li {
      // width: 170px;
      // height: 170px;
      width: calc((100vw - 3px) / 2);
      height: calc((100vw - 3px) / 2);
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
.vertical {
  &:hover {
    img {
      height: 170%;
      width: 170%;
      object-fit: cover;
    }
  }
}
</style>
