import { APPS } from "./constants";

// export const getApp = () =>  {
//     const subDomain = getSubdomain(window.location.hostname);
//     const  main = APPS.find((app) => app.main);
//     if(!main) throw new Error ("ERRO");
//     if(subDomain === "" ) return main.app
//     const app = APPS.find((app) => subDomain === app.subDomain);
//     console.log(subDomain);
// }

export const getSubdomain = (location : string) => {
    
    const locationParts = location.split(".");
    let sliceTill = -2;
    const isLocalHost = locationParts.slice(-1)[0] === "localhost";
    
    if(isLocalHost) sliceTill  = -1
 
         return locationParts.slice(0, sliceTill).join("").toLocaleLowerCase();
 
    // return locationParts[0];
}

export const setTenantId = (tenant : string) => {
    localStorage.setItem('tenant_id', tenant);
    return true;
}
export const getTenantID = () => {
    const tenant_id = localStorage.getItem('tenant_id');
    return tenant_id;
}
