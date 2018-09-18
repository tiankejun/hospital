<template>
    <div class="home">欢迎试用核磁共振数据对比系统</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {
    GetSpecsAPI,
    GetManusAPI,
    GetDictionaryAPI,
 } from '@/api'

export default {
    name: 'Home',
    data () {
        return {}
    },
    computed: {
        ...mapState('common', [
            'Dictionary',
            'SpecsData',
            'ManusData',
            'BaseUrl',
        ])
    },
    created() {
        this.getDictionary()
        this.getSpecs()
        this.getManus()
        this.update_baseurl('http://101.231.40.243:42561/')
        console.warn('BaseUrl', this.BaseUrl)
    },
    methods: {
        ...mapActions('common', [
            'update_dictionary',
            'update_specsdata',
            'update_manusdata',
            'update_baseurl',
        ]),
        // 获取列数据对比下拉框字典值
        getDictionary () {
            GetDictionaryAPI().then(res => {
                if (res.data && res.data.length) {
                    let data = res && res.data
                    this.update_dictionary(data)
                    localStorage.setItem('Dictionary', JSON.stringify(res.data))
                }
            })
        },
        // 获取规格数据
        getSpecs () {
            GetSpecsAPI().then(res => {
                if (res.data && res.data.length) {
                    let data = res && res.data
                    this.update_specsdata(data)
                    localStorage.setItem('SpecsData', JSON.stringify(res.data))
                }
            })
        },
        // 获取厂商数据
        getManus () {
            GetManusAPI().then(res => {
                if (res.data && res.data.length) {
                    let data = res && res.data
                    this.update_manusdata(data)
                    localStorage.setItem('ManusData', JSON.stringify(res.data))
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.home {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    padding-top: 50px;
    font-size: 16px;
    text-align: center;
    color: #007ece;
}
</style>

