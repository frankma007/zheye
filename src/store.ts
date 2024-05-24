import { createStore, Commit } from 'vuex'
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
  token:string
  loading:boolean;
  column: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const getAndCommit = async (url:string, mutationName:string, commit:Commit) => {
  // commit('setLoading', true)
  const { data } = await axios.get(url)
  // await new Promise(resolve => setTimeout(resolve, 3000))
  commit(mutationName, data)

  // commit('setLoading', false)
}
const postAndCommit = async (url:string, mutationName:string, commit:Commit, payload:any) => {
  // commit('setLoading', true)
  const { data } = await axios.post(url, payload)
  // await new Promise(resolve => setTimeout(resolve, 3000))
  commit(mutationName, data)

  // commit('setLoading', false)
  return payload
}
const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    loading: false,
    column: [],
    posts: [],
    user: { isLogin: false, name: '马可波罗', column: '' }
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: '马可波罗' }
    // },
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
    },
    setLoading (state, status) {
      state.loading = status
    },
    login (state, rawData) {
      state.token = rawData.data.token
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid:string) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid:string) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
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
