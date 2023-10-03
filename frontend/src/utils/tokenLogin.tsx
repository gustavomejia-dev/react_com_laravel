export const getTokenLogin = () => {
    const token = localStorage.getItem("key")
    return token;
}

export const setTokenLogin = (tokenLogin: string) => {
    // console.log('token: ', tokenLogin);
    // localStorage.setItem("setKey", tokenLogin);
    // console.log('toen apos log ', localStorage.getItem('setKey'));
    return localStorage.setItem("key", tokenLogin);
}