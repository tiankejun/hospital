<template>
    <div class="device-wrap">
        <div class="panel-content">
            <el-button type="primary" plain @click="editData">添加</el-button>
            <el-table
                :data="list"
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
                    <el-button @click="editData(scope.row)" type="text" size="small">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page.pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="page.pageSize"
                layout="sizes, prev, pager, next"
                :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {
    editorData,
    getDatalist,
 } from '@/api'
export default {
    name: 'List',
    data () {
        return {
            params: {},
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            list: [],
        }
    },
    computed: {
        ...mapState('common', [
            'ModelId',
        ]),
    },
    mounted () {
        this.getListData()
    },
    methods: {
        ...mapActions('common', [
            'update_modelid'
        ]),
        getListData () {
            let params = {
                currentPage: 1,
                pageSize: 10,
            }
            getDatalist(params).then(res => {
                if (res.data.list) {
                    this.list = res.data.list || []
                    this.page = res.data.page
                }
            }).catch(res => {
                console.log(res)
            })
        },
        editData (item) {
            if (item) {
                this.update_modelid(item.manuId)
                this.$emit('editData', 'edit')
                return
            }
            this.$emit('editData', 'add')
        },
        sizeChange (pageSize) {
            this.page.pageSize = pageSize
            this.getListData()
        },
        currentChange (currentSize) {
            this.page.currentPage = currentSize
            this.getListData()
        }
    }
}
</script>
<style lang="less">
.device-data {
    overflow: auto;
}
</style>

