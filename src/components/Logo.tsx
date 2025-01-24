import * as React from "react";
import Box from "@mui/material/Box";
import {FC} from "react";
import logoEmblem from "../assets/logo/logo-emblem.svg";
import logoEmblemDark from "../assets/logo/logo-emblem--dark.svg";
import logo from "../assets/logo/logo.svg";
import logoDark from "../assets/logo/logo--dark.svg";

const HEIGHT = 60;
const WIDTH = 60;

type Color = "dark" | "light";

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export const Logo:FC<LogoProps> = ({ color = "dark",
                                     emblem,
                                     height = HEIGHT,
                                     width = WIDTH }: LogoProps) => {
  let url: string;

  if (emblem) {
    url = color === "light" ? logoEmblem : logoEmblemDark;
  } else {
    url = color === "light" ? logo : logoDark;
  }

  return <Box alt="logo" component="img" height={height} src={url} width={width} />;
};

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

