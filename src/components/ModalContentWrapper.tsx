interface ModalContentWrapperProps {
    children: React.ReactNode,
}

const ModalContentWrapper = ({ children }: ModalContentWrapperProps) => {
    return <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{
            backgroundColor: "#aaa",
            padding: "16px",
            margin: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "600px",
            borderRadius: "8px",
        }}>
            {children}
        </div>
    </div>;
};

export default ModalContentWrapper;