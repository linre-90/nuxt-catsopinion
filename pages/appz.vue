<template>
    <div>
        <Divider />
        <client-only>
            <LoadinIcon size="medium" v-if="loading" />
        </client-only>
        <div class="cardContainer " v-if="this.appz.length > 0">
                <AppCard
                v-for="app in this.appz"
                :key="app.name"
                :name="app.appName"
                :description="app[`appDescription_${$i18n.locale}`]"
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
import LoadinIcon from "../components/loadingIcon/LoadinIcon";
export default {
    /**
     * Page component displays apps in flex container!
     * Apps are seperate projects, and only url, description, name and image, are stored in db
     * This fetches them and creates link to that app
     */
    components: {
        Divider,
        AppCard,
        LoadinIcon
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
            this.loading = false;
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
            },{params:{"appid": this.$cookies.get("appid")}}).then(this.loading = false);
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
            loading: true
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
