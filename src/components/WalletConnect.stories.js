import React from "react";

import { XdcConnect } from "./wallet-connect";

export default {
  title: "XdcConnect",
  component: XdcConnect,
};

const Template = (args) => <XdcConnect {...args} />;

export const Default = Template.bind({});
Default.args = {
  onConnect: (x) => {
    console.log("connected :)", x);
  },
  btnName: "CONNECT",
  btnClass: "btn btn-rounded btn-info",
};
