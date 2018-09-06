<template>
    <div class="device-data">
        <h3 class="tital">设备列表</h3>
        <div class="panel-content">
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
                    <el-button @click="getDialogType(scope.row, true)" type="text" size="small" >添加</el-button>
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
        </div>
        <add-or-edit ref="Edit" :title="title" :entity="entityData"></add-or-edit>
    </div>
</template>
<script>
import AddOrEdit from './edit.vue'
import { mapState, mapActions } from 'vuex'
import {
    EditorDataAPI,
    GetDatalistAPI
 } from '@/api'

export default {
    name: 'DeviceData',
    components: {
        AddOrEdit,
    },
    data () {
        return {
            title: '',
            entityData: [],
            dataList: [],
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
        }
    },
    // computed: {
    //     ...mapState('common', [
    //         'entityData'
    //     ])
    // },
    mounted () {
        this.getListData()
    },
    methods: {
        // ...mapActions('common', [
        //     'update_entitydata',
        // ]),
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
            this.title = flag ? '新增设备信息' : '编辑设备信息'
            this.getModleData(item.id)
        },
        getModleData (modelId) {
            let params = {
                modelId: modelId
            }
            EditorDataAPI(params).then(res => {
                console.log(res)
                if (res.data) {
                    this.entityData = res.data || []
                    this.entityData.forEach(item => {
                        item.modelId = modelId
                    })
                    // this.update_entitydata(entityData)
                    this.$refs.Edit.showDialog()
                }
            }).catch(res => {
                console.log(res)
            })
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
.device-data {
    padding-top: 5px;
    overflow: auto;
    background: #FFF;
    .tital {
        padding-left: 5px;
        font-size: 16px;
        text-align: left;
        border-left: 5px solid #409EFF;
    }
}
</style>

