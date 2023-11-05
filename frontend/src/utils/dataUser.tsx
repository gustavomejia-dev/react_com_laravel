

export const setDataUser = (data: any, rememberUser: boolean = false) => {
    const userData = JSON.stringify(data);
    if(rememberUser){
        console.log('salva no localstorage')
        return;
    }
    localStorage.setItem("data", userData);
       
}

export const getDataUser = (rememberUser: boolean = false) => {
   const userData = rememberUser ?  localStorage.getItem("data") : sessionStorage.getItem("data");
   
   if(userData != null){
    
    // console.log('user '+ userData);
        return JSON.parse(userData);
    
   }
    return false;
}

export const removeDataUser = (rememberUser: boolean = false) => {
    
    localStorage.removeItem("data");
    return true;

}
//*CASO O REMEMBER TOKEN FOI TICADO, ele salva no localStorage */
export const getRememberToken = () => {
    const data = localStorage.getItem('data');
    if(data != null){
        const rememberToken = JSON.parse(data);
        const {remember_token} = rememberToken;
        if(remember_token != undefined){
            return true;
        }

    }   
    return false; 
}