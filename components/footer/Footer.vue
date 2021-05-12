<template>
    <div>
        <div class="flexRow">
            <FooterComponent
                header="footer.sitemap"
                icon="fa fa-sitemap"
                v-bind:links="[
                    { text: 'Home', url: '\/', routerLink: true },
                    { text: 'Blog', url: 'blog', routerLink: true },
                    { text: 'Contact', url: 'contact', routerLink: true },
                    { text: 'Appz', url: 'appz', routerLink: true },
                    {text: 'Privacy policy',url: 'privacypolicy',routerLink: true,},
                    {text: 'Github frontend', url: 'https://github.com/linre-90/nuxt-catsopinion', routerLink: false,},
                ]"
                v-bind:socialMedia="[]"
            />
            <FooterComponent
                header="footer.some"
                icon="fas fa-bell"
                v-bind:links="[]"
                :socialMedia="['twitter']"
            />
            <FooterComponent
                header="footer.dev"
                icon="far fa-copyright"
                v-bind:links="[
                    { text: 'Font awesome', url: 'https://fontawesome.com/' },
                    { text: 'freepik', url: 'https://www.freepik.com' },
                    {
                        text: 'Images by unsplash',
                        url: 'https://unsplash.com/images/stock',
                    },
                    {
                        text: 'Rafael Ishkhanyan',
                        url: 'https://unsplash.com/@rafael_ishkhanyan',
                    },
                    { text: 'Eric Han', url: 'https://unsplash.com/@madeyes' },
                    {
                        text: 'Raquel Pedrotti',
                        url: 'https://unsplash.com/@raquelpedrotti',
                    },
                    {
                        text: 'Mikhail Vasileyev',
                        url: 'https://unsplash.com/@miklevasilyev',
                    },
                    {
                        text: 'Dorothea Oldani',
                        url: 'https://unsplash.com/@dorographie',
                    },
                    {
                        text: 'Daniel Park',
                        url: 'https://unsplash.com/@qkrwngh13',
                    },
                ]"
                v-bind:socialMedia="[]"
            />
            <FooterComponent
                header="footer.poweredby"
                icon="fas fa-bolt"
                v-bind:links="[
                    { text: 'Nuxt.js', url: 'https://nuxtjs.org/' },
                    { text: 'Animate.css', url: 'https://animate.style/' },
                    {
                        text: 'AWS Lambda',
                        url: 'https://aws.amazon.com/lambda/',
                    },
                    {
                        text: 'AWS Api-gateaway',
                        url: 'https://aws.amazon.com/api-gateway/',
                    },
                    {
                        text: 'Google Firebase',
                        url: 'https://firebase.google.com/',
                    },
                ]"
                v-bind:socialMedia="[]"
            />
        </div>
        <div>
            <client-only>
                <TopBtn />
            </client-only>
            
        </div>
    </div>
</template>

<script>
import FooterComponent from "./FooterComponent/FooterComponent.vue";
import TopBtn from "./BackTopBtn/BackToTop"
export default {
    name: "Footer",
    components: { TopBtn, FooterComponent },
};
</script>

<style scoped>
:root {
    --backgroundColor: #eed6d3;
    --highLigthColor: #e8b4b8;
    --helperColor: #a49393;
    --strongColor: #67595e;
}

.flexRow {
    display: flex;
    justify-content: space-evenly;
    padding: 1%;
    padding-top: 0;
    background-color: #a49393;
    text-align: center;
    padding-bottom: 3rem;
}

@media only screen and (max-width: 1050px) {
    .flexRow {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .credits div {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
}

@media only screen and (max-width: 400px) {
    .credits div {
        width: 90%;
    }
}
</style>
