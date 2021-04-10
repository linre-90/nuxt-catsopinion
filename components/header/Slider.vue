<template>
    <div>
        <transition-group name="fade" tag="div">
            <div v-for="i in [currentIndex]" :key="i">
                <img
                    class="carouselImage"
                    :src="currentImg"
                    alt="Carousel image"
                />
            </div>
        </transition-group>
    </div>
</template>
<script>
export default {
    name: "Slider",
    data() {
        return {
            images: [
                "https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/daniel-park-BZYx2tOXfqA-unsplash-min.jpg",
                "https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/dorothea-oldani-Hhm_fL04bE8-unsplash-min.jpg",
                "https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/eric-han-Hd7vwFzZpH0-unsplash-min.jpg",
                "https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/mikhail-vasilyev-NodtnCsLdTE-unsplash+(1)-min.jpg",
                "https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/rafael-ishkhanyan-eoHUaRLrYxw-unsplash-min.jpg",
                "https://catcastimgs.s3.eu-north-1.amazonaws.com/staticimg/raquel-pedrotti-AHgpNYkX9dc-unsplash-min.jpg",
            ],
            timer: null,
            currentIndex: 0,
        };
    },

    mounted: function() {
        this.startSlide();
        this.next();
    },

    methods: {
        startSlide: function() {
            this.timer = setInterval(this.next, 10000);
        },

        next: function() {
            this.currentIndex += 1;
        },
        prev: function() {
            this.currentIndex -= 1;
        },
    },

    computed: {
        currentImg: function() {
            return this.images[
                Math.abs(this.currentIndex) % this.images.length
            ];
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style scoped>
.carouselImage {
    height: 650px;
    width: 110%;
    display: block;
    object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease-in;
    overflow: hidden;
    visibility: visible;
    position: absolute;
    width: 110%;
    opacity: 1;
    animation: fade;
    animation-duration: 10s;
}

.fade-enter,
.fade-leave-to {
    transition: all 1s ease-out;
    visibility: hidden;
    width: 110%;
    opacity: 0;
}

@-webkit-keyframes fade {
    0% {
        transform: scale(1.1);
    }
}

@keyframes fade {
    0% {
        transform: scale(1.1);
    }
}
</style>
