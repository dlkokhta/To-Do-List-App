import {ButtonTypes} from "@/types/buttonTypes"

const Button: React.FC<ButtonTypes> = ({title, bgColor, textColor, onClick, type, rounded, paddingX, paddingY, font}) => {

    return(

        <button type={type} onClick={onClick} className={`${bgColor} ${textColor} ${rounded} ${paddingX} ${paddingY} ${font} `}>{title}</button>
    )
}


export default Button
    
