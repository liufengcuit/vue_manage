<template>
    <div class="home">
        <div class="left-menu">
            <div class="left-menu-title">
                Logo
            </div>
            <side-nav :isCollapse="isCollapse"></side-nav>
        </div>
        <div class="right-content">
            <div class="right-content-title">
                <div class="collapse">
                    <i :class="isCollapse? 'el-icon-s-unfold': 'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
                </div>
                <div class="user-info">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            欢迎您，刘峰<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="loginOut">退出系统</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="right-content-router">
                <transition name="fade">
                    <router-view v-if="isRefresh"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';
    import SideNav from '@/components/SideNav.vue';
    export default {
        name: 'home',
        components: {
            SideNav
        },
        provide() {
            return {
                isReload: this.reload
            }
        },
        data() {
            return {
                isCollapse: false,
                isRefresh: true
            }
        },
        methods: {
            reload(){
                this.isRefresh = false;
                this.$nextTick(()=>{
                    this.isRefresh = true
                })
            },
            loginOut() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        display: flex;
        .left-menu {
            border-right: solid 1px #e6e6e6;
            .left-menu-title {
                height: 70px;
                background: #25979A;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
            }
        }
        .right-content {
            flex: 1;
            height: 100%;
            .right-content-title {
                height: 70px;
                position: relative;
                border-bottom: 1px solid #ddd;
                background-color: #f6f6f6;
                box-sizing: border-box;
                .collapse {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
                .user-info {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    .el-dropdown-link {
                        cursor: pointer;
                        color: #409EFF;
                    }
                    .el-icon-arrow-down {
                        font-size: 12px;
                    }
                }
            }
            .right-content-router {
                padding-left: 20px;
                height: calc(100vh - 70px);
                box-sizing: border-box;
                overflow: hidden;
            }
        }
        .fade-enter-active {
            transition: all .3s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transform: translateX(-20px);
            opacity: 0;
        }
    }
</style>