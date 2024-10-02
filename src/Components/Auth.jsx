import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";


const Auth = () => {
 
  const [show,setShow] = useState(false);

  return (
    <>
      <div>
        {!show ? (
          <Login show={show} setShow={setShow} ></Login>
        ) : (
          <Signup show={show} setShow={setShow}></Signup>
        )}
      </div>
    </>
  );
};

export default Auth;
