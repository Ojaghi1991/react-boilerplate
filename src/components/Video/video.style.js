import styled from "styled-components";
/*
 * some basic style
 * Note: c-video--track-remote video is important
 * Note: c-video--track-local video is important
 */
export default styled.div`
  width: ${(props) => (!props.minimize ? "calc(100% - 365px)" : "100%")};
  height: 800px !important;
  top: 0px;
  left: 0px;
  z-index: 1;

  .c-video--innerbox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;

    .c-video--track-local {
      position: relative;
      bottom: 110px;
      left: 50px;
      z-index: 100;
      width: 150px;
      height: 200px;

      video {
        object-fit: cover;
        width: 100%;
        height: 100%;
        transform: scale(-1, 1);
      }
    }
  }
  .c-video--track-remote {
    background-color: #000000;
    display: flex;
    justify-content: center;
    width: calc(100% - 365px);
    height: 800px;
    object-fit: contain;

    video {
      width: 100%;
      height: 100%;
    }
  }
`;
