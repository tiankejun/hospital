<template>
    <div class="magnetic">
        <h2 class="title">磁共振数据对比</h2>
        <el-row type="flex" :gutter="20" justify="space-around">
            <el-col :span="6" class="tabel-header">
                <div class="selection header-top">
                    <el-checkbox v-model="hiddenSameItem" @change="hiddenSameItemFn">隐藏相同相</el-checkbox>
                </div>
                <div class="grid-content">
                    <el-collapse v-model="activeNames" v-for="(group, key, index) in colomTitle" :key="index" @change="handleChange">
                        <el-collapse-item :title="group.title" :name="group.key">
                            <div class="item" v-for="(fieldName, fieldKey) in group.fields" :key="fieldKey">
                                {{fieldName.title}}
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div
            ></el-col>
            <el-col :span="6" v-for="(colData, colIndex) in colomData" :key="colIndex">
                <!-- :imgURL="colData.imgURL"  -->
                <Selection :colIndex="colIndex" 
                    :selectOption="selectOption" 
                    :selectedValue="selectedValue[colIndex]"  
                    @getParams="getParams" 
                    @moveData="moveData"/>
                <div class="grid-content">
                    <el-collapse v-model="activeNames" v-if="key !== 'imgURL'" v-for="(model, key, modelIndex) in colData" :key="colIndex + '-' + modelIndex"  @change="handleChange">
                        <el-collapse-item v-if="key !== 'imgURL'" :title="model.title" :name="key">
                            <div v-for="(item, index) in model.fields" :key="index">
                                <span class="item" v-if="item.isEqual">{{item.value}}</span>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
        </el-row>
    </div>
    
</template>
<script>
import {
    getModelData,
    getColData,
    getColName,
 } from '@/api'
import Selection from '@/components/selection.vue'
export default {
    name: 'NuclearMagnetic',
    components: {
        Selection,
    },
    data () {
        return {
            colomData: [],  // 列数据
            colomTitle: [], // 列名
            selectedValue: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ], // 下拉框展示数据
            params: '', // 存储请求参数
            tempData: {},
            hiddenSameItem: false,
            activeNames: ['MagnetSYS', 'RadiofrequencySYS', 'GradientSYS', 'SequenceInfor', 'ComputerSYS'],
        }
    },
    computed: {
        selectOption () {
            let data = localStorage.getItem('Dictionary')
            data = JSON.parse(localStorage.getItem('Dictionary')) || []
            return data
        }
    },
    created () {
        this.getModelData()
        this.getColName()
    },
    methods: {
        // 获取模型数据
        getModelData () {
            return new Promise((resolve, reject) => {
                getModelData().then(res => {
                    this.tempData = res[0]
                    for (let i = 0; i < 5; i++) {
                        this.colomData.push(this.tempData)
                    }
                    resolve()
                })
            })
        },
        // 根据参数获取列数据
        getData (index) {
            let params = {
                modelIds: this.params
            }
            return new Promise((resolve, reject) => {
                getColData(params).then(res => {
                    if (res.data && res.data.length) {
                        // 如果  模版数据的长度 ＝＝＝ 返回数据的长度 则直接赋值
                        if (this.colomData.length === res.data.length) {
                            this.colomData = res.data.splice(0)    
                        } else {
                            // 否则将返回的数据按顺序插入到模板数据的头部
                            // 先删除返回数据的长度
                            this.colomData.splice(index, 1, res.data[0])
                        }
                    }
                    resolve()
                })
            })
        },
        // 获取列名
        getColName () {
            return new Promise((resolve, reject) => {
                getColName().then(res => {
                    if (res.data && res.data.length) {
                        this.colomTitle = res.data
                    }
                    resolve()
                })
            })
        },
        // 隐藏咧
        hiddenSameItemFn (flag) {
            this.hiddenSameItem = flag
            if (this.hiddenSameItem ) {
                this.colomData = this.$tools.hideSameItem(this.colomData)
            } else {
                this.colomData = this.$tools.resetList(this.colomData)
            }
        },
        // 数据左右移动
        moveData (moveInfo) {
            let data = JSON.parse(JSON.stringify(moveInfo))
            // 获取当前索引
            let currentIndex = data.index
            // 获取当前索引对应的值
            let currentData = this.colomData[currentIndex]
            // 当前选中的下拉框
            let currentSelected = this.selectedValue[currentIndex]
            // 要传给后台的值
            let currentValue = this.params[currentIndex]
            if (moveInfo.dir === 'left') {
                if (moveInfo.index === 0) {
                    return
                }
                currentIndex = currentIndex - 1
            } else if (moveInfo.dir === 'right') {
                if (moveInfo.index === this.colomData.length) {
                    return
                }
                currentIndex = currentIndex + 1
            }
            this.colomData.splice(data.index, 1)
            this.colomData.splice(currentIndex, 0, currentData)
            this.selectedValue.splice(data.index, 1)
            this.selectedValue.splice(currentIndex, 0, currentSelected)
        },
        // 下拉框事件
        getParams (optionInfo) {
            // console.log('test', optionInfo)
            let data = optionInfo.data
            let index = optionInfo.index
            // 如果有值，则改变原数据， 否则，赋值为默认值
            if (data.length) {
                let modelId = data[2]
                // 替换当前选择下拉框的值，index 为当前列索引
                this.selectedValue.splice(index, 1, data)
                this.params = modelId
                this.getData(index)
            } else {
                // 删除后赋默认数据
                this.colomData.splice(index, 1, this.tempData)
                this.selectedValue.splice(index, 1, ['', '', ''])
            }
        },
        // 收起，展开功能
        handleChange (val) {
            console.log(val)
        }
    }
}
</script>
<style lang="less">
.magnetic{
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    .title {
        padding-left: 30px;
        font-size: 14px;
        color: #4a4a4a;
        text-align: left;
    }
    .header-top {
        padding-left: 10px;
        text-align: left;
    }
    .tabel-header {
        .el-collapse-item__wrap {
            background: #f9f9f9;
        }
    }
    .item {
        display: block;
        height: 32px;
        padding: 5px;
        font-size: 12px;
        border-top: 1px solid #CCC;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .grid-content {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        background: #FFF;
    }
}

</style>

