import BasicLayout from "../../layouts";
import {useTranslation} from "react-i18next";
import NewTaskCard from "../../components/NewTaskCard";
import {Box, Button, List, Typography} from "@mui/material";
import {useState} from "react";
import SingleTask from "../../components/SingleTask";
import {Task} from "../../shared/types/task";
import useBasicStyles from "../../layouts/useBasicStyles";
import {Priorities} from "../../shared/enum";

const tempTask: Task = {
    title: 'First task',
    description: 'hello',
    id: '123',
    endDate: new Date(),
    startDate: new Date(),
    priority: Priorities.LowPriority,
    completed: false,
}

const HomePage = () => {
    const {t} = useTranslation();
    const styles = useBasicStyles();

    const [showTaskCard, setShowTaskCard] = useState(false);
    return (
        <BasicLayout>
            <div>
                <Box sx={{height: "100px"}}/>
                <Box
                    sx={{
                        width: "50%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "start",
                    }}
                >
                    <Typography sx={{ml: "26.5px", color: 'secondary.light'}} variant="h5">
                        {t("currentTask")}
                    </Typography>
                    <Box>
                        <List>
                            <SingleTask {...tempTask}  ></SingleTask>
                        </List>
                    </Box>
                    {!showTaskCard && (
                        <Button
                            className={styles.button}
                            color="secondary"
                            variant="contained"
                            onClick={() => setShowTaskCard(true)}
                            sx={{ml: "26.5px"}}
                        >
                            Add Task
                        </Button>
                    )}

                    {showTaskCard && <NewTaskCard setShowTaskCard={setShowTaskCard}/>}
                </Box>
            </div>
        </BasicLayout>
    )
        ;
};

export default HomePage;
