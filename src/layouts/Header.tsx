import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import CheckIcon from '@mui/icons-material/Check';
import {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CircleIcon from '@mui/icons-material/Circle';

const Header = () => {
    const [drawer, setDrawer] = useState(false);
    const {t} = useTranslation();

    return (
        <Box>
            <AppBar color="secondary" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawer(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div"
                                sx={{flexGrow: 1, textAlign: 'center', paddingRight: '48px'}}>
                        {t("appName")}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer PaperProps={{sx: {backgroundColor: "secondary.main"}}} open={drawer} anchor={"left"}
                    onClose={() => setDrawer(false)}>
                <Box
                    sx={{width: 250}}
                    onClick={() => setDrawer(false)}
                    onKeyDown={() => setDrawer(false)}
                >
                    <List sx={{color: 'secondary.light'}}>
                        <ListItem button component={Link} to='/'>
                            <ListItemIcon>
                                <InboxIcon sx={{color: 'secondary.light'}}/>
                            </ListItemIcon>
                            <ListItemText primary={t("inbox")}/>
                        </ListItem>
                        <ListItem button component={Link} to='/completed' key={"completedTask"}>
                            <ListItemIcon>
                                <CheckIcon sx={{color: 'secondary.light'}}/>
                            </ListItemIcon>
                            <ListItemText primary={t("completedTask")}/>
                        </ListItem>
                        <ListItem button component={Link} to='/low-priority' key={"lowPriority"}>
                            <ListItemIcon>
                                <CircleIcon color="success"/>
                            </ListItemIcon>
                            <ListItemText primary={t("lowPriority")}/>
                        </ListItem>
                        <ListItem button component={Link} to='/medium-priority' key={"mediumPriority"}>
                            <ListItemIcon>
                                <CircleIcon color="warning"/>
                            </ListItemIcon>
                            <ListItemText primary={t("mediumPriority")}/>
                        </ListItem>
                        <ListItem button component={Link} to='/high-priority' key={"highPriority"}>
                            <ListItemIcon>
                                <CircleIcon color="error"/>
                            </ListItemIcon>
                            <ListItemText primary={t("highPriority")}/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
        ;
}

export default Header;