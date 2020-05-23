import React from "react";
import { Button } from "@material-ui/core";

const InjectFunctionComp = ({ checked, toggle }) => {
  return (
    <div>
      <Button variant="contained"  onClick={toggle}>
        {checked ? "OFF" : "ON"}
      </Button>
    </div>
  );
};

export default InjectFunctionComp;
