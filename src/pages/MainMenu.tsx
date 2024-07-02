import React from "react";
import {} from "@mui/material";
import MainMenuHeader from "../components/MainMenuHeader";
import MainMenuList from "../components/MainMenuList";
import PageLayout from "../components/PageLayout";

const MainMenu = () => {
  return (
    <PageLayout maxWidth={1000}>
      <MainMenuHeader />
      <MainMenuList />
    </PageLayout>
  );
};

export default MainMenu;
