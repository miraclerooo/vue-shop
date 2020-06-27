<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<el-row :gutter="20">
				<el-col :span="7">
					<el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getUsersList">
						<el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
				</el-col>
			</el-row>
			<el-table :data="usersList" border stripe>
				<el-table-column type="index"></el-table-column>
				<el-table-column label="姓名" prop="username">
				</el-table-column>
				<el-table-column label="邮箱" prop="email">
				</el-table-column>
				<el-table-column label="电话" prop="mobile">
				</el-table-column>
				<el-table-column label="角色" prop="role_name">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.mg_state" @change="statusChange(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template slot-scope="scope">
						<!-- 修改 -->
						<el-button type="primary" icon="el-icon-edit" size='mini' @click="userChange(scope.row.id)"></el-button>
						<!-- 删除 -->
						<el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteUser(scope.row.id)"></el-button>
						<el-tooltip>
							<el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>

			<!--分页条-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>

			<!--添加用户-->
			<el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
				<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="addForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="addForm.password"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="addForm.email"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="mobile">
						<el-input v-model="addForm.mobile"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button @click="addDialogVisible=false">取 消</el-button>
					<el-button type="primary" @click="addUser">确 定</el-button>
				</div>
			</el-dialog>

			<!--修改用户-->
			<el-dialog title="修改用户" :visible.sync="changeDialogVisible" width="50%" @close="changeDialogClosed">
				<el-form :model="changeForm" :rules="changeFormRules" ref="changeFormRef" label-width="70px">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="changeForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="changeForm.password"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="changeForm.email"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="mobile">
						<el-input v-model="changeForm.mobile"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button @click="changeDialogVisible=false">取 消</el-button>
					<el-button type="primary" @click="changeUser">确 定</el-button>
				</div>
			</el-dialog>

		</el-card>
	</div>
</template>

<script>
export default {
	data () {
		//验证邮箱的规则
		var checkEmail = (rule, value, cb) => {
			const regEmail = /^\w+@\w+(\.\w+)+$/
			if (regEmail.test(value)) {
				return cb()
			}
			//返回一个错误提示
			cb(new Error('请输入合法的邮箱'))
		}
		//验证手机号码的规则
		var checkMobile = (rule, value, cb) => {
			const regMobile = /^1[34578]\d{9}$/
			if (regMobile.test(value)) {
				return cb()
			}
			//返回一个错误提示
			cb(new Error('请输入合法的手机号码'))
		}
		return {
			queryInfo: {
				query: '',
				pagenum: 1,
				pagesize: 8
			},
			usersList: [],
			total: 0,

			//添加用户相关属性
			addDialogVisible: false,
			addForm: {
				username: '',
				password: '',
				email: '',
				mobile: ''
			},
			addFormRules: {
				username: [
					{ required: true, message: '请输入用户名称', trigger: 'blur' },
					{
						min: 3,
						max: 10,
						message: '用户名在3~10个字符之间',
						trigger: 'blur'
					}
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: 6,
						max: 15,
						message: '用户名在6~15个字符之间',
						trigger: 'blur'
					}
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{ validator: checkEmail, message: '邮箱格式不正确，请重新输入', trigger: 'blur' }
				],
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ validator: checkMobile, message: '手机号码不正确，请重新输入', trigger: 'blur' }
				]
			},
			changeDialogVisible: false,
			changeForm: {
				username: '',
				password: '',
				email: '',
				mobile: ''
			},
			changeFormRules: {
				username: [
					{ required: true, message: '请输入用户名称', trigger: 'blur' },
					{
						min: 3,
						max: 10,
						message: '用户名在3~10个字符之间',
						trigger: 'blur'
					}
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: 6,
						max: 15,
						message: '用户名在6~15个字符之间',
						trigger: 'blur'
					}
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{ validator: checkEmail, message: '邮箱格式不正确，请重新输入', trigger: 'blur' }
				],
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ validator: checkMobile, message: '手机号码不正确，请重新输入', trigger: 'blur' }
				]
			},
		}
	},
	created () {
		this.getUsersList()
	},
	methods: {
		async	getUsersList () {
			const { data: res } = await this.$http.get('users', {
				params: this.queryInfo
			})
			if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
			this.usersList = res.data.users
			this.total = res.data.total
			console.log(res);

		},
		handleSizeChange (newSize) {
			this.queryInfo.pagesize = newSize
			this.getUsersList()
		},
		handleCurrentChange (current) {
			this.queryInfo.pagenum = current
			this.getUsersList()
		},
		async statusChange (row) {
			const { data: res } = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
			if (res.meta.status !== 200) {
				row.mg_state = !row.mg_state
				return this.$message.error('修改状态失败')
			}
			this.$message.success('更新状态成功')
			console.log(res);
		},
		addDialogClosed () {
			//对话框关闭之后，重置表格
			this.$refs.addFormRef.resetFields();
		},
		addUser () {
			this.$refs.addFormRef.validate(
				async valid => {
					if (!valid) return this.$message.error("请填写完整用户信息");
					//发送请求完成添加用户的操作21
					const { data: res } = await this.$http.post("users", this.addForm)
					//判断如果添加失败，就做提示

					//添加成功的提示
					this.$message.success("添加用户成功")
					//关闭对话框
					this.addDialogVisible = false
					//重新请求最新的数据
					this.getUsersList()
				})
		},
		changeDialogClosed () {
			this.$refs.changeFormRef.resetFields();
		},
		async  userChange (id) {
			const { data: res } = await this.$http.get('users/' + id)

			if (res.meta.status !== 200) return this.$message.error("获取信息失败")

			this.changeForm = res.data

			this.changeDialogVisible = true
		},
		changeUser () {
			this.$refs.changeFormRef.validate(async valid => {
				if (!valid) return this.$message.error("请填写正确的用户信息")
				const { data: res } = await this.$http.put('users/' + this.changeForm.id, this.changeForm)
				if (res.meta.status !== 200) return this.$message.error('更改失败')
				this.$message.success('修改成功')
				this.changeDialogVisible = false
				this.getUsersList()
			})
		},

		//删除相关方法
		async   deleteUser (id) {
			const confirmRseult = await this.$confirm('此操作将删除该用户记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).catch(err => err)
			if (confirmRseult != "confirm") {
				return this.$message.info("已经取消删除")
			}
			const { data: res } = await this.$http.delete('users/' + id)

			if (res.meta.status !== 200) return this.$message.error('删除失败')

			this.$message.success('删除成功')

			this.getUsersList()
		}
	}
}
</script>

<style lang="less" scoped>
.el-card {
	margin-top: 20px;
}
</style>