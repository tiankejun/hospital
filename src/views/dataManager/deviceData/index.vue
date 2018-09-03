<template>
    <div class="device-data">
        <el-tabs v-model="currentTab" type="border-card"  @tab-remove="removeTab">
            <el-tab-pane
                v-for="(item, index) in tabList"
                :key="index"
                :label="item.title"
                :name="item.name">
                <component v-bind:is="item.comName" @editData="editData"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import List from './list.vue'
import Edit from './edit.vue'
export default {
    name: 'DeviceData',
    components: {
        List,
        Edit,
    },
    data () {
        return {
            currentTab: '1',
            tabList: [{
                title: '列表',
                name: '1',
                comName: 'List'
            }],
            tabIndex: 2
        }
    },
    methods: {
        editData(type) {
            let hasAddPanel = false
            let newTabName = type === 'add' ? '2' : '3'
            this.tabList.forEach(item => {
                if (item.name === newTabName) {
                    hasAddPanel = true
                }
            })
            if (!hasAddPanel) {
                if (type === 'add') {
                    this.tabList.push({
                        title: '新增',
                        name: '2',
                        comName: 'Edit'
                    })
                } else {
                    this.tabList.push({
                        title: '编辑',
                        name: '3',
                        comName: 'Edit'
                    })
                }
            }
            this.currentTab = newTabName
        },
        removeTab(targetName) {
            let tabs = this.tabList
            let activeName = this.currentTab
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                })
            }
            this.currentTab = activeName
            this.tabList = tabs.filter(tab => tab.name !== targetName)
        }
    }
}
</script>
<style scoped>
.device-data {
    padding-top: 5px;
    background: #FFF;
}
</style>

