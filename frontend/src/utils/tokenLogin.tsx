export const getTokenLogin = (rememberUser : boolean = false) => {
  
    const token = rememberUser ? localStorage.getItem("key") : sessionStorage.getItem("key");
    return token;
}

export const setTokenLogin = (tokenLogin: string, rememberUser : boolean = false) => {
    // console.log('token: ', tokenLogin);
    // localStorage.setItem("setKey", tokenLogin);
    // console.log('toen apos log ', localStorage.getItem('setKey'));
    return rememberUser ? localStorage.setItem("key", tokenLogin) : sessionStorage.setItem("key", tokenLogin);
}

export const removeTokenLogin = (rememberUser : boolean = false) => {
    localStorage.removeItem("key");
    sessionStorage.removeItem("key");
    return true;
}