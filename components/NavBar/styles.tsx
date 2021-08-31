import { Container } from "@components/Container";
import styled from "styled-components";
import { Button } from "@components/Button";

export const NavContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors["background"]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1.6rem;
`;

export const NavContent = styled(Container)``;

export const NavBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  position: relative;
`;

export const NavItem = styled.p`
  cursor: pointer;
  color: rgb(209, 213, 219);
  transition: color 0.25s ease-in-out;
  font-weight: 500;

  &:hover,
  &.active {
    color: rgb(156, 163, 175);
  }
`;

export const NavLogo = styled.img`
  height: 4rem;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(1.25);
  }
`;

export const LoginBtn = styled(Button)`
  display: flex;
  align-items: center;

  svg {
    height: 1.2rem;
    margin-right: 0.8rem;
  }
`;

export const RightContainer = styled.div`
  justify-self: end;
`;

export const UserBox = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
  cursor: pointer;
`;

export const UserName = styled.div`
  font-size: 1.4rem;
`;

export const UserImg = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center center;
`;

export const ProfileModal = styled.div`
  display: grid;
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  width: 19rem;
  color: #d1d5db;
  font-size: 1.4rem;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const ProfileModalItem = styled.div`
  padding: 0.8rem 1.6rem;
  background-color: #1f2937;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid #111827;
  }

  &:last-child {
    color: ${({ theme }) => theme.colors["btn-primary"]};
  }

  &:hover {
    background-color: #374151;
  }
`;
