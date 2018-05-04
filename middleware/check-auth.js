import { setToken, getUserFromCookie,getUserFromLocalStorage } from '~/util/auth'
import axios from 'axios'

export default async function({ isServer, store, route, redirect, req }) {
    if (isServer && !req) return 
    if (!store.getters.isAuthenticated) {
        console.log(req)
        const token = isServer ? getUserFromCookie(req,store) : getUserFromLocalStorage()
        console.log('token',token)
        if (token) {
            store.commit('SET_TOKEN', { token : token[0] })
        }
    }
}