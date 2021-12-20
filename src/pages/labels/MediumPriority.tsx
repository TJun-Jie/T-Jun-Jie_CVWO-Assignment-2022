import BasicLayout from "../../layouts";
import {Box, List, Typography} from "@mui/material";
import SingleTask from "../../components/SingleTask";
import {useTranslation} from "react-i18next";
import {Task} from "../../shared/types/task";
import {Priorities} from "../../shared/enum";
import CircleIcon from "@mui/icons-material/Circle";

const tempTask: Task = {
    title: 'medium priority task',
    description: 'hello',
    id: '123',
    endDate: new Date(),
    startDate: new Date(),
    priority: Priorities.LowPriority,
    completed: false,
}

const MediumPriority = () => {
    const {t} = useTranslation();
    return <BasicLayout>
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
                <Box sx={{ml: "26.5px", display: 'flex'}}>
                    <CircleIcon sx={{mt: '5px', mr: '5px'}} color="warning"/>
                    <Typography sx={{color: 'secondary.light', ml: '5px', mr: '5px'}} variant="h5">
                        {t("mediumPriority")}
                    </Typography>
                </Box>
                <Box>
                    <List>
                        <SingleTask {...tempTask}  ></SingleTask>
                        <SingleTask {...tempTask}  ></SingleTask>
                    </List>
                </Box>

            </Box>
        </div>
    </BasicLayout>

}

export default MediumPriority;
