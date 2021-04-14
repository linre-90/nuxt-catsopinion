<template>
    <div>
        <h3>{{ $t("blogsite.serachbar.searcby") }}</h3>
        <select class="animation__animate animate__jello" v-model="searcTerm" name="seriesSearch" id="seriesSearch">
            <optgroup label="Time">
                <option value="Newest">{{$t("blogsite.serachbar.newest")}}</option>
                <option value="Oldest">{{$t("blogsite.serachbar.oldest")}}</option>
            </optgroup>
            <optgroup label="Series">
                <option v-for="entry in this.series" :key="entry" :value="entry" >{{ entry }}</option>
            </optgroup>
        </select>
        <button v-on:click="$emit('searchPosts', {query: searcTerm, queryType: findParent(searcTerm),})">
            {{ $t("blogsite.serachbar.button") }}
        </button>
    </div>
</template>

<script>
/**
 * Search bar for blog posts
 * Emits search term and search type to parent that is selected when search button is pressed
 * Blog page component then queries posts 
 */
export default {
    data() {
        return {
            //! Insert series names here
            series: [/*"Personal", "What is my cat?"*/],
            searcTerm: "Newest",
        };
    },
    methods: {
        /**
         * With nuxt if findParent would be called when server rendering 
         * result would be error because there is not document or window in the server
         * carefull with these!
         */
        findParent(value) {
            let queryType;
            document.getElementsByTagName("option").forEach((e) => {
                if (e.value === value) {
                    queryType = e.parentNode.label;
                }
            });
            return queryType;
        },
    },
    async fetch(){
        let data = await this.$queryFullCollection({collection: "series", locale: "en"});
        if(data[0] === "error"){
            this.$axios.post("/log", {
                "appid":this.$cookies.get("appid"),
                "time": new Date(),
                "logtype": this.$logTypes("error"),
                "visitedpage": this.$route.path,
                "locale": this.$cookies.get("language"),
                "device": process.client ? window.innerWidth : "UNKNOWN",
                "link": "Fetch in blog search bar",
                "detail": data[1] + ": " + data[2],
                "cookies": this.$cookies.get("cookieConsent")
            },{params:{"appid": this.$cookies.get("appid")}}).then();
        }
        else{
            data.forEach((element) => {
                this.series.push(element.name);
            })
        }
    }
};
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e8b4b8;
    height: 80px;
}
h3 {
    display: inline-block;
    padding: 10px;
	margin: 0 30px;
}
select,
button {
    background-color: #67595e;
    border: none;
    font-family: "Lato", "sans-serif";
    border-radius: 20px;
    font-size: 1em;
    margin-right: 30px;
    margin-left: 30px;
    color: #eed6d3;
	padding: 10px 15px;
	outline: none;
}
button:hover {
    cursor: pointer;
    background-color: #a49393;
    animation: jello;
    animation-duration: 1s;
    animation-iteration-count: 1;
}
select:hover {
    cursor: pointer;
}

@media only screen and (max-width: 600px) {
    div {
        flex-direction: column;
        height: auto;
    }
    div * {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
    }
}
</style>
