<template>
	<el-container class="home-container">
		<!-- 头部区域-->
		<el-header>
			<div>
				<img src="../assets/heima.png" alt="">
				<span>电商后台管理系统</span>
			</div>
			<el-button type=primary @click="btn">退出</el-button>
		</el-header>

		<el-container>
			<el-aside :width="isCollapse ? '64px':'200px'">
				<div class="aside-button" @click="changeCollapse">|||</div>
				<!--侧边栏-->
				<el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"
					:collapse="isCollapse" :collapse-transition="false" :router="true" default-active="activePath">
					<!--一级菜单-->
					<el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
						<template slot="title">
							<i :class="iconsObj[item.id]"></i>
							<span>{{item.authName}}</span>
						</template>
						<el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id"
							@click="saveNavState('/'+subitem.path)">
							<!--二级菜单-->
							<i class="el-icon-location"></i>
							<span>{{subitem.authName}}</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-main>
				<!--内容区-->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	data () {
		return {
			menuList: null,
			iconsObj: {
				'125': 'iconfont icon-user',
				'103': 'iconfont icon-tijikongjian',
				'101': 'iconfont icon-shangpin',
				'102': 'iconfont icon-danju',
				'145': 'iconfont icon-baobiao'
			},
			isCollapse: false,
			activePath: ''
		}
	},
	created () {
    this.getMenuList()
    this.activePath=window.sessionStorage.getItem('activePath')
	},
	methods: {
		btn () {
			window.sessionStorage.clear()
			this.$router.push('/login')
		},
		async	getMenuList () {
			const { data: res } = await this.$http.get('menus')
			if (res.meta.status != 200) return this.$message.error(res.meta.msg)
			this.menuList = res.data
			console.log(res);
		},
		changeCollapse () {
			this.isCollapse = !this.isCollapse
		},
		saveNavState (pathName) {
			window.sessionStorage.setItem("activePath", pathName)
			this.activePath = pathName
		}
	}
}
</script>

<style lang="less" scoped>
.home-container {
	height: 100%;
}
.el-header {
	background: #373d41;
	line-height: 60px;
	display: flex;
	justify-content: space-between;
	padding-left: 0;
	color: #fff;
	font-size: 20px;
	> div {
		display: flex;
		align-items: center;
		span {
			margin-left: 10px;
		}
	}
}
.el-aside {
	background: #333744;
	overflow: hidden;
	.aside-button {
		text-align: center;
		color: #fff;
		cursor: pointer;
	}
}
.el-main {
	background: #eaedf1;
}
</style>