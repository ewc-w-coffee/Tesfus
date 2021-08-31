import NavBar from "@components/NavBar";
import React, { FC } from "react";
import { Layout, LayoutContainer, PageBg } from "./styles";

const PageLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <NavBar />
      <PageBg>
        <LayoutContainer>{children}</LayoutContainer>
      </PageBg>
    </Layout>
  );
};

export default PageLayout;
