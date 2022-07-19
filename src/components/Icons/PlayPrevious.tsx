import * as React from "react";
import { SVGProps } from "react";

const SvgPlayPrevious = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 20a1 1 0 0 0 1-1v-6.385l10.476 6.447A1 1 0 0 0 19 18.21V5.79a1 1 0 0 0-1.524-.852L7 11.385V5a1 1 0 1 0-2 0v14a1 1 0 0 0 1 1z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgPlayPrevious;
