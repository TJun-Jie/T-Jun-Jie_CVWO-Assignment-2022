import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import { setTasks } from "../redux/slices/taskSlice";
import { Priority } from "../shared/types/priority";
import {selectToken} from "../redux/slices/authSlice";

const validationSchema = yup.object({
  title: yup.string().required("Please enter a title"),
  description: yup.string().required("Please enter a description"),
  priorityID: yup.string().required("Please select a priority"),
});

export const TextFieldStyles = {
  marginBottom: "0.5rem",

  "& .MuiInputLabel-root": {
    color: "secondary.light",
  },
  "& input": {
    color: "secondary.light",
  },
};

export const SelectFieldStyles = {
  "& .MuiSelect-select": {
    color: "secondary.light",
  },
};

type NewTaskCardProps = {
  setShowTaskCard: (state: boolean) => void;
};

const NewTaskCard = ({ setShowTaskCard }: NewTaskCardProps) => {
  // ------------- fetch priorities from data base ----------------------
  const [priorities, setPriorities] = useState([]);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const getPrioritiesEnum = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_END_POINT}/v1/priorities`);
      setPriorities(res.data);
    } catch (error) {
      setError(t("error"));
    }
  };

  useEffect(() => {
    getPrioritiesEnum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <MenuItem value=""></MenuItem>
  );

  // ----------------------------------------------------------------------
  const token = useAppSelector(selectToken);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priorityID: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {

        await axios.post(`${process.env.REACT_APP_API_END_POINT}/v1/tasks`, {

          completed: false,
          ...values,
        }, {  headers: {
            Authorization: `Bearer ${token}`
          }});

        // refetch data
        const res = await axios.get(`${process.env.REACT_APP_API_END_POINT}/v1/tasks`, {  headers: {
            Authorization: `Bearer ${token}`
          }});
        dispatch(setTasks(res.data));
        setShowTaskCard(false);
      } catch (error) {
        setError(t("error"));
      }
    },
  });

  return (
    <Box
      sx={{
        marginTop: "2rem",
        marginLeft: "26.5px",
        paddingBottom: "200px",
      }}
    >
      <Card
        sx={{
          backgroundColor: "secondary.main",
          textAlign: "start",
        }}
      >
        <CardContent>
          {error ? (
            <Typography
              sx={{ color: "red", fontSize: "1.2rem", marginBottom: "0.8rem" }}
            >
              hi
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl
                sx={{ minWidth: "100px", marginTop: "0.5rem" }}
                error={
                  formik.touched.priorityID && Boolean(formik.errors.priorityID)
                }
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
                >
                  {renderPriorities}
                </Select>
                {Boolean(formik.errors.priorityID) &&
                  formik.touched.priorityID && (
                    <FormHelperText>Please select a priority</FormHelperText>
                  )}
              </FormControl>
              <Box>
                <Button
                  sx={{ mr: "1rem", mt: "15px" }}
                  variant="outlined"
                  type="submit"
                >
                  Add Task
                </Button>
                <Button
                  sx={{ mr: "1rem", mt: "15px" }}
                  variant="outlined"
                  onClick={() => setShowTaskCard(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewTaskCard;
