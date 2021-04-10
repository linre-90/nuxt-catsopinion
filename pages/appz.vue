<template>
    <div>
        <Divider />
        <h3>Our appz are temporary not available. We improve our page and seperate appz from the main project. Follow social media for updates about appz return.</h3>
        <h3>Appzit on tilapäisesti pois käytöstä, parannamme sivustoamme ja apsit erotetaan perus projektista kokonaan. Seuraa somea ilmoitamme, kun apsit ovat taas saatavilla.</h3>
        <!--TODO when app is ready CHANGE "this.appz.length > 0"-->
        <div class="cardContainer " v-if="this.appz.length > 1">
                <AppCard
                v-for="app in this.appz"
                :key="app.name"
                :name="app.appName"
                :description="app.appDescription"
                :url="app.appurl"
                :image="app.appImage"
            />
        </div>
        <Divider />
    </div>
</template>

<script>
import Divider from "../components/Divider/Divider";
import AppCard from "../components/AppCard/AppCard";
export default {
    /**
     * Page component displays apps in flex container!
     * Apps are seperate projects, and only url, description, name and image, are stored in db
     * This fetches them and creates link to that app
     */
    components: {
        Divider,
        AppCard,
    },
    async fetch(){
        try {
            let response = await this.$fire.firestore.collection("appz_adresses").get();
            let data = [];
            response.forEach((element) => {
                let objectToPush = element.data();
                data.push(objectToPush);
            });
            this.appz = data;
        } catch (error) {
            this.$axios.post("/log", {
                "appid":this.$cookies.get("appid"),
                "time": new Date(),
                "logtype": this.$logTypes("error"),
                "visitedpage": this.$route.path,
                "locale": this.$cookies.get("language"),
                "device": process.client ? window.innerWidth : "UNKNOWN",
                "link": "fetch in appz",
                "detail": error,
                "cookies": this.$cookies.get("cookieConsent")
            },{params:{"appid": this.$cookies.get("appid")}}).then();
        }
    },
    head(){
        return{
            title: this.$t("metadata.titleStart") + this.$t("metadata.appz.title"),
            meta:[
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$t("metadata.appz.description"),
                }
            ]
        }
    },
    data() {
        return {
            appz: [],
        };
    },
    activated(){
        this.$store.dispatch("changeActivePage", this.$t("pageTexts.appz"));
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
        },{params:{"appid": this.$cookies.get("appid")}}).then();
    }
};
</script>

<style scoped>
.cardContainer {
    display: flex;
    width: 80%;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    margin: auto;
}
h3{
    text-align: center;
}
</style>
