<template>
    <div>
        <div class="container">
            <Divider />
            <h2 class="animate__animated animate__backInUp">{{ $t("home.headline") }}</h2>
            <p>{{ $t("home.p1") }}</p>
            <p>{{ $t("home.p2") }}</p>
            <p>{{ $t("home.p3") }}</p>
            <h4>{{ $t("home.h4") }}</h4>
            <h4>{{ $t("home.signature") }}<i class="fas fa-paw animate__animated animate__bounceIn animate__repeat-3"></i></h4>
            <Divider />
            <HotNews :newsProp="this.newsData"/>
            <Divider />
        </div>
    </div>
</template>

<script>
import Divider from "../components/Divider/Divider";
import HotNews from "../components/HotNews/Hotnews";

export default {
    /**
     * Home page component
     * Doesen't do anything special, except displays hot news from database.
     * 
     */
    name: "homepage",
    components: {
        Divider,
        HotNews
    },
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
        return{newsData:[]}
    },
    activated(){
        this.$store.dispatch("changeActivePage", this.$t("pageTexts.home"));
        this.$axios.post("/log", {
            "appid":this.$cookies.get("appid"),
            "time": new Date(),
            "logtype": this.$logTypes("page"),
            "visitedpage": this.$route.path,
            "locale": this.$cookies.get("language"),
            "device": process.client ? window.innerWidth : "UNKNOWN",
            "link": "",
            "detail": "",
            "cookies": this.$cookies.get("cookieConsent")
        },{
            params:{"appid": this.$cookies.get("appid")},
        }).then();
    },
    async fetch(){
        let data = await this.$queryFullCollection({collection: "news", locale: this.$i18n.locale});
        if (data[0] === "error") {
            this.newsData = [
                {
                    date:new Date().toString(),
                    headline:this.$t("globalError.headline") + " " + data[1],
                    message:this.$t("globalError.message")+ " "+data[2]
                }
            ]
            this.$axios.post("/log", {
                "appid":this.$cookies.get("appid"),
                "time": new Date(),
                "logtype": this.$logTypes("error"),
                "visitedpage": this.$route.path,
                "locale": this.$cookies.get("language"),
                "device": process.client ? window.innerWidth : "UNKNOWN",
                "link": "Error fetching news in index",
                "detail": data,
                "cookies": this.$cookies.get("cookieConsent")
            },{params:{"appid": this.$cookies.get("appid")}}).then();
        }else{
            this.newsData = data;
        }
    }
};
</script>

<style scoped>
p {
    font-family: "Lato", "sans-serif";
    width: 50%;
}

.container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: auto;
}

@media only screen and (max-width: 1050px) {
    p {
        width: 70%;
    }
}
@media only screen and (max-width: 1050px) {
    p {
        width: 100%;
    }
}
@media only screen and (max-width: 650px) {
    .container {
        width: 90%;
    }
}
</style>
