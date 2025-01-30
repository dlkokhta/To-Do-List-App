import {ButtonTypes} from "@/types/buttonTypes"

const Button: React.FC<ButtonTypes> = ({title, bgColor, textColor, onClick, type}) => {

    

    return(

        <button type={type} onClick={onClick} className={`${bgColor} ${textColor}`}>{title}</button>
    )
}


