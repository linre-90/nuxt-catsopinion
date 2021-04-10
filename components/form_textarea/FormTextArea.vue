<template>
    <div class="parent">
        <textarea
            v-model="textValue"
            @keyup="validateOnKeyUp"
            :name="inputName"
            type="text"
            :minlength="inputMinLength"
            :maxlength="inputMaxLength"
            :rows="textRows"
            :placeholder=inputPlaceholder
        />
        <span class="showFeedbackOnInput">
            <FormFeedback  :isValid="this.isValid" />
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
        return{
            isValid: false,
            textValue: ""
        }
    },
    props:{
        inputPlaceholder: String,
        inputName: String,
        inputMaxLength:String,
        inputMinLength:String,
        textRows: String,
        validationFuntion: Function

    },
    methods:{
        validateOnKeyUp(){
            this.isValid = this.validationFuntion(this.textValue);
            // emit values to parent if value is correct
            if(this.isValid){
                this.$emit("sendData", {name: this.inputName, value: this.textValue});
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
}

textarea{
    box-shadow: 1px 1px 5px #67595e;
    border: 2px solid #67595e;
    border-radius: 5px;
    font-family: "Lato", "sans-serif";
    width: 100%;
    height: 100%;
    margin-right: 0;
    resize: none;
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