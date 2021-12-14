import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => (
    <Box>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center', paddingRight: '48px'}}>
                    Simple To Do
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
)

export default Header;