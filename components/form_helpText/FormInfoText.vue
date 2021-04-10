<template>
    <div>
        <h4 v-if="updateMessage.length" v-bind:class="{success: !updateError, error: updateError}">
                {{ message }}
                <i v-if="!updateError" id="formSuccessEmoji" class="far fa-smile-beam success"></i>
                <i v-if="updateError" id="formFailedEmoji" class="far fa-sad-tear error"></i>
        </h4>
    </div>
</template>

<script>
export default {
    /**
     * Shows messages to user
     * in contact page
     */
    props:{
        message: String,
        errorType: Boolean,
    },
    computed:{
        updateMessage(){
            return this.message;
        },
        updateError(){
            return this.errorType;
        }
    }
}
</script>

<style scoped>

h4 {
    font-size: 2em;
}
.success{
    color: green;
}

.error{
    color:red
}
</style>