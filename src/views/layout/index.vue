<template>
    <div :class="{'side-bar': 'side-bar', 'sideSystem-full': sideFull, 'sideSystem-mini': !sideFull}">
        <div class="logo">
            <div class="full-logo" v-if="sideFull"></div>
        </div>
        <el-switch class="switch" v-model="sideFull" @change="changeScreen"/>
        <div class="side-bar-menue">
            <ul class="menue-list">
                <li 
                    class="menue"
                    v-if="MenuList.length"
                    v-for="(item, index) in MenuList"
                    :key="index">
                    <router-link :to="item.router">
                        <div :class="{current: $route.path === item.router}">
                            <i :class="['icon', item.icon]" v-if="!sideFull"></i>
                            <div v-if="sideFull">{{item.title}}</div> 
                        </div>
                        <ul class="child-menue-list" v-show="item.children" v-if="item.children && item.children.length">
                            <li class="child-menue" v-for="(child, index) in item.children" :key="index">
                                <router-link :to="child.router">
                                    <div :class="{childCurrent: $route.path === child.router}">
                                        <i :class="['icon', item.icon]" v-if="!sideFull"></i>
                                        <div v-if="sideFull">{{child.title}}</div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </router-link>
                </li>
            </ul>
            <!-- <el-menu
                default-active="2"
                class="menu"
                @open="handleOpen"
                @close="handleClose"
                mode="vertical"
                :collapse="sideFull"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title" > 
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu> -->
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
        },
        handleOpen () {},
        handleClose () {},
    }
}
</script>
<style lang="less">
.sideSystem-full, .sideSystem-mini {
    background: #2e3d51;
    overflow: auto;
    color: #bdbdbd;
    position: relative;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
}
.sideSystem-full { width: 180px;}
.sideSystem-mini { width: 46px;}
// .menu:not(.el-menu--collapse) {
//     width: 46px;
//     min-height: 40px;
//   }
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
    .side-bar-menue, .menue-list, .menue {
        display: block;
        .menue a {
            display: block;
            // height: 40px;
            font-size: 14px;
            line-height: 40px;
            text-decoration: none;
            color: #FFF;
            border-left: 3px solid #2e3d51;
        }
        .menue .current { background: #273446; border-left: 3px solid #4b9de6;}

        .child-menue-list {
            display: block;
            .child-menue a {
                display: block;
                line-height: 35px;
                padding-left: 5px;
                font-size: 12px;
                border-left: 1px solid #2e3d51
            }
            .childCurrent {
                background: #273446; border-left: 1px solid #4b9de6
            }
        }
    }
    .icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .icon-electrocardio {background-image: url(../../../static/img/electrocardio.png);}
    .icon-data {background-image: url(../../../static/img/data.png);}
    .icon-admin {background-image: url(../../../static/img/admin.png);}
    .icon-hospital {background-image: url(../../../static/img/hospital.png);}
    
}

</style>


