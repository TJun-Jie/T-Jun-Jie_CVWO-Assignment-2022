import BasicLayout from "../../layouts";
import {Box, CircularProgress} from "@mui/material";

const LoadingPage = () => {
        return (
            <BasicLayout>
                <Box
                    sx={{
                        width: "50%",
                        mx: "auto",
                        textAlign: "center",
                    }}
                >
                    <Box sx={{height: "100px"}}></Box>

                    <CircularProgress color="info"/>
                </Box>
            </BasicLayout>
        );

};

export default LoadingPage;
