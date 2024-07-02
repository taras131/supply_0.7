import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { STRING_EMPTY } from "../utils/const";

const subTitle = "Эффективное управление, учет и документооборот.";

const MainMenuHeader = () => {
  const [showSubtitle, setShowSubtitle] = useState(STRING_EMPTY);
  const updateSubtitle = (char: string) => {
    setShowSubtitle((prev) => prev + char);
  };
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(function run() {
      updateSubtitle(subTitle[i]);
      i++;
      if (i < subTitle.length) {
        setTimeout(run, 100);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Stack spacing={1} sx={{ width: "100%", height: "90px", paddingLeft: "16px", paddingRight: "16px" }}>
      <Typography fontWeight={700} fontSize={40}>
        Иткана
      </Typography>
      <Typography fontWeight={600} fontSize={16} color={"gray"}>
        {showSubtitle}
      </Typography>
    </Stack>
  );
};

export default MainMenuHeader;
