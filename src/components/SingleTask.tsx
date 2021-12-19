import {
    Box,
    Button,
    Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider, InputLabel,
    ListItem,
    ListItemIcon,
    ListItemText, MenuItem, Select, TextField,
} from "@mui/material";
import {useState} from "react";
import {SelectFieldStyles, TextFieldStyles} from "./NewTaskCard";
import {Task} from "../shared/types/task";


const SingleTask = ({id, title, endDate, startDate, description, priority}: Task) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ListItem sx={{paddingBottom: '0',}}>
                <ListItemIcon>
                    <Checkbox/>
                </ListItemIcon>
                <ListItemText onClick={handleClickOpen}
                              sx={{color: 'secondary.light', cursor: 'pointer'}}>{title}</ListItemText>
            </ListItem>
            <Dialog PaperProps={{sx: {backgroundColor: "secondary.main"}}} open={open}
                    onClose={handleClose}>
                <DialogTitle sx={{color: "secondary.light", marginBottom: '0.2rem'}}>Edit Task</DialogTitle>
                <DialogContent sx={{paddingTop: '5px !important'}}>
                    <TextField
                        sx={TextFieldStyles}
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={title}
                    />
                    <TextField
                        sx={TextFieldStyles}
                        fullWidth
                        label="Description"
                        variant="outlined"
                        value={description}
                    />
                    <InputLabel sx={{color: "secondary.light"}}>Priority</InputLabel>
                    <Select
                        sx={SelectFieldStyles}
                        label="Labels"
                        value={priority}
                    >
                        <MenuItem value="1">Low</MenuItem>
                        <MenuItem value="2">Medium</MenuItem>
                        <MenuItem value="3">High</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button sx={{mr: "auto", ml: "16px", mt: "15px"}} variant="outlined">
                        Confirm Changes
                    </Button>
                    <Button sx={{mr: "1rem", mt: "15px"}} variant="outlined">
                        Delete Task
                    </Button>
                    <Button
                        sx={{mr: "1rem", mt: "15px"}}
                        variant="outlined"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Divider sx={{backgroundColor: 'secondary.light'}} variant="inset" component="li"/>
        </>
    );
};

export default SingleTask;
