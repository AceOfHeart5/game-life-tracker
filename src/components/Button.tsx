import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
    onClick?: () => void,
    sx?: React.CSSProperties,
    children?: React.ReactNode,
    disabled?: boolean,
}

const Button = ({ onClick=() => {}, sx={}, children, disabled }: ButtonProps) => {
    return <MuiButton
        disabled={disabled}
        variant="outlined"
        onClick={onClick}
        sx={{
            backgroundColor: "#555",
            color: "#fff",
            ...sx,
        }}
    >{children}</MuiButton>;
};

export default Button;
