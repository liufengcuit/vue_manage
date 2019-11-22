<template>
    <div class="side-nav">
        <el-menu unique-opened :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isCollapse" router @select="selectItem">
            <el-submenu v-for="item in menu" :key="item.index" :index="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item-group v-if="item.children">
                    <el-menu-item v-for="subItem in item.children" :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="2">
                <template slot="title">
                    <i class="icon-dingdan"></i>
                    <span slot="title">导航二</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="about">关于</el-menu-item>
                    <el-menu-item index="test">测试</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="test">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
    import menu from '@/menu/index';
    export default {
        props: {
            isCollapse: {
                type: Boolean,
                default: false
            }
        },
        inject: ['isReload'],
        data() {
            return {
                menu,
                defaultActive: "test"
            }
        },
        methods: {
            selectItem() {
                this.isReload();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .side-nav {
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 260px;
        }
        .el-menu {
            border-right: none;
        }
    }
</style>