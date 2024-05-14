import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
import axios from 'axios'
export type { ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface GlobalDataProps {
  column: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    column: testData,
    posts: testPosts,
    user: { isLogin: true, name: '马可波罗', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: '马可波罗' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, newList) {
      state.column = newList.list
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/columns').then(resp => {
        console.log(context, '报文')
        context.commit('fetchColumns', resp.data.data)

        debugger
      })
    }
  },
  getters: {
    // biggerColumnsLen (state) {
    //   // return state.column.filter(c => c.id > 2).length
    //   return 2
    // },
    getColumnById: (state) => (id: number) => {
      return state.column.find(c => c.id === id)
    },
    getPostsById: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store
