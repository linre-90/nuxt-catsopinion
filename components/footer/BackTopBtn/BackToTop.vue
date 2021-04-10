<template>
    <div
        class="reportNTop"
        v-on:click="backToTop"
        @mouseenter="runAnimation"
        @mouseleave="removeAnimation"
    >
        <button id="backToTopBtn">
            <i class="fa fa-arrow-up"></i>
        </button>
    </div>
</template>
<script>
export default {
    name: "BackToTop",
    created() {
        window.addEventListener("scroll", this.checkScroll);
    },
    unmounted() {
        window.removeEventListener("scroll", this.checkScroll);
    },
    methods: {
        backToTop: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        checkScroll: () => {
            let backToTopBTN = document.getElementById("backToTopBtn");
            if (
                document.body.scrollTop > 40 ||
                document.documentElement.scrollTop > 40
            ) {
                backToTopBTN.style.display = "block";
            } else {
                backToTopBTN.style.display = "none";
            }
        },
        runAnimation() {
            const buttonToTop = document.getElementById("backToTopBtn");
            if (buttonToTop && !buttonToTop.classList.contains("animateBtn")) {
                buttonToTop.classList.add("animateBtn");
            }
        },
        removeAnimation() {
            const buttonToTop = document.getElementById("backToTopBtn");
            if (buttonToTop && buttonToTop.classList.contains("animateBtn")) {
                buttonToTop.classList.remove("animateBtn");
            }
        },
    },
};
</script>
<style scoped>
:root {
    --backgroundColor: #eed6d3;
    --highLigthColor: #e8b4b8;
    --helperColor: #a49393;
    --strongColor: #67595e;
}
.reportNTop {
    position: fixed;
    bottom: 5%;
    right: 2%;
    z-index: 99;
    display: flex;
    flex-direction: column;
}

#backToTopBtn {
    z-index: 97;
    display: none;
    border: none;
    outline: none;
    background-color: #67595e;
    color: #e8b4b8;
    cursor: pointer;
    padding: 15px;
    border-radius: 50%;
    font-size: 18px;
    margin: 25px;
}

.animateBtn {
    animation: flip;
    animation-iteration-count: 1;
    animation-duration: 1s;
}
</style>
