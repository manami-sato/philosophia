<template lang="pug">
	div.news__wrap
		span.news__wrap--ttl news
		p.newsTxt {{newsAlt}}の写真({{newsDate}}撮影・{{newsPhotos}}枚)をアップしました。
</template>

<script defer>
/* eslint-disable no-console */
export default {
  // el: ".news__wrap",
  data() {
    return {
      res: [], // data全体
      newsAlt: "",
      newsDate: "",
      newsPhotos: "",
    };
  },
  mounted() {
    fetch("https://click.ecc.ac.jp/ecc/msatou/Philosophia/products.php")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.newsAlt = json.photo[json.photo.length - 1].alt;
        this.newsDate = json.photo[json.photo.length - 1].date;
        this.newsPhotos = json.photo[json.photo.length - 1].imgs.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
.news__wrap {
  font-size: 1.3rem;
  display: flex;
  height: 30px;
  .news__wrap--ttl {
    font-size: 1.8rem;
    font-family: "Rajdhani", sans-serif;
    border-radius: 30px;
    background-color: #fff;
    margin-right: 10px;
    display: inline-block;
    padding: 2px 15px;
  }
  .newsTxt {
    margin-top: 3px;
  }
}
@media screen and (max-width: 480px) {
  /* スマホサイト */
  .news__wrap {
    font-size: 1.2rem;
    min-height: 50px;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 20px;
    justify-content: flex-start;
    .newsTxt {
      margin: 0;
    }
  }
}
</style>
