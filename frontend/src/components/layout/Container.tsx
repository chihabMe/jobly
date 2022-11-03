import React, { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
      <div className="mx-auto max-w-screen-lg  ">{children}</div>
  
  )};

export default Container;
