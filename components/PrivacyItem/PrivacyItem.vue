<template>
  <div >
    <h3>{{ headline }}</h3>
    <p> {{text}}</p>
    <blockquote>{{quote}}</blockquote>
  </div>
</template>

<script>
export default {
name: "PrivacyItem",
  props:{
    headline: String,
    text: String,
    quote: String
  }
}
</script>

<style scoped>
div{
  width: 80%;
}
  h3{
    text-align: left;
  }
  p{
    margin-left: 10%;
    text-align: left;
    line-height: 1.45em;
  }
  blockquote{
    text-align: right;
  }
</style>