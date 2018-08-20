<template>
    <div class="device-data">
        <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="数据列表" name="list">数据列表</el-tab-pane>
            <el-tab-pane label="编辑数据" name="edit">编辑数据</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'DeviceData',
    data () {
        return {
            activeName: 'list'
        }
    },
    methods: {
        changeTab (tabName) {
            console.log(tabName.name)
        },
    }
}
</script>

