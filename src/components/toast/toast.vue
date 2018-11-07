<template>
    <div>
        <div class="dialog-tips">
            <slot></slot>
        </div>
        <div class="shadow"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                message: "这是vue全局组件"
            };
        }
    }
</script>
<style lang="scss">
    .dialog-tips{
        position: absolute;
        bottom:0;
        z-index:100 ;
        background: #fff;
        width:100%;
        min-height:300px;
        color: #000;
    }
    .shadow{
        width: 100%;
        height:100%;
        background: #000;
        opacity: 0.6;

    }
</style>
