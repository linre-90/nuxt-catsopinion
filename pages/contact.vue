<template>
    <div class="container">
        <Divider />
        <LoadinIcon v-if="pageLoading" size="x-large" />
        <h3>{{ $t("formPage.headline") }}</h3>
        <p>
            <i><u>{{ $t("formPage.noSpecialChar") }}</u></i>
        </p>
        <p>{{ $t("formPage.requiredItemsInfo") }}</p>
        <!--form-->
        <div class="animate__animated animate__zoomInUp">
            <!-- Headline -->
            <div class="formSection">
                <FormLabel labelFor="headline" :textContent="$t('formPage.formHeader')"/>
                <FormInput 
                    :inputPlaceholder= "$t('formPage.headlineplaceholder')"
                    inputName= "headLine"
                    inputMaxLength= "20"
                    :validationFuntion= "this.$formValidateHeader"
                    @sendData= "updateData"
                />
            </div>
            <!-- Dropdown -->
            <div class="formSection">
                <FormLabel labelFor="type" :textContent="$t('formPage.typeOfFeedback')"/>
                <FormDropdown 
                    selectName = "type"
                    :validationFunction= "this.$formTypesDropdownValidation"
                    :selectHeader = "$t('formPage.optionsheader')"
                    @sendData= "updateData"
                    :optionData = "
                    
                    [
                        { value: 'bug', text: $t('formPage.options1')},
                        { value: 'question', text: $t('formPage.options2')},
                        { value: 'other', text: $t('formPage.options3')}
                    ]" 
                />
            </div>
            <!-- Email -->
            <div class="formSection">
                <FormLabel labelFor="email" :textContent="$t('formPage.email')"/>
                <FormInput 
                    :inputPlaceholder= "$t('formPage.emaillaceholder')"
                    inputName= "email"
                    inputMaxLength= "254"
                    :validationFuntion= "this.$formValidateEmail"
                    @sendData= "updateData"
                />
            </div>
            <!-- Message -->
            <div class="formSection">
                <FormLabel labelFor="email" :textContent="$t('formPage.message')"/>
                <FormTextArea 
                    :inputPlaceholder= "$t('formPage.message')"
                    inputName= "message"
                    inputMaxLength= "254"
                    inputMinLength="20"
                    textRows="10"
                    :validationFuntion= "this.$formValidateText"
                    @sendData= "updateData"
                />
            </div>
            <!--For bots-->
            <div class="formSection">
                    <label class="honey" for="name"></label>
                    <input
                        class="honey"
                        type="text"
                        id="name"
                        autocomplete="off"
                        name="name"
                        placeholder="Your name here"
                    />
            </div>
            <!--submit btn-->
            <div class="formSectionCenter">
                    <button v-bind:class="{ subMitFormBtn: true, disabled: !formIsValid,}" v-if="!loading && !submitted" id="subMitFormBtn" @click="submitForm">
                        {{ $t("formPage.submitBtn") }}
                    </button>
                    <LoadinIcon v-if="loading" size="medium" />
            </div>
            <!--Help texts-->
            <FormInfoText :errorType="error" :message="errormessage"/>
        </div>
        <!-- /form-->
        <Divider />
    </div>
</template>

<script>
import Divider from "../components/Divider/Divider";
import LoadinIcon from "../components/loadingIcon/LoadinIcon";
import FormLabel from "../components/form_label/FormLabel";
import FormInput from "../components/form_input/FormInput";
import FormDropdown from "../components/form_dropdown/FormDropdown";
import FormTextArea from "../components/form_textarea/FormTextArea";
import FormInfoText from "../components/form_helpText/FormInfoText"

