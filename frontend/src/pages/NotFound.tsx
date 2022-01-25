import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import BasicLayout from "../layouts";

const NotFound = () => {
    const {t} = useTranslation();

    return (
        <BasicLayout>
            <Box sx={{height: "100px"}}/>
            <Typography sx={{color: "red", fontSize: "2rem"}}>
                {t("notFound")}
            </Typography>
        </BasicLayout>
    );
};

export default NotFound;
