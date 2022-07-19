import * as React from "react";
import { SVGProps } from "react";

const SvgPlay = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.537 5.978A1 1 0 0 0 8 6.822v10.356a1 1 0 0 0 1.537.844l8.137-5.178a1 1 0 0 0 0-1.688L9.537 5.978z"
    />
  </svg>
);

export default SvgPlay;
