<template>
    <div>
        <h2>{{ $t("hotnews.header") }}</h2>
        <div style="margin:50px"></div>
        <div class="newsContainer">
            <span v-if=" this.newsUpdate.length > 0">
                <transition-group name="newsCarousel" tag="div">
                    <div v-for="i in [currentIndex]" :key="i">
                        <SingleHotNew :date="current.date" :headline="current.headline" :message="current.message"/>
                    </div>
                </transition-group>
            </span>
        </div>
        <div style="margin:50px"></div>
        <client-only>
            <ProgressBar ref="brogBar"  :time="15000" :barWidth="200"/>
        </client-only>
    </div>
</template>

<script>
import SingleHotNew from "./SinglehotNew";
import ProgressBar from "../ProgressBar/ProgresBar";
export default {
    components: { SingleHotNew, ProgressBar },
    data() {
        {
            return {
                timer: null,
                currentIndex: 0,
                firstTime: true,
            };
        }
    },
    props:{
        newsProp: Array
    },
    mounted: function() {
        this.startSlide();
        this.next();
    },
    methods: {
        startSlide: function() {
            this.timer = setInterval(this.next, 15000);
        },
        next: function() {
            this.currentIndex += 1;
            if (!this.firstTime) {
                this.$refs.brogBar.resetCounter();
            }
            this.firstTime = false;
        },
    },
    computed: {
        current: function() {
            return this.newsProp[Math.abs(this.currentIndex) % this.newsUpdate.length];
        },
        newsUpdate: function(){
            return this.newsProp;
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style scoped>
.newsCarousel-enter-active,
.newsCarousel-leave-active {
    animation: fadeInRight;
    animation-duration: 1s;
    animation-iteration-count: 1;
}
.newsCarousel-enter,
.newsCarousel-leave-to {
    animation: fadeOutLeft;
    animation-duration: 1s;
    animation-iteration-count: 1;
    position: absolute;
}

.newsContainer {
    height: 155px;
}

@media only screen and (max-width: 600px) {
    .newsContainer {
        height: 250px;
    }
}

@media only screen and (max-width: 1280px) {
    .newsContainer {
        height: 250px;
    }
}
</style>
