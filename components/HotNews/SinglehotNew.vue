<template>
    <div>
        <h3>{{ headline }}</h3>
        <p>{{ message }}</p>
        <p>
            <i>{{ date }}</i>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        date: String,
        headline: String,
        message: String,
    },
};
</script>

<style scoped></style>
