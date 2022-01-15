import BasicLayout from "../../layouts";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Task } from "../../shared/types/task";
import SingleTask from "../../components/SingleTask";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectTasks, setTasks } from "../../redux/slices/taskSlice";

const HighPriorityPage = () => {
  const { t } = useTranslation();

  const [isLoaded, setIsLoaded] = useState(false);

  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_END_POINT}/v1/tasks/priorities/3`
      );
      dispatch(setTasks(res.data));
      setIsLoaded(true);
    } catch (error) {
      setError(t("error"));
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTask = tasks ? (
    tasks.map(function (item: Task, i) {
      return <SingleTask key={item._id} task={item} forHeader={false} />;
    })
  ) : (
    <div></div>
  );

  if (error) {
    return (
      <BasicLayout>
        <Box sx={{ height: "100px" }} />
        <Typography sx={{ color: "red", fontSize: "2rem" }}>{error}</Typography>
      </BasicLayout>
    );
  } else {
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
                <CircleIcon sx={{ mt: "5px", mr: "5px" }} color="error" />
                <Typography
                  sx={{ color: "secondary.light", ml: "5px", mr: "5px" }}
                  variant="h5"
                >
                  {t("highPriority")}
                </Typography>
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
  }
};

export default HighPriorityPage;
