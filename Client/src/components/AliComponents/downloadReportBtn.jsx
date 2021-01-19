import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Axios from "axios";

export default function DownloadReportBtn(props) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(props.node.data.reportUrl);
  }, []);

  return (
    <div>
      <a
        target="_blank"
        className="btn btn-primary"
        href={"http://localhost:5000/labReport/downloadfile?path=" + url}
      >
        Download Report
      </a>
    </div>
  );
}
