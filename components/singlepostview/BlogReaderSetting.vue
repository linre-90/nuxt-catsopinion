<template>
  <div>
    <h2>{{ $t("blogReaderSetting.settings") }}</h2>
    <div>
      <p>{{ $t("blogReaderSetting.darkMode") }}</p>
      <label class="switch">
        <input
          type="checkbox"
          id="darkMode"
          v-model="checked"
          v-on:change="$emit('valueChanged', checked)"
        />
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <CopyLink />
    </div>
    <!--
        <div id="font">
            <p>Font size?</p>
            <label for="small">Small</label>
            <input type="radio" id="small" value="small" name="fontSize">
            <label for="medium">Medium</label>
            <input type="radio" id="medium" value="medium" name="fontSize">
            <label for="large">Large</label>
            <input type="radio" id="large" value="large" name="fontSize">
        </div>-->
  </div>
</template>

<script>
import CopyLink from "../pagecopy/CopyUrlLink";
export default {
  data() {
    return {
      checked: false,
    };
  },
  components: {
    CopyLink,
  },
};
</script>

<style scoped>
div {
  margin: auto;
  width: 100%;
  text-align: center;
}
label {
  display: block;
}
#font input {
  width: 100%;
  height: 2em;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #e8b4b8;
}

input:focus + .slider {
  box-shadow: 0 0 1px white;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>