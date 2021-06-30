import styled, { css } from "styled-components";

export default styled.div(
  ({ backgroundColor }) => css`
    background-color: ${backgroundColor};
  `
);
