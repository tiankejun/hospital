<template>
    <div class="device-data">
        <el-tabs class="panel-wrap" v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="数据列表" name="list" >
                <div class="panel-wrap">
                    <div class="panel-content">
                        <el-button type="primary" plain>添加</el-button>
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
                                <el-button @click="editorData(scope.row)" type="text" size="small">编辑</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <!-- <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage2"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="100"
                            layout="sizes, prev, pager, next"
                            :total="1000">
                        </el-pagination> -->
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="编辑数据" name="edit">
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {
    editorData,
    getDatalist,
 } from '@/api'
export default {
    name: 'DeviceData',
    data () {
        return {
            activeName: 'list',
            params: {},
            pages: {},
            list: [],
            modleData: [{
                modelId: 0,
                nmrArgsId: 0,
                val: ''
            }]
        }
    },
    mounted () {
        this.getListData()
    },
    methods: {
        changeTab (tabName) {
            console.log(tabName.name)
        },
        getListData () {
            let params = {
                currentpage: 1,
                pageSize: 10,
            }
            getDatalist(params).then(res => {
                if (res.data.list) {
                    this.list = res.data.list || []
                }
            }).catch(res => {
                console.log(res)
            })
        },
        editorData (item) {
            this.activeName = 'edit'
            console.log(item)
            let params = {
                modelId: this.manuId
            }
            editorData(params).then(res => {
                console.log(res.data)
            }).catch(res => {
                console.log(res)
            })
        },
    }
}
</script>
<style lang="less">
.device-data {
    overflow: auto;
}
</style>

