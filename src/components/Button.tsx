import { Button as MuiButton } from "@mui/material";
import { Children } from "../utilsAndConstants";

interface ButtonProps {
    onClick?: () => void,
    style?: React.CSSProperties,
    children?: Children,
    disabled?: boolean,
}

const Button = ({ onClick=() => {}, style={}, children, disabled }: ButtonProps) => {
    return <MuiButton
        disabled={disabled}
        variant="outlined"
        onClick={onClick}
        sx={{
            backgroundColor: "#555",
            color: "#fff",
            ...style,
        }}
    >{children}</MuiButton>;
};

export default Button;
