import { media } from "@styles";
import styled from "styled-components";

export const ShopContainer = styled.div`
  height: 100%;
  padding-top: 30vh;
`;

export const ShopContent = styled.div`
  display: grid;
  justify-items: center;
`;

export const Price = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors["btn-primary"]};
  font-size: 3.6rem;
`;

export const Stock = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors["btn-primary"]};
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const PayPal = styled.div`
  max-width: 75rem;
  width: 100%;
`;

export const NoStockContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoStockContent = styled.div`
  display: grid;
  text-align: center;
`;

export const NoStockTitle = styled.div`
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

export const NoStockSub = styled.div`
  font-size: 1.6rem;
  color: #d1d5db;

  span {
    color: ${({ theme }) => theme.colors["btn-primary"]};
    cursor: pointer;
  }
`;

const Styles = () => null;
export default Styles;
