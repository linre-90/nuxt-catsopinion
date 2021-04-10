<template>
    <div>
        <!--<label for="headline">{{$t("formPage.formHeader")}}</label>-->
        <label :for="labelFor">{{textContent}}</label>
    </div>
</template>

<script>
export default {
    data(){
        return{
             valid: false
        }
    },
    props:{
        labelFor: String,
        textContent:String
    }
}
</script>

<style scoped>
label {
    font-family: "Lato", "sans-serif";
}
div{
    margin-left: 0;
    width:100px;
    padding: 0;
    text-align: left;
}

</style>