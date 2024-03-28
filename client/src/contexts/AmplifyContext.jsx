import React from "react";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
Amplify.configure(config);
import { generateClient } from "aws-amplify/api";
export const client = generateClient();
const AmplifyContext = ({ children }) => {
  return <>{children}</>;
};

export default AmplifyContext;