

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

export const setRememberToken = (token :string) => {
    console.log('remember token: ', setRememberToken);
}