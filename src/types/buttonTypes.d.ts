export interface ButtonTypes {
    title: string;
    bgColor: string;
    textColor: string;
    onClick?: () => void;
    type: "button" | "submit" | "reset";
} 
   