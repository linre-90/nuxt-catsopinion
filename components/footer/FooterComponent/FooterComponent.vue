<template>
<div class="container">
  <hr class="footerHR" />
    <h4>
        <i v-bind:class="icon"></i> {{ $t(header) }} <i v-bind:class="icon"></i>
    </h4>
    <span v-if="links.length > 0">
        <span v-for="(text, url, routerLink) in links" :key="(text, url, routerLink)">
            <nuxt-link  v-if="text.routerLink" :to="localePath(`${text.url}`)" >{{ text.text }}</nuxt-Link>
            <a v-else :href="`${text.url}`" >{{ text.text }}</a>
        </span>  
    </span>
    <span v-if="socialMedia.length > 0">
        <div class="socialMediaSeperator"></div>
        <Twitter></Twitter>
    </span>
</div>
</template>


<script>
import Twitter from "../../socialMedia/Twitter";

export default {
  name: "FooterComponent",
  props: { header: String, icon: String, links: Array, socialMedia: Array },
  components:{
        Twitter
  }
  
};
</script>

<style scoped>
.container {
  width: 33.33%;
  text-align: center;
	margin: 0 auto auto;
}

.footerHR{
    display: none;
}

.socialMediaSeperator{
    margin-top: 10px;
    margin-bottom: 10px;
}

a{
    padding: 5px;
    display: block;
    width: 35%;
    margin: auto;
}

a:hover{
    background-color: #67595E;
    cursor: pointer;
    border-radius: 5px;
}

@media only screen and (max-width: 1050px) {
 .flexRow{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container{
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .footerHR{
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 80%;
        border: 1px solid #67595E;
        border-radius: 1px;
        opacity: 85%;
    }
}

@media only screen and (max-width: 400px) {
    .container{
        width:90%;
    }
    
    ul li a{
       word-break: break-all; 
    }
}

</style>