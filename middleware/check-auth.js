import { setToken, getUserFromCookie,getUserFromLocalStorage } from '~/util/auth'
import axios from 'axios'
// if (!store.state.authenticated) {
//     return redirect('/login')
//   }
export default async function({  store, route, redirect, req }) {
    // console.log(isServer);
    if (process.server && !req) return;    

    console.log('프로세스',process.server);
    const token = process.server ? getUserFromCookie(req,store) : getUserFromLocalStorage()
    token ? store.commit('SET_TOKEN', { token : token[0] }) : null
}