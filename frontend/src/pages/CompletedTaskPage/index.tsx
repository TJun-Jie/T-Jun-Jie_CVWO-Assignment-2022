import BasicLayout from "../../layouts";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Task } from "../../shared/types/task";
import SingleTask from "../../components/SingleTask";
import { useEffect, useState } from "react";
import axios from "axios";

const CompletedTaskPage = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/v1/tasks/completed");
      setData(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderTask = data ? (
    data.map(
      function (item: Task, i) {
        return <SingleTask key={item._id} task={item} setData={setData} />;
      },
      [data]
    )
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
