<template>
	<div id="container">
		<div class="login_box">
			<div class="img_container">
				<img src="../assets/logo.png" alt="" />
			</div>
			<el-form ref="LoginForm" class="form_box" :model="loginM" :rules="rules">
				<el-form-item prop="username">
					<el-input prefix-icon="iconfont icon-user" class="input_box" v-model="loginM.username">
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input prefix-icon="iconfont icon-3702mima " class="input_box" v-model="loginM.password" type="password">
					</el-input>
				</el-form-item>
				<el-form-item class="button_box">
					<el-button type="primary" @click="Login">登陆</el-button>
					<el-button type="info" @click="Reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			loginM: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名称', trigger: 'blur' },
					{ min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 3, max: 8, message: '长度在 6 到 18个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		Reset () {
			this.$refs.LoginForm.resetFields()
		},
		Login () {
			this.$refs.LoginForm.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post('login', this.loginM)
				if (res.meta.status != 200) this.$message.error('登陆失败')
				this.$message.success('登陆成功')
				//记录token
				window.sessionStorage.setItem("token", res.data.token)
				this.$router.push("/home")
			})
		}
	}
}
</script>

<style lang="less" scope>
#container {
	height: 100%;
	background-color: antiquewhite;
}
.login_box {
	width: 450px;
	height: 300px;
	border-radius: 3px;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	.img_container {
		height: 130px;
		width: 130px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		border: 1px solid #eee;
		box-shadow: 0 0 10px #ddd;
		background: #eee;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.form_box {
		display: inline-block;
		width: 100%;
		margin-top: 120px;
		padding: 0 20px;
		box-sizing: border-box;
		.input_box {
			width: 100%;
		}
		.button_box {
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>
