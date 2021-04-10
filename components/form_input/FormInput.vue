
<template>
    <div class="parent">
            <input
            v-model="textValue"
            @keyup="validateOnKeyUp"
            :name="inputName"
            :maxlength="inputMaxLength"
            :placeholder="inputPlaceholder"
            type="text"
        /> 
        <span class="showFeedbackOnInput">
            <FormFeedback  :isValid="this.isValid" />
        </span>
    </div>
</template>

<script>
/**
 * Creates form input component with graphical feedback to user if value is acceptable
 * Takes in lots of props, component data is binded to input.
 * sends isValid state to FormFeedback as prop.
 * Can be converted to different types like email, text, number based on which validation function is passed through 
 */
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
    // needs to be called here to set isValid to true because empty field is accebtable for email
    // email is not required
    mounted(){
        this.isValid = this.validationFuntion(this.textValue);
    },
    props:{
        inputPlaceholder: String,
        inputName: String,
        inputMaxLength:String,
        validationFuntion: Function
    },
    methods:{
        /**
         * Validation method
         * Send String from input field to plugin function which validates input and returns true or false
         * NOTE: Validation functions are rough and intended to prevent only user errors
         * "Hardcore" validation is done in the cloud function with appropriate package
         */
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
    height: 35px;
}

input{
    box-shadow: 1px 1px 5px #67595e;
    border: 2px solid #67595e;
    border-radius: 5px;
    font-family: "Lato", "sans-serif";
    width: 100%;
    height: 100%;
    margin-right: 0;
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