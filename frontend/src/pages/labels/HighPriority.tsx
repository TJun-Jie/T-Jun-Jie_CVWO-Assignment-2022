import BasicLayout from "../../layouts";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Task } from "../../shared/types/task";
import SingleTask from "../../components/SingleTask";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";

const HighPriorityPage = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/v1/tasks/priorities/3"
      );
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
};

export default HighPriorityPage;
