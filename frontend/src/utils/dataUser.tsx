

export const setDataUser = (data: any) => {
    const userData = JSON.stringify(data);
    localStorage.setItem("data", userData);
       
}

export const getDataUser = () => {
   const userData = localStorage.getItem("data");
   
   if(userData != null){
    
    // console.log('user '+ userData);
        return JSON.parse(userData);
    
   }
    return false;
}

export const removeDataUser = () => {
    localStorage.removeItem("data");
    return true;

}

export const getRememberToken = () => {
    const data = localStorage.getItem('data');
    if(data != null){
        const rememberToken = JSON.parse(data);
        const {remember_token} = rememberToken;
        return remember_token;
    }    
}