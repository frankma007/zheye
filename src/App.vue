<template>
<!--
<img alt="Vue logo" src="./assets/logo.png" />
<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
<GlobalHeader :user="user"></GlobalHeader>

<ValidateForm  @form-submit="onFormSubmit" >
  <!-- <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
    <input
    v-model="emailRef.val" @blur="validateEmail"
    type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    <div class="form-text" v-if="emailRef.error" >{{ emailRef.message }}</div>
  </div> -->
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">邮箱</label>
    <!-- <input type="password" class="form-control" id="exampleInputPassword1">
     -->
     <ValidateInput  :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱"  type="text" ref="inputRef"  />
     {{ emailVal }}
  </div>
 <!-- <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">密码</label>
     <ValidateInput :rules="pwdRules"  placeholder="请输入密码" class="hello three" type="password" v-model="pwdVal" />
     {{ emailVal }}
  </div> -->
 <!--   <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> -->
  <template #submit>
 <span class="btn btn-danger">提交保存</span>
  </template>
  <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
</ValidateForm>
<ColumnList :list="list"></ColumnList>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref
} from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
// import HelloWorld from './components/HelloWorld.vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
const testUser:UserProps = {
  isLogin: true,
  name: '李白',
  id: 434
}
const testData:ColumnProps[] = [
  {
    id: 1,
    title: 'test1专栏',
    avatar: '/img/logo.png',
    description: '简介，我是简介'
  },
  {
    id: 2,
    title: 'test2专栏',
    // avatar: 'https://cli.vuejs.org/favicon.png',
    description: '简介，我是简介'
  },
  {
    id: 3,
    title: 'test3专栏',
    avatar: 'https://cli.vuejs.org/favicon.png',
    description: '简介，我是简介'
  },
  {
    id: 4,
    title: 'test4专栏',
    avatar: 'https://cli.vuejs.org/favicon.png',
    description: '简介，我是简介444'
  }
]
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref <any>()
    const emailVal = ref('123@test.com')
    const pwdVal = ref('123')
    const onFormSubmit = (res:boolean) => {
      console.log('result', res)
      console.log('123', res)
      emailVal.value = ''
    }
    const emailRules:RulesProp = [
      {
        type: 'required',
        message: '电子邮箱不能为空'
      },
      {
        type: 'email',
        message: '邮箱格式不对'
      }
    ]

    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = '不能为空'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = '邮箱格式错误'
      }
    }
    /* const arr = ref([
      {
        id: 12,
        title: 'ddd',
        avatar: require('./assets/logo.png'),
        description: 'ddd'
      }

    ]) */
    return {
      list: testData,
      user: testUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      onFormSubmit,
      inputRef,
      pwdVal

    }
  }
})
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
