<template>
    <div class="display-form-section">
        <h2 class="field-name">{{name}}</h2>
        <span class="field-value">{{value}}</span>
    </div>
</template>

<script>
    export default {
        props:[
            'name',
            'value'
        ]
    }
</script>

<style scoped>
.field-name {
    color:brown;
    left: 0;
    margin: auto;
    margin-left: 0px;
}
.field-value {
    right: 50;
    font-weight: bold;
    font-size: 20px;
    margin: auto;
    margin-right: 0px;
}
.display-form-section{
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 3px;
}
</style>