export default {
    /**
     * Page component, handles contact form if user wants to send feedback
     * Utilises heavyly components prefixed with Form_ tag in components folder
     */
    name: "contact-page",
    components: { Divider, LoadinIcon, FormLabel, FormInput, FormDropdown, FormTextArea, FormInfoText},
    head(){
        return{
            title: this.$t("metadata.titleStart") + this.$t("metadata.contact.title"),
            meta:[
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$t("metadata.contact.description"),
                }
            ]
        }
    },
    created: function() {
        this.pageLoading = false;
        this.timeStamp = Date.now();
    },
    activated(){
        this.$store.dispatch("changeActivePage", this.$t("pageTexts.contact"));
        this.$axios.post("/log", {
            "appid":this.$cookies.get("appid"),
            "time": new Date(),
            "logtype": this.$logTypes("page"),
            "visitedpage": this.$route.path,
            "locale": this.$cookies.get("language"),
            "device": process.client ? window.innerWidth : "UNKNOWN",
            "link": "",
            "detail": "",
            "cookies": this.$cookies.get("cookieConsent")
        },{params:{"appid": this.$cookies.get("appid")}}).then();
    },
    /**
     * Delete anonymous user if we still have one at this state
     */
    beforeDestroy() {
        const user = this.$fire.auth.currentUser;
        if (user) {
            user.delete().catch((error) => {});
        }
    },
    data() {
        return {
            errormessage: "",
            error: false,
            loading: false,
            submitted: false,
            pageLoading: true,
            formIsValid: false,
            timeStamp: "",
            formData:{}
        };
    },
    methods: {
        /**
         * Form submit function
         * triggers anonymous authentication to firebase and validates data in cloud
         * Submits data if it is valid
         */
        async submitForm(e) {
            let fillTime = Date.now();
            if (this.formIsValid) {
                this.loading = true;
                // log in anonymously
                await this.$fire.auth.signInAnonymously().catch((error) => {});
                // if we are logged in succesfully
                if (await this.$fire.auth.currentUser) {
                    const axiosData = {
                        headline: this.formData.headLine || "",
                        type: this.formData.type || "",
                        email: this.formData.email || null,
                        message: this.formData.message || "",
                        name: e.target.name.value || "",
                        fillTime: Math.floor((fillTime - this.timeStamp) / 1000),
                    }
                    // validate data in cloud and submit
                    const axiosResponse = await this.$axios
                        .post("/submitvalidate",{ axiosData }, {params:{"appid":this.$cookies.get("appid")}})
                        .catch((error) => {
                            this.$axios.post("/log", {
                                "appid":this.$cookies.get("appid"),
                                "time": new Date(),
                                "logtype": this.$logTypes("error"),
                                "visitedpage": this.$route.path,
                                "locale": this.$cookies.get("language"),
                                "device": process.client ? window.innerWidth : "UNKNOWN",
                                "link": "form data submit",
                                "detail": error,
                                "cookies": this.$cookies.get("cookieConsent")
                            },{params:{"appid": this.$cookies.get("appid")}}).then();

                        });                    
                    if(typeof axiosResponse !== "undefined" && axiosResponse.data === 200){
                        // form was succesfully submitted
                        this.removeAuth()
                        this.loading = false;
                        this.submitted = true;
                        this.errormessage = this.$t("formPage.formSucces");
                        this.error = false;
                    }
                    // we have form validation/axios error!
                    else{
                        this.removeAuth();
                        this.loading = false;
                        this.errormessage = this.$t("formPage.errorInFilling");
                        this.error = true;
                    }
                }
            }
        },
        /**
         * Child components emit changes to here (if their field is validated to correct)
         * on key up
         */
        updateData(args){
            this.formData[args.name] = args.value;
            this.checkFormData();
        },
        /**
         * Checks that form can be submitted
         * makes decision based on formData length and with exception that email can be empty
         */
        checkFormData(){
            if(Object.keys(this.formData).length === 3 && typeof this.formData.email === "undefined"){
                this.formIsValid = true;
            }else if(Object.keys(this.formData).length === 4){
                this.formIsValid = true;
            }
            else{
                this.formIsValid = false;
            }
        },
        /**
         * removes anonymous user from firebase.
         * If some point adding log in functionality
         * this migth raise errors!
         */
        removeAuth(){
            const user = this.$fire.auth.currentUser;
            if (user) {
                user.delete().catch((error) => {
                    this.$axios.post("/log", {
                        "appid":this.$cookies.get("appid"),
                        "time": new Date(),
                        "logtype": this.$logTypes("error"),
                        "visitedpage": this.$route.path,
                        "locale": this.$cookies.get("language"),
                        "device": process.client ? window.innerWidth : "UNKNOWN",
                        "link": "Auth remove error in contact",
                        "detail": error,
                        "cookies": this.$cookies.get("cookieConsent")
                    },{params:{"appid": this.$cookies.get("appid")}}).then();
                });
            }
        }

    },
};
</script>

<style scoped>
p {
    font-family: "Lato", "sans-serif";
    width: 50%;
}

h3 {
    font-family: "Lato", "sans-serif";
    width: 80%;
}

.formSection{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 0;
}

.formSectionCenter{
    text-align: center;
}

.honey {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    z-index: -1;
}

.container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: auto;
}

form {
    width: 80%;
    margin: auto;
}

.alignCenter {
    text-align: center;
}

textarea,
input,
select {
    box-shadow: 1px 1px 5px #67595e;
    border: 2px solid #67595e;
    border-radius: 5px;
    font-family: "Lato", "sans-serif";
}
input,
select {
    height: 2em;
}

.subMitFormBtn {
    padding: 10px 20px;
    background-color: var(--helperColor);
    border-radius: 5px;
    cursor: pointer;
}

.subMitFormBtn:hover {
    padding: 10px 20px;
    background-color: var(--highLigthColor);
    animation: rubberBand forwards;
    animation-duration: 1s;
    animation-iteration-count: 1;
}

.disabled {
    opacity: 0.5;
}

@media only screen and (max-width: 1050px) {
    p {
        width: 100%;
    }
}
@media only screen and (max-width: 650px) {
    .container {
        width: 90%;
    }
}
@media only screen and (max-width: 520px) {
    .container {
        width: 95%;
    }
}
</style>
