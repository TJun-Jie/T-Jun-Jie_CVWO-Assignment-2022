import BasicLayout from "../../layouts";
import {useTranslation} from "react-i18next";
import useHomeStyles from "./useHomeStyles";
import NewTaskCard from "../../components/NewTaskCard";
import {Box, Button} from "@mui/material";
import {useState} from "react";

const HomePage = () => {
    const {t} = useTranslation();
    const styles = useHomeStyles();

    const [showTaskCard, setShowTaskCard] = useState(false);
    return (
        <BasicLayout>
            <div className={styles.root}>
                <div>
                    <Box sx={{height: '100px'}}></Box>
                    <Button className={styles.button} color="secondary" variant="contained"
                            onClick={() => setShowTaskCard(true)}>Add Task</Button>
                    {showTaskCard && <NewTaskCard setShowTaskCard={setShowTaskCard}/>}
                </div>
            </div>
        </BasicLayout>
    );
}

export default HomePage;
