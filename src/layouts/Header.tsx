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

const Header = () => {
    const [drawer, setDrawer] = useState(false);
    const {t} = useTranslation();

    return (
        <Box>
            <AppBar position="static">
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
            <Drawer open={drawer} anchor={"left"} onClose={() => setDrawer(false)}>
                <Box
                    sx={{width: 250}}
                    onClick={() => setDrawer(false)}
                    onKeyDown={() => setDrawer(false)}
                >
                    <List>
                        <ListItem button component={Link} to='/'>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("inbox")}/>
                        </ListItem>
                        <ListItem button component={Link} to='/completed' key={"Completed Task"}>
                            <ListItemIcon>
                                <CheckIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("completedTask")}/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default Header;