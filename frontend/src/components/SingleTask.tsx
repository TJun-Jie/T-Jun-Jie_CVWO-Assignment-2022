import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SelectFieldStyles, TextFieldStyles } from "./NewTaskCard";
import { Task } from "../shared/types/task";
import axios from "axios";
import { Priority } from "../shared/types/priority";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setTasks } from "../redux/slices/taskSlice";

const validationSchema = yup.object({
  title: yup.string().required("Please enter a title"),
  description: yup.string().required("Please enter a description"),
  priorityID: yup.string().required("Please select a priority"),
});

type SingleTaskProps = {
  task: Task;
  forHeader: boolean;
};

const SingleTask = ({ task, forHeader }: SingleTaskProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { title, description, priorityID, completed, _id: id } = task;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const [priorities, setPriorities] = useState([]);

  // ------------- fetch priorities from data base ----------------------

  const getPrioritiesEnum = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_END_POINT}/v1/priorities`);
      setPriorities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrioritiesEnum();
  }, []);

  const renderPriorities = priorities ? (
    priorities.map(function (item: Priority, i) {
      return (
        <MenuItem key={item._id} value={item._id}>
          {item.description}
        </MenuItem>
      );
    })
  ) : (
    <MenuItem value="1"></MenuItem>
  );

  // --------------------------------------------------------------------------

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_END_POINT}/v1/tasks/${id}`);

      const res = await axios.get(
        `${process.env.REACT_APP_API_END_POINT}/v1/tasks${
          location.pathname !== "/" ? location.pathname : ""
        }`
      );

      dispatch(setTasks(res.data));
      setOpen(false);
    } catch (error) {
      setError(t("error"));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: title,
      description: description,
      priorityID: priorityID,
      completed: completed,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`${process.env.REACT_APP_API_END_POINT}/v1/tasks/${id}`, {
          ...values,
        });
        const res = await axios.get(
          `${process.env.REACT_APP_API_END_POINT}/v1/tasks${
            location.pathname !== "/" ? location.pathname : ""
          }`
        );
        dispatch(setTasks(res.data));
        setOpen(false);
      } catch (error) {
        setError(t("error"));
      }
    },
  });
  return (
    <>
      <ListItem sx={{ paddingBottom: "0" }}>
        <ListItemIcon>
          <Checkbox
            checked={formik.values.completed}
            name="completed"
            onClick={() => {
              formik.setFieldValue("completed", !formik.values.completed);
              formik.handleSubmit();
            }}
          />
        </ListItemIcon>
        <ListItemText
          onClick={handleClickOpen}
          sx={{ color: "secondary.light", cursor: "pointer" }}
        >
          {title}
        </ListItemText>
      </ListItem>
      <Dialog
        PaperProps={{ sx: { backgroundColor: "secondary.main" } }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: "secondary.light", marginBottom: "0.2rem" }}>
          Edit Task
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "5px !important" }}>
          {error ? (
            <Typography
              sx={{ color: "red", fontSize: "1.3rem", marginBottom: "0.8rem" }}
            >
              {error}
            </Typography>
          ) : (
            ""
          )}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={TextFieldStyles}
              fullWidth
              name="title"
              label="Title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              sx={TextFieldStyles}
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <FormControl
              sx={{ minWidth: "100px", marginTop: "0.5rem" }}
              error={Boolean(formik.errors.priorityID)}
            >
              <InputLabel sx={{ color: "secondary.light" }} id="select-label">
                Priority
              </InputLabel>
              <Select
                labelId="select-label"
                sx={SelectFieldStyles}
                label="Priority"
                name="priorityID"
                value={formik.values.priorityID}
                onChange={formik.handleChange}
                error={
                  formik.touched.priorityID && Boolean(formik.errors.priorityID)
                }
              >
                {renderPriorities}
              </Select>
              {Boolean(formik.errors.priorityID) &&
                formik.touched.priorityID && (
                  <FormHelperText>Please select a priority</FormHelperText>
                )}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ mr: "auto", ml: "16px", mt: "15px" }}
            variant="outlined"
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            {t("confirmChanges")}
          </Button>
          <Button
            sx={{ mr: "1rem", mt: "15px" }}
            variant="outlined"
            onClick={handleDelete}
          >
            {t("deleteTask")}
          </Button>
          <Button
            sx={{ mr: "1rem", mt: "15px" }}
            variant="outlined"
            onClick={handleClose}
          >
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      {!forHeader ? (
        <Divider
          sx={{ backgroundColor: "secondary.light" }}
          variant="inset"
          component="li"
        />
      ) : (
        <Divider sx={{ backgroundColor: "secondary.light" }} />
      )}
    </>
  );
};

export default SingleTask;
