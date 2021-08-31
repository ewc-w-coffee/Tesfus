import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary";
}

export const Button = styled.button<ButtonProps>`
  background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.colors["btn-primary"]
      : theme.colors["btn-secondary"]};
  color: ${({ theme, variant }) =>
    variant === "primary" ? "#fff" : "#d1d5db"};
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "primary" ? "rgb(185, 28, 28)" : "rgb(55, 65, 81)"};
  }
`;

Button.defaultProps = {
  variant: "primary",
};
