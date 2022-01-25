import BasicLayout from "../../layouts";
import {Box} from "@mui/material";

const LoginPage = () => {
        return (
            <BasicLayout>
                <Box sx={{fontSize: "2rem", color: "secondary.light", paddingTop: "2rem"}}>Please Sign In to continue</Box>
            </BasicLayout>
        );

};

export default LoginPage;
