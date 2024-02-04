export const getTokenLogin = (rememberUser : boolean = false) => {
   
   const token = localStorage.getItem('key');
   console.log('aquii está o token ' + token)
   return token
}
 

export const setTokenLogin = (tokenLogin: string, rememberUser : boolean = false) => {
    // console.log('token: ', tokenLogin);
    localStorage.setItem("key", tokenLogin);
    // console.log('toen apos log ', localStorage.getItem('setKey'));
    console.log(tokenLogin);
    return true;
}

export const removeTokenLogin = (rememberUser : boolean = false) : boolean => {
    localStorage.removeItem("key");
    sessionStorage.removeItem("key");
    return true;
}