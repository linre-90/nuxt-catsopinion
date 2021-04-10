<template>
  <div class="parent">
        <select :name="selectName" @change="validate($event)">
            <option disabled selected value="" >{{selectHeader}}</option>
            <option v-for="option in optionData" v-bind:key="option.value" :value="option.value">{{option.text}}</option>
        </select>  
        <span class="showFeedbackOnInput">
            <FormFeedback :isValid="this.isValid"/>
        </span>
  </div>
</template>

<script>
import FormFeedback from "../form_user_feedback/FormFeedback"
 
export default {
    components:{
        FormFeedback
    },
    data(){
        return{ isValid: false}
    },
    props:{
        optionData: Array,
        selectName: String,
        selectHeader: String,
        validationFunction: Function

    },
    methods:{
        validate(event){
            this.isValid = this.validationFunction(event.target.value);
            // emit values to parent if value is correct
            if(this.isValid){
                this.$emit("sendData", {name: this.selectName, value: event.target.value});
            }
        }
    }
}
</script>

<style scoped>
div{
    margin-right: 0;
    padding: 0;
    width: 520px;
    height: 35px;
}

select {
    box-shadow: 1px 1px 5px #67595e;
    border: 2px solid #67595e;
    border-radius: 5px;
    font-family: "Lato", "sans-serif";
    width: 100%;
    margin-right: 0;
    height: 100%;
    
}

.showFeedbackOnInput{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
}

.parent{
    position: relative;
}

@media only screen and (max-width: 1600px) {
    div{
        width: 400px;
    }
}

</style>