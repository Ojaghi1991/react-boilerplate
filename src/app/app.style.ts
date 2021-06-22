import styled, { css } from "styled-components";

type Props = {
  backgroundColor: string;
};

export default styled.div(
  ({ backgroundColor }: Props) => css`
    background-color: ${backgroundColor};
  `
);
