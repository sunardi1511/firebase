import React from "react";

const Buttom = ({title,onClick, loading}) => {
    if(loading){
        <button className="btn disable" >Loading....</button>
    }
    return(
    <button className="btn" onClick={onClick}>{title}</button>
    )
}

export default Buttom;