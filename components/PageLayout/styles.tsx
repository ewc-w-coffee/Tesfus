import styled from "styled-components";
import { Container } from "@components/Container";

export const Layout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const PageBg = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LayoutContainer = styled(Container)`
  height: 100%;
`;
