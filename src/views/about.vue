<template lang="pug">
	main
		navigation
		transition(name="pageFadeIn")
			div(v-show="pageFadeInFlag").about__wrap
				div.about__detail
					div.about__detail--txt
						p All photo by
						span 祢
						span Amateur photographer
					p
						|2001/10/23 Osaka<br>
						|使用機材：Canon EOS RP / Canon EOS Kiss X3
					div.about__detail--link
						svg(version="1.1",xmlns="http://www.w3.org/2000/svg",xmlns:xlink="http://www.w3.org/1999/xlink",x="0px",y="0px",viewBox="0 0 512 512",xml:space="preserve").about__detail--link--icon
							g
								path(d="M510.678,112.275c-2.308-11.626-7.463-22.265-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345c-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557,0-37.395,7.996-50.21,20.814c-1.715,1.715-3.301,3.43-4.823,5.345C8.785,90.009,3.63,100.649,1.386,112.275C0.464,116.762,0,121.399,0,126.087V385.92c0,9.968,2.114,19.55,5.884,28.203c3.497,8.26,8.653,15.734,14.926,22.001c1.59,1.586,3.169,3.044,4.892,4.494c12.286,10.175,28.145,16.32,45.319,16.32h369.958c17.18,0,33.108-6.145,45.323-16.384c1.718-1.386,3.305-2.844,4.891-4.43c6.27-6.267,11.425-13.741,14.994-22.001v-0.064c3.769-8.653,5.812-18.171,5.812-28.138V126.087C512,121.399,511.543,116.762,510.678,112.275z M46.509,101.571c6.345-6.338,14.866-10.175,24.512-10.175h369.958c9.646,0,18.242,3.837,24.512,10.175c1.122,1.129,2.179,2.387,3.112,3.637L274.696,274.203c-5.348,4.687-11.954,7.002-18.696,7.002c-6.674,0-13.276-2.315-18.695-7.002L43.472,105.136C44.33,103.886,45.387,102.7,46.509,101.571z M36.334,385.92V142.735L176.658,265.15L36.405,387.435C36.334,386.971,36.334,386.449,36.334,385.92z M440.979,420.597H71.021c-6.281,0-12.158-1.651-17.174-4.552l147.978-128.959l13.815,12.018c11.561,10.046,26.028,15.134,40.36,15.134c14.406,0,28.872-5.088,40.432-15.134l13.808-12.018l147.92,128.959C453.137,418.946,447.26,420.597,440.979,420.597z M475.666,385.92c0,0.529,0,1.051-0.068,1.515L335.346,265.221L475.666,142.8V385.92z" style="fill: rgb(75, 75, 75);").st0
						a(href="mailto:manamisato2001@gmail.com") Contact 
				div.about__wrap--icon
					img(src="https://click.ecc.ac.jp/ecc/msatou/Philosophia/img/icon.fc3f0d3a.jpg",alt="祢")
				div(v-if="ttlDisplayFlag").about__wrap--ttl
					span philosophia - フィロソフィア
					span ギリシア語で【知恵〈sophia，ソフィア〉を愛する〈philein，フィレイン〉】を意味する。<br>この単語が由来の英単語〈philosophy，フィロソフィー〉の訳語として、明治初年頃〈哲学〉という言葉が作られた。
				foot
</template>

<script>
import navigation from "@/components/navigation.vue";
import foot from "@/components/foot.vue";

export default {
  name: "about",
  el: "main",
  components: {
    navigation,
    foot,
  },
  head: {
    title() {
      return {
        inner: "About",
        separator: "|",
        complement: "Philosophia",
      };
    },
  },
  data() {
    return {
      pageFadeInFlag: false,
      ttlDisplayFlag: window.matchMedia("(max-width: 480px)").matches,
    };
  },
  mounted() {
    this.pageFadeInFlag = !this.pageFadeInFlag;
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rajdhani&display=swap");
@import "@/assets/scss/ress.scss";
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/common.scss";

.about__wrap {
  display: flex;
  font-size: 1.3rem;
  flex-wrap: wrap;
  &--icon {
    img {
      width: 100%;
      height: 100%;
    }
  }
  &--ttl {
    text-align: center;
    font-style: italic;
    span {
      &:first-child {
        display: block;
        margin-bottom: 15px;
      }
      &:last-child {
        display: block;
        font-size: 1.1rem;
      }
    }
  }
}
.about__detail {
  p {
    line-height: 2.5rem;
  }
  &--txt {
    &::after {
      content: "";
      display: block;
      width: 80%;
      height: 1px;
      background-color: $accentColor;
      margin-top: 10px;
    }
    > span:nth-child(2) {
      font-weight: bold;
      display: inline-block;
      &::after {
        content: "-";
        margin: 0 7px;
        font-weight: normal;
      }
    }
  }
  &--link {
    font-size: 1.8rem;
    display: flex;
    &--icon {
      width: 15px;
      height: 15px;
      margin: 7px 5px 7px 0;
      opacity: 1;
      path {
        fill: #4b4b4b;
      }
    }
    a {
      font-family: "Rajdhani", sans-serif;
      font-size: 1.6rem;
      height: 29px;
      display: flex;
      align-items: center;
      transition: 0.3s color;
    }
  }
}

@media screen and (min-width: 481px) {
  /* PCサイト */
  .about__wrap {
    margin-left: 80px;
    min-height: 100vh;
    justify-content: space-around;
    align-items: center;
    padding: 50px 10%;
    &--icon {
      margin: 50px;
      width: 350px;
      min-width: 350px;
      position: relative;
      &:before {
        @include iconFrameSet;
        left: -23px;
        top: -50px;
        transform: rotate(225deg);
      }
      &::after {
        @include iconFrameSet;
        right: -23px;
        bottom: -50px;
        transform: rotate(45deg);
      }
    }
    &--ttl {
      flex-direction: column;
      background: #fff;
      color: $accentColor;
      // flex-grow: 1;
      // flex-basis: 100%;
      padding: 60px 50px;
      margin: 0 10%;
      border-radius: 200px;
    }
    footer {
      flex-grow: 1;
      flex-basis: 100%;
      margin: 0;
    }
  }
  .about__detail {
    padding: 0 50px;
    &--link {
      margin-top: 20px;
    }
    &--txt {
      margin: 0 0 25px;
      span:nth-child(2) {
        font-size: 2rem;
      }
    }
  }
}
@media screen and (max-width: 480px) {
  /* スマホサイト */
  .about__wrap {
    justify-content: center;
    margin: 100px 0 50px;
    &--icon {
      order: 1;
      width: 56vw;
      height: 56vw;
      position: relative;
      overflow: hidden;
      border-radius: 28vw;
      display: flex;
      align-items: center;
    }
    &--ttl {
      order: 3;
      padding: 30px 5vw;
      background-color: $accentColor;
      color: $baceColor;
    }
  }
  .about__detail {
    margin: 30px 0;
    order: 2;
    width: 100vw;
    padding: 0 10%;
    > * {
      margin: 0 0 20px;
      &:last-child {
        margin: 0;
      }
    }
    &--txt {
      > span:nth-child(2) {
        font-size: 1.7rem;
      }
    }
  }

  footer {
    order: 4;
  }
}
</style>
