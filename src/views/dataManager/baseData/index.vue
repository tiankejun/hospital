<template>
    <div class="device-data">
        <h3 class="tital">基础数据管理</h3>
        <div class="panel-content">
            <div class="buttons">
                <el-button @click="getDialogType('', true)" size="small" >新增</el-button>
            </div>
            <el-table
                :data="dataList"
                style="width: 100%">
                <el-table-column
                align="center"
                prop="manuName"
                label="厂商"
                width="150">
                </el-table-column>
                <el-table-column
                align="center"
                prop="specification"
                label="规格">
                </el-table-column>
                <el-table-column
                align="center"
                prop="specModel"
                label="型号">
                </el-table-column>
                <el-table-column
                align="center"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button @click="getDialogType(scope.row, false)" type="text" size="small">编辑</el-button>
                    <!-- <el-button @click="getDialogType(scope.row, true)" type="text" size="small" >新增</el-button> -->
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                @prev-click="currentChange"
                @next-click="currentChange"
                :current-page="page.currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="page.pageSize"
                layout="sizes, prev, pager, next"
                :total="page.total">
            </el-pagination>
            <add-or-edit ref="Edit" :title="title" :isAdd="isAdd" :entity="entityData"></add-or-edit>
        </div>
    </div>
</template>
<script>
import AddOrEdit from './edit.vue'
import {
    EditorDataAPI,
    GetDatalistAPI
 } from '@/api'

export default {
    name: 'BaseData',
    components: {
        AddOrEdit,
    },
    data () {
         return {
            title: '',
            isAdd: false,
            entityData: {},
            dataList: [],
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                username: 'nmr',
                sign: 'b450d420a636973390cfbc3ca3634084'
            },
        }
    },
    mounted () {
        this.getListData()
    },
    methods: {
        getListData () {
            GetDatalistAPI(this.page).then(res => {
                if (res.data.list) {
                    this.dataList = res.data.list || []
                    this.page = res.data.page
                }
            }).catch(res => {
                console.log(res)
            })
        },
        getDialogType (item, flag) {
            console.log(item, flag)
            this.isAdd = flag
            this.title = flag ? '新增厂商信息' : '编辑厂商信息'
            this.entityData = item || {}
            this.$refs.Edit.showDialog()
        },
        sizeChange (pageSize) {
            this.page.pageSize = pageSize
            this.getListData()
        },
        currentChange (currentSize) {
            console.log(currentSize)
            this.page.currentPage = currentSize
            this.getListData()
        },
    }
}
</script>
<style lang="less" scoped>

</style>
