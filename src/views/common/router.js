export default [
    {
        router: '/',
        title: '首页',
        name: '',
        icon: 'icon-electrocardio',
        component: 'Home',
    },
    {
        router: '/NuclearMagnetic',
        title: '磁共振数据对比',
        name: 'NuclearMagnetic',
        icon: 'icon-data',
        component: 'NuclearMagnetic'
    },
    // {
    //     router: '/test2',
    //     title: '磁共振用户管理',
    //     name: '',
    //     icon: 'icon-admin',
    //     component: 'test2'
    // },
    // {
    //     router: '/test3',
    //     title: '磁共振医院管理',
    //     name: '',
    //     icon: 'icon-hospital',
    //     component: 'test3'
    // },
    {
        router: '/DataManager',
        title: '磁共振数据管理',
        name: '',
        icon: '',
        component: 'test3',
        children: [
            {
                router: '/DataManager/BaseData',
                title: '基础数据管理',
                name: '',
                icon: 'icon-hospital',
                component: 'test3',
            }, {
                router: '/DataManager/DeviceData',
                title: '设备信息管理',
                name: '',
                icon: 'icon-hospital',
                component: 'test3',
            }
        ]
    }
]