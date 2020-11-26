import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './sidebar.scss';
import { Link } from 'react-router-dom';
import BarChart from './barChart';
import LineChart from './lineChart';
import PieChart from './pieChart';


const barstate = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Sales',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}


const linestate = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Sales graph',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}


const SidebarPharmacy = () => {

    const [medcount, setmedCount] = useState(0);
   
    const getMedicines = async () => {
        const response = await Axios.get('http://localhost:5000/medicine/get');
        const filtered = response.data.medicines.filter((t)=> t.pharmacyName === "Green Pharmacy") 
        setmedCount(filtered.length);
    };

    useEffect(() => {
        window.scrollTo(0,0);
        getMedicines();
    }, []); // component did mount

    return (
        <div className='dashboard'>
            <div className='row'>
                <div className='col-md-2 p-2'>
                    <div className='dashboard-left-block'>
                        <div className='dashboard-pic-circle' style={{ /*backgroundImage: 'url(' + user.profilePic + ')'*/ }}>
                        
                        </div>
                        <div className='profile-left-text'>
                            <h2>{/*user.name*/}Add products</h2>
                            {/*user.isAdmin && <h6>Admin</h6>*/}
                            <hr style={{ backgroundColor: "white" }} />
                        </div>

                        <br />

                        <div className='dashboard-left-menu'>
                            <Link to='/pharmacymanager/addMedicine'>
                                <h5>Add Medicine</h5>
                            </Link>

                            <div className='profile-left-text'>
                                <h2>List</h2>
                                { }
                                <hr style={{ backgroundColor: "white" }} />
                            </div>
                            {/*user.isAdmin && (*/
                                <Link to='/pharmacymanager/medicines'>
                                    <h5>Medicines</h5>
                                </Link>
                            }


                            <hr style={{ backgroundColor: "white" }} />

                            <Link to='/logout/'>
                                <h5>Logout</h5>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='col-md-10 dashboard-right-block'>
                    <div className="container-fluid col md-4">
                        <h2 style={{ marginTop: "20px", marginLeft: "28%", fontStyle: "italic" }}> Welcome to Pharmacy Manager portal...</h2>
                        <div className="graphholder ">
                            <div className="chart">
                                <div className="chart1">
                                    <BarChart state={barstate} />

                                </div>
                                <div className="chart2">
                                    <LineChart state={linestate} />
                                </div>

                            </div>
                        </div>
                        <hr />

                       
                        <div className="cardsholder2">

                            <div className="card1left">
                                {/* <i className="zmdi zmdi-account" style={{ fontSize: "5rem" }}></i> */}
                                <i className="fas fa-user" style={{ fontSize: "5rem" }}></i>
                            </div>
                            <div className="card1right">
                                <h3 style={{ marginLeft: "3%" }}> Total No of Medicines: {medcount}</h3>
                            </div>



                        </div>
                        <hr />
                        <br />
                        <PieChart />
                    </div>



                </div>
            </div>
        </div>



    );
};

export default SidebarPharmacy;