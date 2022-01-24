import BasicLayout from "../../layouts";
import { useTranslation } from "react-i18next";
import NewTaskCard from "../../components/NewTaskCard";
import { Box, Button, CircularProgress, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SingleTask from "../../components/SingleTask";
import useBasicStyles from "../../layouts/useBasicStyles";
import axios from "axios";
import { Task } from "../../shared/types/task";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectTasks, setTasks } from "../../redux/slices/taskSlice";
import {useAuth0} from "../../react-auth0-spa";

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { t } = useTranslation();
  const styles = useBasicStyles();
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  const [showTaskCard, setShowTaskCard] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_END_POINT}/v1/tasks`);
      dispatch(setTasks(res.data));
      setIsLoaded(true);
    } catch (error) {
      setError(t("error"));
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    getData(); // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Typography
                sx={{ ml: "26.5px", color: "secondary.light" }}
                variant="h5"
              >
                {t("currentTask")}
              </Typography>
              <Box>
                <List>{renderTask}</List>
              </Box>
              {!showTaskCard && (
                <Button
                  className={styles.button}
                  color="secondary"
                  variant="contained"
                  onClick={() => setShowTaskCard(true)}
                  sx={{ ml: "26.5px" }}
                >
                  Add Task
                </Button>
              )}

              {showTaskCard && (
                <NewTaskCard setShowTaskCard={setShowTaskCard} />
              )}
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
        {!isAuthenticated && (
            <button className="btn btn-primary btn-lg btn-login btn-block" onClick={() => loginWithRedirect({})}>Sign in</button>
        )}
      </BasicLayout>
    );
  }
};

export default HomePage;
