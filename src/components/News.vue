<template lang="pug">
	div.news {{newsDate}} : {{newsPlace}} photos have been uploaded.
</template>

<script defer>
import Mixin from "@/mixins/Mixin.vue";
export default {
  data() {
    return {
      res: [],
      newsPlace: "",
      newsDate: "",
      newsPhotos: "",
    };
  },
  mixins: [Mixin],
  mounted() {
    fetch(`${this.productsData}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.res = json.photo[json.photo.length - 1];
        this.newsPlace = this.res.place;
        this.newsDate = this.res.date;
        this.newsPhotos = this.res.img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";
.news {
  font-size: 1.5rem;
  font-family: $font2;
}
// @media screen and (max-width: 480px) {
//   /* スマホサイト */
//   .news {
//     font-size: 1.2rem;
//     min-height: 50px;
//     display: flex;
//     width: 100%;
//     align-items: center;
//     padding: 0 20px;
//     justify-content: flex-start;
//   }
// }
</style>
