<template lang="pug">
	main
		Navigation(:biographyFlag="false")
		transition(name="pageFadeIn")
			div(v-show="pageFadeInFlag").about
				div.about__detail
					div.about__detail--txt
						p All photo by
						span {{name}}
						span Amateur photographer
					p
						|2001/10/23 Osaka<br>
						|使用機材：Canon EOS RP / Canon EOS Kiss X3 
					ul.about__detail--link
						li
							a(href="mailto:manamisato2001@gmail.com")
								figure
									svg(version="1.1", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink", x="0px", y="0px", viewBox="0 0 512 512", xml:space="preserve").about__detail--link--icon
										g
											path(d="M510.678,112.275c-2.308-11.626-7.463-22.265-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345c-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557,0-37.395,7.996-50.21,20.814c-1.715,1.715-3.301,3.43-4.823,5.345C8.785,90.009,3.63,100.649,1.386,112.275C0.464,116.762,0,121.399,0,126.087V385.92c0,9.968,2.114,19.55,5.884,28.203c3.497,8.26,8.653,15.734,14.926,22.001c1.59,1.586,3.169,3.044,4.892,4.494c12.286,10.175,28.145,16.32,45.319,16.32h369.958c17.18,0,33.108-6.145,45.323-16.384c1.718-1.386,3.305-2.844,4.891-4.43c6.27-6.267,11.425-13.741,14.994-22.001v-0.064c3.769-8.653,5.812-18.171,5.812-28.138V126.087C512,121.399,511.543,116.762,510.678,112.275z M46.509,101.571c6.345-6.338,14.866-10.175,24.512-10.175h369.958c9.646,0,18.242,3.837,24.512,10.175c1.122,1.129,2.179,2.387,3.112,3.637L274.696,274.203c-5.348,4.687-11.954,7.002-18.696,7.002c-6.674,0-13.276-2.315-18.695-7.002L43.472,105.136C44.33,103.886,45.387,102.7,46.509,101.571z M36.334,385.92V142.735L176.658,265.15L36.405,387.435C36.334,386.971,36.334,386.449,36.334,385.92z M440.979,420.597H71.021c-6.281,0-12.158-1.651-17.174-4.552l147.978-128.959l13.815,12.018c11.561,10.046,26.028,15.134,40.36,15.134c14.406,0,28.872-5.088,40.432-15.134l13.808-12.018l147.92,128.959C453.137,418.946,447.26,420.597,440.979,420.597z M475.666,385.92c0,0.529,0,1.051-0.068,1.515L335.346,265.221L475.666,142.8V385.92z" style="fill: rgb(75, 75, 75);").st0
								| Contact 
						li
							a(href="https://click.ecc.ac.jp/ecc/msatou/portfolio/", target="page")
								figure
									svg(version="1.1", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink", x="0px", y="0px", width="512px", height="512px", viewBox="0 0 512 512", xml:space="preserve").about__detail--link--icon
										g
											path(d="M509.681,102.798c-4.641-24-16.344-47.141-34.875-65.578C462.462,24.86,448.087,15.501,432.79,9.298\
									c-22.984-9.297-48.047-11.609-72.047-7c-23.953,4.641-47.047,16.391-65.578,34.922l-98.578,98.594\
									c-0.516,0.484-0.984,1-1.438,1.531c0.172-0.031,0.328-0.094,0.5-0.094c28.969-5.797,58.734-3.094,86.125,7.828\
									c0.141,0.031,0.297,0.125,0.438,0.172l60.516-60.516c5.906-5.891,12.578-10.203,19.781-13.109\
									c10.719-4.375,22.609-5.484,33.922-3.266c11.359,2.188,21.984,7.594,30.813,16.375c5.906,5.906,10.234,12.578,13.156,19.766\
									c4.375,10.719,5.469,22.625,3.266,33.953c-2.219,11.344-7.594,21.969-16.422,30.797l-98.609,98.625\
									c-5.891,5.906-12.547,10.234-19.734,13.156c-10.75,4.359-22.672,5.438-33.984,3.266c-11.297-2.219-21.953-7.594-30.813-16.422\
									c-4.766-4.797-8.484-10.078-11.297-15.75c-0.281-0.063-0.578-0.156-0.875-0.203c-6.578-1.234-13.625-0.547-19.797,2.031\
									c-4.266,1.781-8.141,4.359-11.484,7.734l-1.922,1.953c-10,12.125-17.875,29.266-2.109,51.828\
									c12.328,12.297,26.672,21.656,42,27.859c22.984,9.328,47.984,11.609,71.984,6.969c23.969-4.609,47.063-16.328,65.594-34.891\
									l98.609-98.594c12.313-12.328,21.688-26.719,27.891-42.047C512.009,151.813,514.306,126.782,509.681,102.798z")
											path(d="M230.259,366.907c-0.188-0.094-0.313-0.125-0.469-0.188l-60.516,60.531\
									c-5.891,5.906-12.563,10.203-19.734,13.156c-10.75,4.375-22.641,5.438-33.953,3.266c-11.328-2.219-21.984-7.594-30.813-16.422\
									c-5.906-5.922-10.219-12.563-13.156-19.766c-4.359-10.719-5.453-22.609-3.25-33.953c2.188-11.328,7.578-21.953,16.406-30.797\
									l98.625-98.641c5.875-5.891,12.547-10.188,19.734-13.109c10.734-4.406,22.609-5.469,33.969-3.297\
									c11.313,2.234,21.953,7.594,30.781,16.406c4.797,4.781,8.516,10.109,11.344,15.781c0.266,0.078,0.563,0.141,0.859,0.219\
									c6.594,1.203,13.641,0.484,19.766-2.047c4.313-1.797,8.172-4.406,11.516-7.781l1.922-1.922c10-12.109,17.844-29.281,2.109-51.828\
									c-12.297-12.313-26.672-21.641-41.984-27.859c-23-9.297-48-11.609-72.031-6.984c-23.969,4.625-47.047,16.391-65.594,34.906\
									l-98.578,98.625c-12.344,12.266-21.719,26.703-27.891,42.031c-9.328,22.953-11.641,47.984-6.984,71.953\
									c4.641,24.047,16.359,47.094,34.875,65.594c12.328,12.359,26.719,21.719,42.031,27.938c22.984,9.313,48,11.594,72,6.953\
									c24-4.609,47.078-16.313,65.578-34.891l98.609-98.641c0.516-0.453,0.984-1,1.453-1.453c-0.156,0-0.344,0.063-0.5,0.063\
									C287.399,380.517,257.634,377.829,230.259,366.907z")
								| Portfolio(Web)
				div.about__icon
					img(:src="`${path}img/icon.jpg`", :alt="name")
				//- div(v-if="ttlDisplayFlag").about__ttl
					span philosophia - フィロソフィア
					span ギリシア語で【知恵〈sophia，ソフィア〉を愛する〈philein，フィレイン〉】を意味する。<br>この単語が由来の英単語〈philosophy，フィロソフィー〉の訳語として、明治初年頃〈哲学〉という言葉が作られた。
				Foot
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Foot from "@/components/Foot.vue";
import Mixin from "@/mixins/Mixin.vue";
export default {
  name: "about",
  components: {
    Navigation,
    Foot,
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
  mixins: [Mixin],
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
@import "@/assets/scss/common.scss";
.about {
  display: flex;
  font-size: 1.3rem;
  flex-wrap: wrap;
  @media screen and (min-width: 481px) {
    justify-content: space-around;
    align-items: center;
    width: 80vw;
    max-width: 1080px;
    min-height: 100vh;
    padding: 132px 0 0;
    margin: 0 auto;
  }
  @media screen and (max-width: 920px) {
    justify-content: center;
    padding: 160px 0 0;
  }
  &__detail {
    @media screen and (min-width: 481px) {
      padding: 0 50px;
    }
    @media screen and (max-width: 920px) {
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
    }
    p {
      line-height: 2.5rem;
    }
    &--txt {
      @media screen and (min-width: 481px) {
        margin: 0 0 25px;
      }
      > span:nth-child(2) {
        font-weight: bold;
        display: inline-block;
        @media screen and (min-width: 481px) {
          font-size: 2rem;
        }
        @media screen and (max-width: 920px) {
          font-size: 1.7rem;
        }
        &::after {
          content: "-";
          margin: 0 7px;
          font-weight: normal;
        }
      }
    }
    &--link {
      font-size: 1.8rem;
      @media screen and (min-width: 481px) {
        margin-top: 20px;
      }
      li {
        display: flex;
        width: max-content;
        opacity: 1;
        transition: 0.3s opacity;
        &:hover {
          opacity: 0.4;
        }
      }
      &--icon {
        width: 16px;
        height: 16px;
        margin: 7px 5px 7px 0;
        opacity: 1;
      }
      a {
        display: flex;
        align-items: center;
        font-family: $font2;
        font-size: 1.6rem;
      }
    }
  }
  &__icon {
    width: 304px;
    height: 304px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__ttl {
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
  footer {
    @media screen and (min-width: 481px) {
      flex-grow: 1;
      flex-basis: 100%;
      margin: 0;
    }
    @media screen and (max-width: 920px) {
      order: 4;
    }
  }
}
</style>
