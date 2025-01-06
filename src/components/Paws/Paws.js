import React from "react";
import { IoPaw } from "react-icons/io5";
import "./Paws.css";

const Paws = () => {
  return (
    <div className="paw-prints-container">
      <IoPaw className="paw-print paw-print-1" />
      <IoPaw className="paw-print paw-print-3" />
      <IoPaw className="paw-print paw-print-2" />
      <IoPaw className="paw-print paw-print-4" />
    </div>
  );
};

export default Paws;
