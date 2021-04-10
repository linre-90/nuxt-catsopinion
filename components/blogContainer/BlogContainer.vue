<template>
    <nuxt-link :to="localePath(`/${postToShow.post.id}/${postToShow.post.locale}/blogreader`)" class="wrapper">
        <div id="imgDiv" class="col-3">
            <img :src="postToShow.post.headerIMG" alt="Blog post related image" />
        </div>
        <div class="col-8">
            <h2>{{ postToShow.post.title }}</h2>
            <p>
                <i>{{ postToShow.post.date }}</i>
            </p>
            <p><b>Blog series- </b> {{ postToShow.post.series }}</p>
            <p>{{ postToShow.post.description }}</p>
        </div>
        <div class="col-12">
            <!-- TODO at some point like dislike
			<p class="increaseFontsize removeTopMargin"><i class="far fa-thumbs-up"></i>{{postToShow.post.likes}} </p>
			<p class="increaseFontsize"><i class="fas fa-grip-lines-vertical"></i></p>
			<p class="increaseFontsize"><i class="far fa-thumbs-down"></i>{{postToShow.post.dislikes}}</p>-->
            <p>
                <i>{{ $t("blogsite.blogPostShower.open") }}</i>
            </p>
        </div>
    </nuxt-link>
</template>

<script>
/**
* Container component for blog post preview
* Takes object that contains post information
* displays it and creates a dynamic url for that post
*/
export default {
    props: { postToShow: Object },
};
</script>

<style scoped>
h2 {
    margin-top: 0;
}

h2,
p {
    padding-left: 50px;
}

img {
    width: 200px;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    margin: auto;
    text-decoration: none;
}
a {
    border-radius: 30px;
    padding: 20px;
}

.removeTopMargin {
    margin-top: 0;
    margin-bottom: 0;
}
a:hover {
    background-color: rgba(103, 89, 94, 0.3);
    animation: makeBigger forwards;
    animation-iteration-count: 1;
    animation-duration: 1s;
}
@keyframes makeBigger {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.02);
    }
}
.increaseFontsize {
    font-size: 1.3em;
    display: inline;
}

.marginLeft {
    margin-right: 1.65em;
}

#imgDiv {
    text-align: center;
}

.col-3 {
    width: 33.33%;
}
.col-8 {
    width: 66.66%;
}
.col-12 {
    width: 100%;
    text-align: center;
}

@media only screen and (max-width: 1050px) {
    .wrapper {
        flex-direction: column;
        align-items: center;
    }
    .col-3,
    .col-8 {
        width: 100%;
    }
    p,
    h2 {
        padding-left: 0;
        text-align: center;
    }
    #imgDiv {
        text-align: center;
    }

    @media only screen and (max-width: 450px) {
        img {
            width: 150px;
        }
    }
}
</style>
