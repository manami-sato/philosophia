<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  head: {
    meta: [
      {
        name: "description",
        content: "月波の写真ポートフォリオサイトです。",
      },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1.0,minimum-scale=1.0",
      },
      { charset: "utf-8" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Philosophia" },
      { property: "og:title", content: "Philosophia" }, //- サイト自体のタイトル
      {
        property: "og:description",
        content: "月波の写真ポートフォリオサイトです。",
      }, //- サイトの説明
      {
        property: "og:url",
        content: "https://click.ecc.ac.jp/ecc/msatou/Philosophia/",
      }, //- サイトのURL
      {
        property: "og:image",
        content: "https://manami-sato.github.io/philosophia/img/img_32_06.jpg",
      }, //- サイトのカバー画像
      { rel: "apple-touch-icon", href: "@/assets/img/favicon.png" },
    ],
  },
};
</script>
