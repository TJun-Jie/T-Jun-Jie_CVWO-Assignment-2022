import BasicLayout from "../../layouts";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Task } from "../../shared/types/task";
import SingleTask from "../../components/SingleTask";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectTasks, setTasks } from "../../redux/slices/taskSlice";

const CompletedTaskPage = () => {
  const { t } = useTranslation();

  const [isLoaded, setIsLoaded] = useState(false);

  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/v1/tasks/completed");
      dispatch(setTasks(res.data));
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTask = tasks ? (
    tasks.map(function (item: Task, i) {
      return <SingleTask key={item._id} task={item} />;
    })
  ) : (
    <div></div>
  );

  return (
    <BasicLayout>
      {isLoaded ? (
        <div>
          <Box sx={{ height: "100px" }} />
          <Box
            sx={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "start",
            }}
          >
            <Box sx={{ ml: "26.5px", display: "flex" }}>
              <CelebrationIcon sx={{ color: "yellow" }} />
              <Typography
                sx={{ color: "secondary.light", ml: "5px", mr: "5px" }}
                variant="h5"
              >
                {t("completedTask")}
              </Typography>
              <CelebrationIcon sx={{ color: "yellow" }} />
            </Box>
            <Box>
              <List>{renderTask}</List>
            </Box>
          </Box>
        </div>
      ) : (
        <Box
          sx={{
            width: "50%",
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Box sx={{ height: "100px" }}></Box>

          <CircularProgress color="info" />
        </Box>
      )}
    </BasicLayout>
  );
};

export default CompletedTaskPage;
