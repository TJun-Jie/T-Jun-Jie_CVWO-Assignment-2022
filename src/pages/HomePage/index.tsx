import BasicLayout from "../../layouts";
import {useTranslation} from "react-i18next";
import useHomeStyles from "./useHomeStyles";
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";

const HomePage = () => {
    const {t} = useTranslation();
    const styles = useHomeStyles();
    return (
        <BasicLayout>
            <div className={styles.root}>
                <div>
                    <Button className={styles.button} color="secondary" variant="contained">Add Task</Button>
                </div>
            </div>
        </BasicLayout>
    )
}

export default HomePage;
