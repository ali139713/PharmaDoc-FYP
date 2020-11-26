import Axios from 'axios';
import React, { Component } from 'react';
import '../../style.scss'
import Card from '../AliComponents/card';
import CL from '../../Images/Chughtailab.jpg';
import SK from '../../Images/ShaukatKhanum.png';
import AN from '../../Images/Al-Nasarlab.png';
import Symbol1 from '../../Images/lock.svg';
import Symbol2 from '../../Images/wallet.svg';
import Symbol3 from '../../Images/verified.svg';



class AccreditedLabs extends Component {

    state = {
     
        labs:[],

    };

    async componentDidMount() {
        try {
          const response = await   Axios.get('http://localhost:5000/lab/get');
           this.setState({labs:response.data.labs});
           
        } catch (error) {
          
        }
    }



    render() {

      
        return (

            <div id="maindiv" className="container-fluid">


                {/* <Navbar links={routeLinkslab} /> */}
                <div className="separation"></div>
                <div className="container" >
                    {/* <Carousel /> */}
                </div>
                <div className="content">
                   
                    <div className="heading">
                        <hr />
                        <h2> Accredited Labs... </h2>
                        <hr />
                    </div>
                </div>

                <div className="row" >



                    {
                        this.state.labs.map((obj) => (


                            <Card 
                                linkTo={`accreditedlabs/${obj.name}`}
                                name="View Info"
                                pic={obj.labImage}
                                description={obj.name}

                            />



                        ))
                    }


                </div>

                <div className="form-holder">

                    <h3> Process </h3>

                    <p>     Now ordering lab tests at your finger tips. Follow this simple 4 step process to place your order..</p>

                    <div className="form-process">
                        <div className="process1">
                            <i className="fas fa-search " />
                            <p> Search for lab test </p>
                        </div>
                        <i className="fas fa-long-arrow-alt-right " id="arrow" />
                        <div className="process2">
                            <i className="fas fa-user " />
                            <p> Receive call from lab representative</p>
                        </div>
                        <i className="fas fa-long-arrow-alt-right " id="arrow" />
                        <div className="process3">
                            <i className="fas fa-flask" />
                            <p> We will send a certified professional to assist you </p>
                        </div>
                        <i className="fas fa-long-arrow-alt-right " id="arrow" />
                        <div className="process4">
                            <i className="fas fa-mobile-alt" />
                            <p> You will receive an sms for confirmation </p>
                        </div>
                    </div>
                </div>


                <div className ="symbolHolder">
                    <div className ="symbol1">
                        <img src ={Symbol1} style={{height:"6rem"}}/>
                        <h2> Reliable...</h2>
                        </div>
                        <div className ="symbol2">
                        <img src ={Symbol2}  style={{height:"6rem"}} />
                        <h2> Trusted...</h2>
                        </div>
                        <div className ="symbol3">
                        <img src ={Symbol3}  style={{height:"6rem"}} />
                        <h2> Verified...</h2>
                        </div>



                    </div>




            </div>


        );
    }
}

export default AccreditedLabs;