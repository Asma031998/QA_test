import cookie from 'js-cookie'
import Router from 'next/router'

export const getUserData = () => {
    const userData = window.localStorage.getItem('userData');
    console.log( 'cookie : ',  JSON.stringify(cookie.get('user')));
    console.log( 'cookie : ',  JSON.parse(window.localStorage.getItem('userData') || '{}'));
    return JSON.parse(window.localStorage.getItem('userData') || '{}');

}


export const logout = () => {
    cookie.remove('token')
    // to support logging out from all windows
    window.localStorage.setItem('logout', String(Date.now()))
    window.localStorage.removeItem('userData')
    Router.push('/')
}

