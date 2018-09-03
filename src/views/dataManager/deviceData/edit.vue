<template>
    <div class="device-wrap">
        <div class="items" v-for="(item, index) in formList" :key="index">
            <MyInput :lable="item.title" v-model="item.val"/>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {
    addData,
    editorData,
 } from '@/api'
import MyInput from '@/components/input.vue'
export default {
    name: 'Edit',
    components: {
        MyInput
    },
    data () {
        return {
            test:'',
            formList: []
        }
    },
    computed: {
        ...mapState('common', [
            'ModelId',
        ]),
    },
    mounted () {
        this.getModleData()
    },
    methods: {
        getModleData () {
            let params = {
                modelId: this.ModelId
            }
            editorData(params).then(res => {
                console.log(res.data)
                if (res.data && res.data.length) {
                    this.formList = res.data
                }
            }).catch(res => {
                console.log(res)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.items {
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 5px 0px;
}
</style>

