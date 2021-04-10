<template>
    <div>
        <Divider />
        <!--Query parameters are emittet from search bar component-->
        <BlogSearchBar v-on:searchPosts="getPostsByQuery" />
        <Divider />
        <h2 v-if="!loading">{{this.searchText}}</h2>
        <client-only>
            <LoadinIcon size="x-large" v-if="loading" />
        </client-only>
        <h2 v-if="errormessage">{{ errormessage }}</h2>
        <span v-if="posts.length > 0 && !errormessage">
            <BlogContainer
                v-for="post in posts"
                :key="post.uid"
                :postToShow="{ post }"
                name="blogcont"
            />
        </span>
        <Divider />
    </div>
</template>

<script>
/**
 * Blogi page component
 * Receives emits from search bar (search term)
 * Creates blog post preview for each post with Blog container component
 */
import BlogContainer from "../components/blogContainer/BlogContainer";
import BlogSearchBar from "../components/blogSearchBar/BlogSearcBar";
import Divider from "../components/Divider/Divider";
import LoadinIcon from "@/components/loadingIcon/LoadinIcon";

export default {
    name: "BlogPage",
    components: {
        BlogContainer,
        BlogSearchBar,
        Divider,
        LoadinIcon,
    },
    head() {
        return {
            title: this.$t("metadata.titleStart") + this.$t("metadata.blog.title"),
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.$t("metadata.blog.description"),
                },
            ],
        };
    },
    activated(){
        this.$store.dispatch("changeActivePage", this.$t("pageTexts.blog"));
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
    },
    async fetch(){
        // we do blog post search based on users history
        // if user has not yet searched anything store variable would be null
        // if user has searched posts we save last query param to this store variable and 
        // do query by that
        if(this.$store.state.lastBlogQuery === null){
            await this.getByTime(false);
        }else{
            this.updateSearchtext();
            await this.getPostsByQuery(this.$store.state.lastBlogQuery);
        }
    },
    watch: {
        '$route.query': '$fetch'
    },
    methods: {
        /**
         * Gets blog posts by time
         * @param Boolean true=newest to oldest, false= oldest to newest
         */
        async getByTime(orderByOldest) {
            this.errormessage = null;
            let response = await this.$findPostsByAge({oldestFirst: orderByOldest, locale: this.$i18n.locale}).catch((error) => {});
            if (response[0] === "error" || response.length < 1) {
                this.errormessage = this.$t("blogsite.errorMessage");
                this.$axios.post("/log", {
                    "appid":this.$cookies.get("appid"),
                    "time": new Date(),
                    "logtype": this.$logTypes("error"),
                    "visitedpage": this.$route.path,
                    "locale": this.$cookies.get("language"),
                    "device": process.client ? window.innerWidth : "UNKNOWN",
                    "link": "getByTime in blog",
                    "detail": response,
                    "cookies": this.$cookies.get("cookieConsent")
                },{params:{"appid": this.$cookies.get("appid")}}).then();
            }else{
                this.posts = response;
            }
        },
        /**
         * Called when search bar emits new search terms
         * or we use users previous query
         */
        getPostsByQuery: async function(queryParams) {
            // set new query params to store
            this.$store.dispatch("setLastBlogSearch", queryParams);
            this.posts = [];
            this.updateSearchtext();
            this.loading = true;
            this.errormessage = null;
            let data = []
            if(queryParams.queryType === "Series"){
                data = await this.$findPostsByQuery({locale:this.$i18n.locale, queryData:queryParams});
            }else{ 
                if(queryParams.query === "Oldest"){
                    data = await this.$findPostsByAge({oldestFirst:true, locale:this.$i18n.locale});
                }else{
                    data = await this.$findPostsByAge({oldestFirst:false, locale:this.$i18n.locale});
                }
            }
            if (data[0] === "error" || !queryParams.queryType || data.length < 1)
            {
                this.loading = false;
                this.errormessage = this.$t("blogsite.errorMessage");
                this.$axios.post("/log", {
                    "appid":this.$cookies.get("appid"),
                    "time": new Date(),
                    "logtype": this.$logTypes("error"),
                    "visitedpage": this.$route.path,
                    "locale": this.$cookies.get("language"),
                    "device": process.client ? window.innerWidth : "UNKNOWN",
                    "link": "getPostsByQuery in blog",
                    "detail": response,
                    "cookies": this.$cookies.get("cookieConsent")
                },{params:{"appid": this.$cookies.get("appid")}}).then();
            }else{
                this.posts = data;
            }
            this.loading = false;
        },
        /**
        * updates search result text 
        * that contains data what last query was 
        */
        updateSearchtext(){
            this.searchText = this.$t("blogsite.searchTermText.start") + this.$store.state.lastBlogQuery.query
        },
    },
    data() {
        return {
            posts: [],
            errormessage: null,
            loading: false,
            searchText:  this.$t("blogsite.searchTermText.start") + this.$t("blogsite.searchTermText.default")
        };
    }
};
</script>

<style scoped>
	h2 {
		text-align: center;
	}
</style>
