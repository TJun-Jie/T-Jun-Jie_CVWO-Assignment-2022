import {
  AppBar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomDrawer from "./CustomDrawer";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../redux/hooks";
import SingleTask from "../components/SingleTask";
import { selectTasks } from "../redux/slices/taskSlice";
import { Task } from "../shared/types/task";

const searchStyles = {
  backgroundColor: "primary.dark",
  color: "secondary.light",
  height: "40px",
  "& .MuiOutlinedInput-root": {
    height: "40px",
    color: "secondary.light",
  },
  "& input": {
    paddingLeft: "28px",
  },
};

const Header = () => {
  const [drawer, setDrawer] = useState(false);
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");

  const tasks = useAppSelector(selectTasks);

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery !== "") {
      return task.title.startsWith(searchQuery);
    }
    return null;
  });

  const renderTask = filteredTasks ? (
    filteredTasks.map(function (item: Task, i) {
      return <SingleTask key={item._id} task={item} forHeader={true} />;
    })
  ) : (
    <div></div>
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "250px" }}
          >
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <SearchIcon
                style={{
                  position: "absolute",
                  left: 3,
                  top: 9,
                  zIndex: 5,
                }}
              />
              <TextField
                id="standard-basic"
                variant="outlined"
                placeholder="Search"
                autoComplete="off"
                sx={searchStyles}
                value={searchQuery}
                onChange={(e) => handleChange(e)}
              />
            </Box>
            {filteredTasks.length !== 0 ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 56,
                  backgroundColor: "primary.dark",
                  width: "inherit",
                  border: "1px solid  #8c8c8c",
                  paddingBottom: "20px",
                }}
              >
                {renderTask}
              </Box>
            ) : (
              ""
            )}
          </Box>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              paddingRight: "48px",
              "& a": { color: "secondary.light", textDecoration: "none" },
            }}
          >
            <Link to="/">{t("appName")}</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <CustomDrawer drawer={drawer} setDrawer={setDrawer}></CustomDrawer>
    </Box>
  );
};

export default Header;
