import BasicLayout from "../../layouts";
import {useTranslation} from "react-i18next";
import useHomeStyles from "./useHomeStyles";
import NewTaskCard from "../../components/NewTaskCard";
import {Box, Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useState} from "react";
import {CheckBoxOutlineBlank} from "@mui/icons-material";

const HomePage = () => {
    const {t} = useTranslation();
    const styles = useHomeStyles();

    const [showTaskCard, setShowTaskCard] = useState(false);
    return (
        <BasicLayout>
            <div className={styles.root}>
                <div>
                    <Box sx={{height: '100px'}}/>
                    <Box sx={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Typography variant="h5">Current Task</Typography>
                        <Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox/>
                                    </ListItemIcon>
                                    <ListItemText>First task</ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                    <Button className={styles.button} color="secondary" variant="contained"
                            onClick={() => setShowTaskCard(true)}>Add Task</Button>
                    {showTaskCard && <NewTaskCard setShowTaskCard={setShowTaskCard}/>}
                </div>
            </div>
        </BasicLayout>
    );
}

export default HomePage;
