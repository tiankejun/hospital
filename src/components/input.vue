<template>
    <div class="com-input">
        <label class="com-label">{{lableName}}</label>
        <el-input v-model.trim="value" placeholder="请输入内容" @input="change"></el-input>
    </div>
</template>
<script>
export default {
    name: 'MyInput',
    props: {
        lableName: {
            type: String,
            default: '标签名'
        },
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        change (event) {
            console.log(event)
            let value = event.target.value || ''
            this.$emit('input', value)
        }
    }
}
</script>
<style lang="less" scoped>
.com-input {
    display: flex;
    .com-label{
        display: inline-block;
        width: 150px;
        line-height: 40px;
        font-size: 12px;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>


