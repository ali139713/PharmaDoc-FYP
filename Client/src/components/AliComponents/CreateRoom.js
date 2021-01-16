import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        console.log(id);
        localStorage.setItem("VideoCallLink", `/room/${id}`);
        props.history.push(`/room/${id}`);
    }

    return (
        <button onClick={create} style ={{marginLeft:"44%", textAlign:"center", marginTop:"5%",marginBottom:"5%"}}>Create room</button>
    );
};

export default CreateRoom;
