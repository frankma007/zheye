<template>
    <div class="login-page">
      <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            :rules="emailRules" v-model="emailVal"
            placeholder="请输入邮箱地址"
            type="text"
            ref="inputRef"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            type="password"
            placeholder="请输入密码"
            :rules="passwordRules"
            v-model="passwordVal"
          />
        </div>
        <!-- {{ isLogin }} -->
      </validate-form>
    </div>
  </template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

import { GlobalDataProps } from '../store'
import { useStore } from 'vuex'

export default defineComponent({

  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore <GlobalDataProps>()
    const isLogin = computed(() => store.state.user.isLogin)
    const router = useRouter()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
      if (result) {
        // 两种跳转方式
        // router.push({ name: 'column', params: { id: 1 } })
        // router.push('/column/1')
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('login', payload).then(data => {
          console.log(data)
          router.push('/')
        })

        // store.commit('login')
      }
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      isLogin
    }
  }
})
</script>
