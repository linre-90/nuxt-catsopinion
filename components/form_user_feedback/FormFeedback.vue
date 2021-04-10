<template>
    <span>
        <i v-if="isValid" class="fas fa-check success"></i>
        <i v-if="!isValid" class="far fa-times-circle warning"></i>
    </span>
</template>

<script>
export default {
    props:{
        isValid: {type: Boolean, default: false}
    },
}
</script>

<style scoped>
    .warning{
        color:red
    }
    .success{
        color: green;
    }
    
</style>