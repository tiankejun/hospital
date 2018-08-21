<template>
    <div>首页</div>
</template>
<script>
import {
    getDictionary,
 } from '@/api'
export default {
    name: 'Home',
    data () {
        return {
            
        }
    },
    created () {
        getDictionary().then(res => {
            if (res.data && res.data.length) {
                let data = res && JSON.stringify(res.data)
                localStorage.setItem('Dictionary', data)
            }
        })
    },
    methods: {
        
    }
}
</script>

