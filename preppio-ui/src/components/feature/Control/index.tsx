import React from "react";
import Button from "../../ui/Button";

const Control: React.FC = () => {
  
  return (
    <div className="flex flex-col gap-2">
      {['Resume', 'Job', 'Generate'].map((btnName, index) => (
        <Button key={index} variant="primary" size="md">{btnName}</Button>
      ))}
    </div>
  );
};

export default Control; 