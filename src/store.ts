import { createStore } from 'vuex'
// import { testPosts } from './testData'
import axios from 'axios'
// export type { ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  _id?: string;
  column?: string;
}

interface ImageProps{
  _id?:string
  url?:string
  createdAt?:string
}
export interface ColumnProps{
  _id:string
  title:string
  avatar?:ImageProps
  description:string
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt?:string;
  content?: string;
  image?: ImageProps;
  createdAt?: string;
  column?: string;
}
export interface GlobalDataProps {
  column: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    column: [],
    posts: [],
    user: { isLogin: true, name: '马可波罗', column: '' }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: '马可波罗' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.column = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.column = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/columns').then(resp => {
        console.log(context, '报文')
        context.commit('fetchColumns', resp.data)

        debugger
      })
    },
    fetchColumn ({ commit }, cid:string) {
      debugger
      axios.get(`/columns/${cid}`).then(resp => {
        debugger
        console.log(resp, '报文')
        commit('fetchColumn', resp.data)

        debugger
      })
    },
    fetchPosts ({ commit }, cid:string) {
      debugger
      axios.get(`/columns/${cid}/posts`).then(resp => {
        debugger
        console.log(resp, '报文')
        commit('fetchPosts', resp.data)

        debugger
      })
    }
  },
  getters: {
    // biggerColumnsLen (state) {
    //   // return state.column.filter(c => c.id > 2).length
    //   return 2
    // },
    getColumnById: (state) => (_id: string) => {
      return state.column.find(c => c._id === _id)
    },
    getPostsById: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
