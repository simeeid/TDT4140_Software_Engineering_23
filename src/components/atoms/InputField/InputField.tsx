//create inputfield component
import { Input } from "@chakra-ui/react";
interface InputFieldProps { 
    placeholder: string;
    type?: "text" | "password";
    size?: "thin" | "medium" | "thick";
    radius?: "short" | "medium" | "long";
    style?: React.CSSProperties;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ placeholder, type, size, radius, onChange, style }: InputFieldProps) => {

    let borderWidth = undefined;
    if (size) {
        if (size === "thin") borderWidth = "thin";
        if (size === "medium") borderWidth = "medium";
        if (size === "thick") borderWidth = "thick";
    }

    let borderRadius = undefined;
    if (radius) {
        if (radius === "short") borderRadius = "8px";
        if (radius === "medium") borderRadius = "15px";
        if (radius === "long") borderRadius = "20px";
    }

    return (
        <Input fontSize="sm" ms="4px" mb="14px" size="lg" placeholder={placeholder} type={type} borderWidth={borderWidth} borderRadius={borderRadius} style={style} onChange={onChange} />
    )
}



