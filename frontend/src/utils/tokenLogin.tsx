export const getTokenLogin = (rememberUser : boolean = false) => {
    let token : string | null = '';
    if(localStorage.getItem("key") != undefined && localStorage.getItem("key") != null ) {
        token += localStorage.getItem("key");
        return token;
}
    token += sessionStorage.getItem('key');
    return token;
}

export const setTokenLogin = (tokenLogin: string, rememberUser : boolean = false) => {
    // console.log('token: ', tokenLogin);
    // localStorage.setItem("setKey", tokenLogin);
    // console.log('toen apos log ', localStorage.getItem('setKey'));
    console.log(tokenLogin);
    return rememberUser ? localStorage.setItem("key", tokenLogin) : sessionStorage.setItem("key", tokenLogin);
}

export const removeTokenLogin = (rememberUser : boolean = false) : boolean => {
    localStorage.removeItem("key");
    sessionStorage.removeItem("key");
    return true;
}