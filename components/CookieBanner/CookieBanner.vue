<template>
    <div class=" wrapper " >
        <div>
            <h4>{{ $t("cookiebanner.header") }}<i class="fas fa-cookie-bite"></i></h4>
            <p>{{ $t("cookiebanner.p1") }}</p>
            <p>
                {{ $t("cookiebanner.p2") }}
                <nuxt-link class="link" :to="localePath('/privacypolicy')">{{ $t("cookiebanner.link") }} </nuxt-link>!
            </p>
        </div>
        <div>
            <button v-on:click="cookieIsOk">{{ $t("cookiebanner.button") }}</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        cookieIsOk() {
            this.$cookies.set("cookieConsent", true,{
                path: "*",
                maxAge: 60*60*24*7,
                sameSite: "lax"
            });
            this.$emit("cookieOk");
        },
    },
};
</script>

<style scoped>
.wrapper {
    width: 100%;
    background-color: #e8b4b8;
    position: fixed;
    bottom: 0;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 20px 20px;
    align-items: flex-end;
    justify-content: center;
    z-index: 20;
}
p {
    margin-bottom: 0;
}
div {
    color: #67595e;
    padding: 10px 20px 10px 20px;
}
button {
    border: 0;
    padding: 20px;
    border-radius: 10px;
    background-color: #90ee90;
    color: black;
    font-size: 1.2em;
    outline: none;
}

button:hover {
    transform: scale(1.05);
    background-color: #90ee50;
    cursor: pointer;
}
</style>
