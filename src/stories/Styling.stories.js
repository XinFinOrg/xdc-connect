import React from "react";

import { XdcConnect } from "../components";

export default {
  title: "XdcConnect/Styling",
  component: XdcConnect,
};

const Template = (args) => <XdcConnect {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomizeButton = Template.bind({});
CustomizeButton.args = {
  btnName: "Click To Connect",
  btnClass: "btn btn-warning",
  disabled:false
};

export const CustomModalTheme = Template.bind({});
CustomModalTheme.args = {
  theme: "dark",
  btnClass: "btn btn-warning",
};
