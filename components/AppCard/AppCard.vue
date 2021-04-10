<template>
    <a class="wrapper link animate__animated animate__bounceIn" :href="url" name="appcard">
        <h2>{{ name }}</h2>
        <Divider />
        <img :src="image" alt="image about app" />
        <h3>{{ $t("appPage.card.des") }}</h3>
        <p>{{ description }}</p>
        <p>
            <i>{{ $t("appPage.card.click") }}</i>
        </p>
    </a>    
</template>
<script>


import Divider from "../Divider/Divider";
export default {
    components: { Divider },
    props: {
        name: String,
        description: String,
        url: String,
        image: String,
    },
    methods: {
        removeAnimation() {
            setTimeout(() => {
                document.getElementsByName("appcard").forEach((e) => {
                    e.classList.remove("animate__animated"),
                        e.classList.remove("animate__bounceIn");
                });
            }, 1000);
        },
    },
    mounted() {
        this.removeAnimation();
    },
};
</script>

<style scoped>
h2,
h3,
p {
    text-decoration: none;
}
h2,
h3 {
    font-family: "Oswald", sans-serif;
}
p {
    font-family: "Lato", "sans-serif";
}
.link {
    text-decoration: none;
    padding: 10px 50px;
}
.wrapper:hover {
    background-color: #67595e;
    animation: shakeY;
    animation-iteration-count: 1;
    animation-duration: 1s;
}
img {
    max-height: 250px;
    object-fit: cover;
}
.wrapper {
    width: 500px;
    background-color: #a49393;
    text-align: center;
    padding: 10px 50px;
    border-radius: 20px;
    overflow: hidden;
    margin: 20px;
}

@media only screen and (max-width: 750px) {
    img {
        max-width: 250px;
        object-fit: cover;
    }
    .link {
        padding: 10px 10px;
    }
}

@media only screen and (max-width: 505px) {
    img {
        max-width: 150px;
        object-fit: cover;
    }
}

@media only screen and (max-width: 364px) {
    img {
        max-width: 100px;
        object-fit: cover;
    }
}
</style>
