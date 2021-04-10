<template>
  <div>
    <button @click="copyUrl">{{$t("copybtn.button")}}</button>
    <p v-if="copied" :class="{ animate__fadeInDown: copied, animate__animated: copied }" >{{$t("copybtn.copied")}}</p>
  </div>
</template>

<script>

export default {
	methods: {
		copyUrl() {
      this.$axios.post("/log", {
            "appid":this.$cookies.get("appid"),
            "time": new Date(),
            "logtype": this.$logTypes("click"),
            "visitedpage": this.$route.path,
            "locale": this.$cookies.get("language"),
            "device": process.client ? window.innerWidth : "UNKNOWN",
            "link": "copy blog post url",
            "detail": "",
            "cookies": this.$cookies.get("cookieConsent")
        },{params:{"appid": this.$cookies.get("appid")}}).then();
			if(this.timer){
                window.clearTimeout(this.timer);
            }
            if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                let input = document.createElement("textarea");
                input.textContent = window.location.href;
                document.body.appendChild(input);
                try {
                    input.select();
                    input.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                    this.copied = true;
                    this.timer = setTimeout(this.resetCounter, 7000);
                } catch (error) {
                } finally {
                    document.body.removeChild(input);
                }
            }
        },resetCounter(){
			this.copied = false;
			window.clearTimeout(this.timer);
		}
    },
    data() {
        return { copied: false, timer:null};
    },beforeDestroy() {
		if(this.timer){
			window.clearTimeout(this.timer);
		}
	}
};
</script>

<style scoped>
div{
	text-align: center;
	margin: auto;
}

button {
  padding: 10px;
  font-family: "Lato", "sans-serif";
  letter-spacing: 0.1em;
  margin-top: 20px;
  background-color: #67595e;
  border: none;
  border-radius: 5px;
  color: #eed6d3;
}

button:hover {
  cursor: pointer;
  transform: scale(1.1);
}

p {
  background-color: #67595e;
  width: 160px;
  text-align: center;
  margin: 20px auto;
  padding: 5px;
  border-radius: 10px;
  color: #eed6d3;
}
</style>