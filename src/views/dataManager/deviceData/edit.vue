<template>
    <el-dialog class="dialog" :title="title" @open="initPage"
    :visible.sync="dialogVisible"
    :before-close="closeDialog">
        <div class="device-wrap">
            <div class="form-data">
                <div class="items" v-for="(item, index) in entity" :key="index">
                    <MyInput :lable="item.title" v-model="item.val"/>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveData">保 存</el-button>
        </span>
    </el-dialog>
</template>
<script>
import MyInput from '@/components/input.vue'
import { mapState, mapActions } from 'vuex'
import {
    AddDataAPI,
 } from '@/api'

export default {
    name: 'Edit',
    props: {
        title: {
            type: String,
            default: '提示'
        },
        entity: {
            type: Array,
        }
    },
    components: {
        MyInput
    },
    computed: {
        // ...mapState('common', [
        //     'entityData'
        // ])
    },
    data () {
        return {
            dialogVisible: false
        }
    },
    methods: {
        saveData () {
            AddDataAPI(this.entity).then(res => {
                console.log(res.data)
            }).catch(res => {
                console.log(res)
            })
        },
        initPage () {
            // this.formList = [...this.entity]
        },
        showDialog () {
            this.dialogVisible = true
        },
        closeDialog () {
            this.dialogVisible = false
        }
    }
}
</script>
<style >
.dialog {
    overflow: hidden;
}
.el-dialog { 
    width: 80%;
    max-height: 480px;
    overflow: auto;
}
.device-wrap {
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.form-data {
    flex: 1;
}
.items {
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 5px 0px;
}

</style>

