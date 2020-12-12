import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DoctorRating from "./DoctorRating";
import Axios from "axios";
import "./DctorProfileTabs.css";

export default function DctorProfileTabs(props) {
  let [doctorID, setDoctorID] = useState(props.doctorID);
  const [services, setServices] = React.useState(["Head", "Bones"]);
  const [certificates, setCertificates] = React.useState([]);

  const doctorProfileInfo = async () => {
    let registerdServices = [];
    let registerdCertificates = [];

    await Axios.get("/user/getUser", {
      params: {
        _id: doctorID,
      },
    }).then(async (res) => {
      //   console.log("Services in Tabs", res.data.users[0].services);

      res.data.users.forEach((element) => {
        registerdServices.push(element.services);
      });
    });

    setServices(registerdServices);
  };

  console.log("Services", services);

  useEffect(() => {
    doctorProfileInfo();
  }, []);
  return (
    <Tabs>
      <TabList>
        <Tab>Feedback</Tab>
        <Tab>Services</Tab>
        <Tab>Certificates</Tab>
      </TabList>

      <TabPanel>
        <div>
          <DoctorRating />
        </div>
      </TabPanel>
      <TabPanel>
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
        {/* {services} */}
      </TabPanel>
      <TabPanel>
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
    </Tabs>
  );
}
