<template>
      <div class="topHeader">
        <div id="imgCarousel">
          <Slider class="carouselImage" />
        </div>
        <div class="HeaderHeadline">Cat's Opinion</div>
        <div class="headerSubheadline">{{activePage}}</div>
    </div>
</template>

<script>
    import Slider from "./Slider.vue"
export default {
    name:"Carousel",
    components:{Slider},
    computed:{
        activePage(){
            return this.$store.state.headerText;
        }
    }
}
</script>

<style>
:root{
    --backgroundColor: #EED6D3;
    --highLigthColor: #E8B4B8;
    --helperColor: #A49393;
    --strongColor: #67595E;
}

.topHeader{
    width: 100%;
    position:relative;
    text-align: center;
    background-color: black;
    overflow: hidden;
}
.HeaderHeadline{
    font-family: 'Oswald', sans-serif;
    font-size: 8rem;
    color: var(--strongColor);
    position: absolute;
    text-shadow: 1px 1px 5px #E8B4B8, -1px 1px 5px  #E8B4B8, 1px -1px 5px  #E8B4B8, -1px -1px 5px   #E8B4B8;
    bottom: 250px;
    left: 200px;
}

.headerSubheadline{
    font-family: "Lato", "sans-serif";
    position: absolute;
    font-size: 4rem;
    color: var(--strongColor);
    text-shadow: 1px 1px 5px #E8B4B8, -1px 1px 5px #E8B4B8, 1px -1px 5px  #E8B4B8, -1px -1px 5px #E8B4B8;
    bottom: 150px;
    left: 300px;
}

.carouselImage{
    height:650px;
    width: 110%;
    display: block;
    object-fit: cover;
}


/********************responsity media queries****************************/
@media only screen and (max-width: 1650px) {

    .headerSubheadline{
        top:65%;
    }
}


@media only screen and (max-width: 1410px) {
    .HeaderHeadline{
        left: 110px;
    }
    .headerSubheadline{
        left: 150px;
    }
}

@media only screen and (max-width: 1300px) {

}

@media only screen and (max-width: 1130px) {
    .carouselImage{
        height:470px;
        width: 110%;
        object-fit: cover;
    }

    .HeaderHeadline{
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top:50%;
        font-size: 3.5rem;
    }
    .headerSubheadline{
        position: absolute;
        left: 50%;
        top: 70%;
        transform: translate(-50%, -50%);
        font-size: 2.15rem;
    }
   
}

@media only screen and (max-width: 650px) {
    .topHeader{
        position:inherit;
        text-align: center;
        background-color: var(--helperColor);
        padding-top: 5%;
        padding-bottom: 5%;
    }

      .carouselImage{
        height:470px;
        width: 110%;
        display: none;
        object-fit: cover;
        opacity: 0;
    }

    .topHeader div{
        margin-right: 0;
    }

    #imgCarousel{
        display: none;
    }

    .HeaderHeadline{
        position: inherit;
        left: 0;
        transform: translate(0, 0);
        top: 0;
        font-size: 2.5rem;
        text-shadow: none;
    }
    .headerSubheadline{
        position: inherit;
        left: 0;
        transform: translate(0, 0);
        top: 0;
        font-size: 1.5rem;
        text-shadow: none;
    }
}

</style>