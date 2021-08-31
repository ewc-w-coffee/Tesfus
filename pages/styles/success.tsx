import { media } from "@styles";
import styled from "styled-components";

export const SuccessContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SuccessContent = styled.div`
  display: grid;
  text-align: center;
`;

export const SuccessTitle = styled.div`
  margin-bottom: 2rem;
  font-size: 4.8rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["btn-primary"]};
  font-weight: 900;

  ${media.sm} {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

export const SuccessSub = styled.div`
  font-size: 1.6rem;
  color: #d1d5db;

  span {
    color: ${({ theme }) => theme.colors["btn-primary"]};
    cursor: pointer;
  }
`;

const Styles = () => null;
export default Styles;
