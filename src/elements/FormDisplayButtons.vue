<template>
    <div class="display-form-section">
        <sui-button color="green" content="Siguiente Cliente" basic />
         <sui-button color="red" content="Eliminar" basic />
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
.display-form-section{
    position: relative;
    display: flex;
    justify-content: space-between;
}
</style>