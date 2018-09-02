<template>
    <div :class="{'side-bar': 'side-bar', 'sideSystem-full': sideFull, 'sideSystem-mini': !sideFull}">
        <div class="logo">
            <div class="full-logo" v-if="sideFull"></div>
        </div>
        <el-switch class="switch" v-model="sideFull" @change="changeScreen"/>
        <div class="side-bar-menue">
            <el-menu class="el-menu-vertical-demo" 
                router
                text-color="#FFF"
                background-color="#2e3d51"
                active-text-color="#409EFF"
                :default-active="$route.path" 
                :collapse="isCollapse" 
                @open="handleOpen" 
                @close="handleClose">
                <div v-for="(item, index) in MenuList" :key="index">
                    <el-submenu :index="item.router" v-if="item.children && item.children.length">
                        <template slot="title">
                            <i class="el-icon-setting" ></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <el-menu-item :index="child.router"  v-for="(child, childIndex) in item.children" :key="childIndex" >
                            {{child.title}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="item.router" v-else >
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </div>  
            </el-menu>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import routers from '../common/router.js'
export default {
    name: 'SideBar',
    data () {
        return {
            sideFull: true,
            isCollapse: false,
            MenuList: routers,
        }
    },
    computed: {
        // ...mapState('common', [
        //     'MenuList',
        // ]),
    },
    created () {
        // console.log(this.MenuList)
    },
    methods: {
        changeScreen (value) {
            this.sideFull = value
             this.isCollapse = !value
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="less">
.sideSystem-full { width: 200px;}
.sideSystem-mini { width: 46px;}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    overflow: hidden;
    border-right: none;
  }
  .el-menu--collapse>div>.el-menu-item span, .el-menu--collapse>div>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }

.sideSystem-full, .sideSystem-mini {
    background: #2e3d51;
    overflow: auto;
    color: #bdbdbd;
    position: relative;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
}
.side-bar {
    .full-logo { 
        width: 100px; 
        height: 54px;
        margin: 40px auto; 
        background: url(../../../static/img/logo.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .small-logo { 
        width: 46px; 
        height: 46px; 
        margin: 40px auto; 
        background: indianred;
    }
    .switch {margin: 20px auto;}
    // .icon-electrocardio {background-image: url(../../../static/img/electrocardio.png);}
    // .icon-data {background-image: url(../../../static/img/data.png);}
    // .icon-admin {background-image: url(../../../static/img/admin.png);}
    // .icon-hospital {background-image: url(../../../static/img/hospital.png);}
    
}

</style>


