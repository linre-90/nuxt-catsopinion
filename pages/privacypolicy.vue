<template>
    <div class="container">
        <divider />
        <p>{{ $t("privacypolicy.timestamp") }}9.4.2021</p>
        <PrivacyItem
            :headline="$t('privacypolicy.item1.headline')"
            :text="$t('privacypolicy.item1.text')"
            :quote="$t('privacypolicy.item1.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item2.headline')"
            :text="$t('privacypolicy.item2.text')"
            :quote="$t('privacypolicy.item2.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item3.headline')"
            :text="$t('privacypolicy.item3.text')"
            :quote="$t('privacypolicy.item3.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item4.headline')"
            :text="$t('privacypolicy.item4.text')"
            :quote="$t('privacypolicy.item4.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item5.headline')"
            :text="$t('privacypolicy.item5.text')"
            :quote="$t('privacypolicy.item5.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item6.headline')"
            :text="$t('privacypolicy.item6.text')"
            :quote="$t('privacypolicy.item6.quote')"
        />
        <divider />
    </div>
</template>

<script>
/**
* Privacy policy page component
* No functionality just presentation 
*/
import PrivacyItem from "@/components/PrivacyItem/PrivacyItem";
import Divider from "@/components/Divider/Divider";
export default {
    name: "PrivacyPolicy",
    components: { Divider, PrivacyItem },
    head(){
        return{
            title: this.$t("metadata.titleStart") + this.$t("metadata.privacypolicy.title"),
            meta:[
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$t("metadata.privacypolicy.description"),
                }
            ]
        }
    },
    activated(){
        this.$store.dispatch("changeActivePage", this.$t("pageTexts.privacypolicy"));
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
