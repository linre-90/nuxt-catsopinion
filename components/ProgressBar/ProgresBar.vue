<!-- Takes in: time in milliseconds and barWidth in pixels to calculate correct progress-->
<template>
    <div
        class="loadingBar"
        v-bind:style="{ width: this.$props.barWidth + this.type }"
    >
        <div
            ref="progresBar"
            class="measureBar"
            v-bind:style="{ width: this.$props.barWidth + this.type }"
            id="bar"
        ></div>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    props: {
        time: Number,
        barWidth: Number,
    },
    data() {
        return {
            passedTime: 0,
            timer: setInterval(this.startMe, 1000),
            step: this.$props.barWidth / (this.$props.time / 1000),
            type: "px",
        };
    },
    mounted() {
        this.startMe();
    },
    methods: {
       startMe: function() {
            this.passedTime += 1;
            let newbarWidth =
                parseFloat(this.$refs.progresBar.offsetWidth) - this.step;
            if (newbarWidth < 0) {
                newbarWidth = 0;
            }
            this.$refs.progresBar.style.width = newbarWidth + this.type;
        },

        resetCounter() {
            this.$refs.progresBar.style.width =
                this.$props.barWidth + this.type;
            this.passedTime = 0;
            this.startMe();
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style scoped>
.loadingBar {
    height: 3px;
    background-color: #a49393;
	margin: 40px auto auto;
	opacity: 0.8;
}

.measureBar {
    height: 3px;
    background-color: #67595e;
    border-radius: 5px;
	margin: 0;
    padding: 0;
}
</style>
