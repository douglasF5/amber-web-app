import * as React from "react";
import { SVGProps } from "react";

const SvgAudioBars = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={props.color}
      fillRule="evenodd"
      d="M12 3a1.2 1.2 0 0 1 1.2 1.2v15.6a1.2 1.2 0 1 1-2.4 0V4.2A1.2 1.2 0 0 1 12 3zm6 4.8A1.2 1.2 0 0 1 19.2 9v6a1.2 1.2 0 1 1-2.4 0V9A1.2 1.2 0 0 1 18 7.8zM7.2 9a1.2 1.2 0 0 0-2.4 0v6a1.2 1.2 0 0 0 2.4 0V9z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgAudioBars;
