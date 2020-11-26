import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DoctorRating from "./DoctorRating";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function DoctorTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [services, setServices] = React.useState(["head", "Bones", "Legs"]);
  const [certificates, setCertificates] = React.useState([
    "M.B.B.S - Punjab medical college Faisalabad , 2005",
    "F.C.P.S. (Medicine) - College of physicians and surgeons , 2016",
    "Certified Diabetologist (UK)",
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="Feedback " {...a11yProps(0)} />
          <Tab label="Services" {...a11yProps(1)} />
          <Tab label="Certificates" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>
            <DoctorRating />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {services.map((event) => {
            return (
              <ul>
                <li
                  style={{
                    textTransform: "uppercase",
                    color: "black",
                    listStyleType: "circle",
                  }}
                >
                  {event}
                </li>
              </ul>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div>
            {certificates.map((event) => {
              return (
                <ul>
                  <li
                    style={{
                      textTransform: "uppercase",
                      color: "black",
                      listStyleType: "circle",
                    }}
                  >
                    {event}
                  </li>
                </ul>
              );
            })}
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
