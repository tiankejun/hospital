<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'DataManager',
    data () {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style lang="less">
.base-data, .device-data {
    width: 100%;
    overflow: auto;
    padding: 0 20px 20px;
    background: #FFF;
    .tital {
        padding-left: 5px;
        font-size: 16px;
        text-align: left;
        border-left: 5px solid #409EFF;
    }
    .panel-content {
        .buttons {
            text-align: right;
        }
    }
}
</style>



