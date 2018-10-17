<template>
    <div class="selection">
        <div class="slide">
            <span class="arrow" @click="arrowHandler('left')">&lt;&lt;</span>
        </div>
        <div class="center">
            <img class="brand-img" :src="imgUrl">
            <a class="titleName" href="javascript:;" :title="currentName">
                <el-cascader
                    class="cascader"
                    expand-trigger="hover"
                    clearable
                    :options="selectOption"
                    v-model="values"
                    @change="getParamter">
                </el-cascader>
            </a>
        </div>
        <div class="slide">
            <span class="arrow" @click="arrowHandler('right')">&gt;&gt;</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Selection',
    props: {
        colIndex: {
            type: Number
        },
        imgURL: {
            type: String,
            default: '/static/img/default.png'
        },
        selectOption: {
            type: Array,
            default: []
        },
        selectedValue: {
            type: Array,
            default () {
                return []
            }
        },
        currentName: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            params: [],
        }
    },
    computed: {
        imgUrl () {
            return this.imgURL
        },
        values: {
            get () {
                // 深拷贝
                let current = JSON.parse(JSON.stringify(this.selectedValue))
                return current
            },
            set (value) {
                // 深拷贝
                let current = value || JSON.parse(JSON.stringify(this.selectedValue))
                return current
            }
        },
    },
    methods: {
        getParamter (data) {
            let optionInfo = {
                data: data,
                index: this.colIndex
            }
            this.$emit('getParams', optionInfo)
        },
        arrowHandler (dir) {
            let moveInfo = {
                dir: dir,
                index: this.colIndex
            }
            this.$emit('moveData', moveInfo)
        }
    }
}
</script>
<style lang="less">
.selection {
    display: flex;
    width: 100%;
    height: 216px;
    margin-bottom: 15px;
    padding: 10px 0;
    border-radius: 8px;
    background: #FFF;
    .slide {
        width: 20px;
        display: flex;
        .arrow {
            display: flex;
            flex: 1;
            align-items: center;
            cursor: pointer;
        }
    }
    .center {
        flex: 1;
    }
    .titleName {
        display: block;
        width: 100%;
    }
    .brand-img {
        display: block;
        // width: 90%;
        max-height: 150px;
        max-width: 150px;
        margin: 0 auto;
        margin-bottom: 10px;
    }
    .cascader {
        display: block;
        width: 90%;
        margin: 0 auto
    }
}
</style>

