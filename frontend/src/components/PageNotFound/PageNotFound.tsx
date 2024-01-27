import { Result } from "antd"
export const PageNotFound = ({messageDefault = false} : any) => {
console.log('type' + messageDefault);

return (
    <Result
        status="404"
        title="404"
        subTitle = {messageDefault ? "Esse Cliente não está Cadastrado no Sistema." : "Essa Pagina Não Existe."}
    
     /> 
)
                    }