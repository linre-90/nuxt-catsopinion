<template>
    <div v-bind:class="{ 'ligth': !darkMode, 'dark': darkMode }">
        <Divider/>
        <BlogReaderSetting v-on:valueChanged="switchModes"/>
        <Divider/>
        <h2 v-if="isError">{{ $t("blogreader.error") }}</h2>
        <client-only><LoadingIcon size="large" v-if="this.isLoading && !isError"/></client-only>
        <Postview  class="viewClass" v-if="!isLoading && !isError && view.length > 0" :view="view"/>
        <Divider/>
    </div>
</template>

<script>
/**
 * Blog reader component
 * Displays single blog post after clicked
 * Can also be referensed directly via url
 */
import Postview from "@/components/singlepostview/PostView";
import LoadingIcon from "@/components/loadingIcon/LoadinIcon";
import Divider from "@/components/Divider/Divider"
import BlogReaderSetting from "@/components/singlepostview/BlogReaderSetting";

export default {
    components:{Postview,LoadingIcon,Divider,BlogReaderSetting},
    name: "BlogReaderPage",
    scrollToTop: true,
    data(){
        return{
            view: "",
            id: "",
            locale:"",
            isLoading: true,
            isError: false,
            darkMode:false
        }
    },
    async fetch(){
        let response = await this.$findPostById({id:this.$route.params.id, locale:this.$route.params.locale});
        this.isLoading = false;
        if(response[0] === "error"){
            this.isError = true;
        }else{
            this.view = response[0];
        }
    },
    activated(){
        this.$store.dispatch("changeActivePage", this.$t("pageTexts.blogreader"));
        this.$axios.post("/log", {
            "appid":this.$cookies.get("appid"),
            "time": new Date(),
            "logtype": this.$logTypes("read"),
            "visitedpage": this.$route.path,
            "locale": this.$cookies.get("language"),
            "device": process.client ? window.innerWidth : "UNKNOWN",
            "link": "",
            "detail": "",
            "cookies": this.$cookies.get("cookieConsent")
        },{params:{"appid": this.$cookies.get("appid")}}).then();
    },
    head() {
        return {
            titleTemplate: this.$t("metadata.titleStart") + this.$t("blogreader.title"),
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.$t("blogreader.meta"),
                },
            ],
        };
    },
    methods:{
        switchModes(value){
            this.darkMode = value;
        },
    }
}
</script>

<style scoped>

.ligth{
    background-color: #eed6d3;
}
.dark{
    background-color: #A49393;
}

h2{
    text-align: center;
}

</style>

