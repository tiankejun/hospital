import DataManager from '@/views/dataManager/index.vue'
import BaseData from '@/views/dataManager/baseData/index.vue'
import DeviceData from '@/views/dataManager/deviceData/index.vue'

export default [{
    path: '/DataManager',
    name: 'DataManager',
    component: DataManager,
    children: [
        {
            path: '/DataManager/BaseData',
            name: 'BaseData',
            component: BaseData,
        },
        {
            path: '/DataManager/DeviceData',
            name: 'DeviceData',
            component: DeviceData,
        }
    ]
}]
