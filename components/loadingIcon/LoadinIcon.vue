<template>
    <div id="rootDiv" v-bind:class="size">
        <div class="rotate3d">
            <div class="scaleAnimation">
                <i class="fas fa-circle-notch rotationAnimation"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: "LoadingIcon",
    props:{
        size: String
    }
}
</script>

<style scoped>
#rootDiv{
    text-align: center;
    margin: auto;
    z-index: 50;
}
.x-small{
    font-size: 20px;
}

.small{
    font-size: 30px;
}

.medium{
    font-size: 50px;
}

.large{
    font-size: 80px;
}
.x-large{
    font-size: 100px;
}



.rotationAnimation{
    animation: rotate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

@keyframes rotate {
    0%{transform: rotate(0);}
    100%{transform: rotate(360deg)}
}

.scaleAnimation{
    animation: scaleanim;
    animation-duration: 5s;
    animation-iteration-count: infinite;
}

@keyframes scaleanim {
    0%{transform: scale(1);}
    50%{transform: scale(1.4)}
    100%{transform: scale(1)}
}

.rotate3d{
    animation: rotate3;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}
@keyframes rotate3 {
    0%{transform: scale(1.3,0.75);}
    50%{transform: scale(0.75,1.3)}
    100%{transform: scale(1)}
}


</style>