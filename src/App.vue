<template>
<!--
<img alt="Vue logo" src="./assets/logo.png" />
<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
<GlobalHeader :user="user"></GlobalHeader>
<!-- <ColumnList :list="list"></ColumnList> -->
</template>

<script lang="ts">
import {
  defineComponent, ref
} from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
// import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
const testUser:UserProps = {
  isLogin: true,
  name: '爱面子',
  id: 434
}
// const testData:ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1专栏',
//     avatar: '/img/logo.png',
//     description: '简介，我是简介'
//   },
//   {
//     id: 2,
//     title: 'test2专栏',
//     // avatar: 'https://cli.vuejs.org/favicon.png',
//     description: '简介，我是简介'
//   },
//   {
//     id: 3,
//     title: 'test3专栏',
//     avatar: 'https://cli.vuejs.org/favicon.png',
//     description: '简介，我是简介'
//   },
//   {
//     id: 4,
//     title: 'test4专栏',
//     avatar: 'https://cli.vuejs.org/favicon.png',
//     description: '简介，我是简介444'
//   }
// ]

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader
  },
  setup () {
    /* const arr = ref([
      {
        id: 12,
        title: 'ddd',
        avatar: require('./assets/logo.png'),
        description: 'ddd'
      }

    ]) */
    return {
      // list: testData,
      user: testUser
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
