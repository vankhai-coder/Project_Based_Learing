import { useRouteError } from "react-router-dom"

const CustomErrorElement = () => {
    const error = useRouteError()
    console.log('something went wrong :' , error.message );
    
    return (
        <div>{'something went wrong : '+ error.message}</div>
    )
}

export default CustomErrorElement