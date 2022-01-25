import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText,} from "@mui/material";
import {Link} from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import InboxIcon from "@mui/icons-material/Inbox";
import CircleIcon from "@mui/icons-material/Circle";
import {useTranslation} from "react-i18next";

type CustomDrawerProps = {
    drawer: boolean;
    setDrawer: (arg0: boolean) => void;
};

const CustomDrawer = ({drawer, setDrawer}: CustomDrawerProps) => {
    const {t} = useTranslation();

    return (
        <Drawer
            PaperProps={{sx: {backgroundColor: "secondary.main"}}}
            open={drawer}
            anchor={"left"}
            onClose={() => setDrawer(false)}
        >
            <Box
                sx={{width: 250}}
                onClick={() => setDrawer(false)}
                onKeyDown={() => setDrawer(false)}
            >
                <List sx={{color: "secondary.light"}}>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <InboxIcon sx={{color: "secondary.light"}}/>
                        </ListItemIcon>
                        <ListItemText primary={t("inbox")}/>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/completed"
                        key={"completedTask"}
                    >
                        <ListItemIcon>
                            <CheckIcon sx={{color: "secondary.light"}}/>
                        </ListItemIcon>
                        <ListItemText primary={t("completedTask")}/>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/priorities/1"
                        key={"lowPriority"}
                    >
                        <ListItemIcon>
                            <CircleIcon color="success"/>
                        </ListItemIcon>
                        <ListItemText primary={t("lowPriority")}/>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/priorities/2"
                        key={"mediumPriority"}
                    >
                        <ListItemIcon>
                            <CircleIcon color="warning"/>
                        </ListItemIcon>
                        <ListItemText primary={t("mediumPriority")}/>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/priorities/3"
                        key={"highPriority"}
                    >
                        <ListItemIcon>
                            <CircleIcon color="error"/>
                        </ListItemIcon>
                        <ListItemText primary={t("highPriority")}/>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default CustomDrawer;
