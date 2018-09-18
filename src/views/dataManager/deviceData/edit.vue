<template>
    <el-dialog class="dialog" :title="title" @open="initPage"
    :visible.sync="dialogVisible"
    :before-close="closeDialog">
        <div class="device-wrap">
            <div class="form-data">
                <div class="items" v-for="(item, index) in deviceData" :key="index">
                    <MyInput :lable="item.title" v-model="item.val"/>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
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
    data () {
        return {
            dialogVisible: false,
            deviceData: []
        }
    },
    // computed: {
    //     deviceData () {
    //         return this.entity
    //     }
    // },
    methods: {
        saveData () {
            AddDataAPI(this.deviceData).then(res => {
                console.log(res.data)
                if (res.data.code) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    })
                } else {
                    this.$message.error('保存失败！');
                }
            }).catch(res => {
                console.log(res)
            })
        },
        initPage () {
            this.deviceData = []
            this.deviceData = JSON.parse(JSON.stringify(this.entity))
        },
        showDialog () {
            this.dialogVisible = true
        },
        closeDialog () {
            this.$confirm('确认关闭？').then(_ => {
                this.deviceData = []
                this.dialogVisible = false
            }).catch(_ => {});
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
    flex-direction: row;
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

