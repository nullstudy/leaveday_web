import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const unsetToken = () => {
    if (process.SERVER_BUILD) return
    Cookie.remove('userToken')
}

export const getUserFromCookie = (req,store) => {
    if (!req.headers.cookie) return
    
    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('userToken='))
    console.log('jwtCookie',jwtCookie)
    if (!jwtCookie) return null;
    let info = jwtDecode(jwtCookie)
    var userInfo = {};
    userInfo.name = info.ObjectId.name;
    userInfo.email = info.ObjectId.email;
    store.commit('SET_USER', { userInfo : userInfo })
    var cookieData = [jwtCookie.split('=')[1]]
    return cookieData
}

export const getUserFromLocalStorage = () => {
    return console.log('gggg')
}


