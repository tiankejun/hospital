<template>
    <div>首页</div>
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
        ])
    },
    created() {
        this.getDictionary()
        this.getSpecs()
        this.getManus()
    },
    methods: {
        ...mapActions('common', [
            'update_dictionary',
            'update_specsdata',
            'update_manusdata',
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

