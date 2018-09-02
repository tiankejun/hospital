<template>
    <div class="device-wrap">
        <div class="panel-content">
            <MyInput :lable="'字段名'" v-model="test"/>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {
    addData,
    editorData,
 } from '@/api'
import MyInput from '@/components/input.vue'
export default {
    name: 'edit',
    components: {
        MyInput
    },
    data () {
        return {
            test:''
        }
    },
    computed: {
        ...mapState('common', [
            'ModelId',
        ]),
    },
    mounted () {
        this.getModleData()
    },
    methods: {
        getModleData () {
            let params = {
                modelId: this.ModelId
            }
            editorData(params).then(res => {
                console.log(res.data)
            }).catch(res => {
                console.log(res)
            })
        }
    }
}
</script>

