import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const unsetToken = () => {
    if (process.SERVER_BUILD) return
    Cookie.remove('userToken')
    return  
}

export const getUserFromCookie = (req,store) => {
    if (!req.headers.cookie) return
    console.log('gggg')
    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('userToken='))
    if (!jwtCookie) return null;
    
    let info = jwtDecode(jwtCookie)
    var userInfo = {};
    userInfo._id = info.ObjectId._id;
    userInfo.name = info.ObjectId.name;
    userInfo.email = info.ObjectId.email;    
    userInfo.image = info.ObjectId.image;
    userInfo.leaveCount = info.ObjectId.leaveCount;

    !!userInfo.leaveCount ?  isLeaveDate() : isNotLeaveDate()

    function isLeaveDate(){
        console.log('de')
        store.commit('SET_ISLEAVE', { isleave : true });
        userInfo.startDT = info.ObjectId.startDT;
        userInfo.endDT = info.ObjectId.endDT;
        
        let today = new Date();
        let endday = new Date(info.ObjectId.endDT)
        let currentDT = new Date(today.getFullYear(), today.getMonth() , today.getDate());
        
        let endDT = new Date(endday.getFullYear(), endday.getMonth() , endday.getDate());
        let diff = Math.abs(endDT.getTime() - currentDT.getTime());
        if(endDT.getTime() < currentDT.getTime())
            return userInfo.leaveCount = 0
        
        
        diff = Math.ceil(diff / (1000 * 3600 * 24));
        userInfo.leaveCount = diff;
        return
    }
    function isNotLeaveDate(){
        store.commit('SET_ISLEAVE', { isleave : false });
        userInfo.startDT = false;
        userInfo.endDT = false;
        userInfo.leaveCount = false;
        return
    }
    store.commit('SET_USER', { userInfo : userInfo })
    var cookieData = [jwtCookie.split('=')[1]]
    return cookieData
}

export const setCookie = (token) => {
    Cookie.set('userToken', token);
    return 
}

export const getUserFromLocalStorage = () => {
    return 
}


