<template>
    <div>首页</div>
</template>
<script>
import apis from '@/api'
export default {
    name: 'Home',
    data () {
        return {
            
        }
    },
    created () {
        apis.getDictionary().then(res => {
            let data = res && JSON.stringify(res)
            localStorage.setItem('Dictionary', data)
        })
    },
    methods: {
        
    }
}
</script>

