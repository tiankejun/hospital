<template>
    <div class="com-input">
        <label class="com-label" :title="lable">{{lable}}</label>
        <el-input v-model="textValue" placeholder="请输入内容" @input="change"></el-input>
    </div>
</template>
<script>
export default {
    name: 'MyInput',
    props: {
        lable: {
            type: String,
            default: '标签名'
        },
        value: {
            type: String,
            default: ''
        },
        // fontSize: {
        //     type: String,
        //     default: '12'
        // },
        // lableWith: {
        //     type: String,
        //     default: 'auto'
        // }
    },
    data () {
        return {
            textValue: this.value
        }
    },
    methods: {
        change () {
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
        width: 290px;
        padding-right: 5px;
        line-height: 40px;
        font-size: 12px;
        text-align: right;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>


