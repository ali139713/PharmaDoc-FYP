import React from 'react';
import './tabs.scss';
import { Link} from "react-router-dom";

const Tabs = (props) => {
  return (

    <div>


      <ul className="nav nav-tabs">
        <Link to="" className="nav-link"  data-toggle="tab" >{props.name}</Link>
        <Link to="" className="nav-link" data-toggle="tab">{props.secondName}</Link>

      </ul>

    </div>
  );
}


export default Tabs;