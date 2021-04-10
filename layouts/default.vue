<template>
    <div>
        <Navbar />
        <HeaderCarousel/>
        <nuxt keep-alive :keep-alive-props="{ max: 20 }"/>
        <CookieBanner class=" animate__animated animate__fadeInUp" v-if="!cookieOk" v-on:cookieOk="cookieUpdated"/>
        <Footer />
    </div>
</template>

<script>
import Navbar from "../components/navBar/Navbar.vue";
import Footer from "../components/footer/Footer.vue";
import HeaderCarousel from "../components/header/Carousel.vue";
import CookieBanner from "../components/CookieBanner/CookieBanner";

export default {
    name: "App",
    components: { Navbar, Footer, HeaderCarousel,CookieBanner },
    head(){
        return{
            title: this.$t("metadata.titleStart") + this.$t("metadata.home.title"),
            meta:[
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$t("metadata.home.description"),
                }
            ]
        }
    },
    data(){
        return{
            cookieOk: this.$cookies.get("cookieConsent")
        }
    },
    methods:{
        cookieUpdated(){
            this.cookieOk = true;
        }
    }
};
</script>


<style>
/*Colors
    --backgroundColor: #EED6D3;
    --highLigthColor: #E8B4B8;
    --helperColor: #A49393;
    --strongColor: #67595E;
*/
body {
    background-color: #eed6d3;
    margin: 0;
}
* {
    box-sizing: border-box;
}

h1,
h2 {
    font-family: "Oswald", sans-serif;
    margin-top: 0;
}

h3,
h4,
p,
label,
a {
    font-family: "Lato", "sans-serif";
}

a,
a:visited {
    color: black;
}

ul {
    padding-inline-start: 0;
    list-style: none;
}

a {
    cursor: pointer;
}
</style>