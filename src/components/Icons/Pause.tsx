import * as React from "react";
import { SVGProps } from "react";

const SvgPause = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.5 4A1.5 1.5 0 0 0 6 5.5v14a1.5 1.5 0 0 0 3 0v-14A1.5 1.5 0 0 0 7.5 4zm9 0A1.5 1.5 0 0 0 15 5.5v14a1.5 1.5 0 0 0 3 0v-14A1.5 1.5 0 0 0 16.5 4z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgPause;
