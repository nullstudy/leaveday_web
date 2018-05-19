import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const unsetToken = () => {
    if (process.SERVER_BUILD) return
    Cookie.remove('userToken')
}

export const getUserFromCookie = (req,store) => {
    if (!req.headers.cookie) return
    
    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('userToken='))
    
    if (!jwtCookie) return null;
    let info = jwtDecode(jwtCookie)
    var userInfo = {};
    userInfo._id = info.ObjectId._id;
    userInfo.name = info.ObjectId.name;
    userInfo.email = info.ObjectId.email;
    userInfo.leaveCount = info.ObjectId.leaveCount;
    function isLeaveDate(){
        store.commit('SET_ISLEAVE', { isleave : true });
        userInfo.startDT = info.ObjectId.startDT;
        userInfo.createDT = info.ObjectId.createDT;
        userInfo.endDT = info.ObjectId.endDT;
        userInfo.leaveCount = info.ObjectId.leaveCount;
        return
    }
    function isNotLeaveDate(){
        store.commit('SET_ISLEAVE', { isleave : false });
        userInfo.startDT = false;
        userInfo.createDT = false;
        userInfo.endDT = false;
        userInfo.leaveCount = false;
        return
    }
    !!userInfo.leaveCount ?  isLeaveDate() : isNotLeaveDate()
    store.commit('SET_USER', { userInfo : userInfo })
    
    var cookieData = [jwtCookie.split('=')[1]]
    return cookieData
}

export const setCookie = (token) => {
    Cookie.set('userToken', token, {
        path: '/',
        domain: '.localhost',
        secure: true
    } );
    return 
}

export const getUserFromLocalStorage = () => {
    return console.log('gggg')
}


