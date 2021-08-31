import { media } from "@styles";
import styled from "styled-components";
import Typed from "react-typed";

export const HomeMain = styled.div`
  display: grid;
  grid-template-columns: 13fr 20fr;
  align-content: center;
  height: 100%;
  align-items: center;

  ${media.sm} {
    grid-template-columns: 1fr;
    justify-items: center;
    justify-content: center;
  }
`;

export const HomeContent = styled.div`
  display: grid;

  ${media.sm} {
    justify-items: center;
  }
`;

export const HomeBtns = styled.div`
  display: flex;
  column-gap: 0.8rem;
  margin-top: 3.2rem;
`;

export const HomeTitle = styled(Typed)`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors["btn-primary"]};
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 1rem;
`;

export const HomeLogo = styled.img`
  width: 100%;

  ${media.sm} {
    width: 70%;
  }
`;

export const HomeLinks = styled.div`
  display: flex;
  column-gap: 6.4rem;
  align-items: center;
  margin-left: 8px;

  svg {
    fill: rgb(55, 65, 81);
    cursor: pointer;
    transition: fill 0.25s ease-in-out;

    &:hover {
      fill: ${({ theme }) => theme.colors["btn-primary"]};
    }
  }

  & > :nth-child(1) svg {
    height: 3.2rem;
  }

  & > :nth-child(3) svg {
    height: 2.1rem;
  }

  ${media.sm} {
    margin-left: 0;
  }
`;

const Styles = () => null;
export default Styles;
