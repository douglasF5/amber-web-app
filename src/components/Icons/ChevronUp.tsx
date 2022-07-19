import * as React from "react";
import { SVGProps } from "react";

const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.075 6.293a1 1 0 0 1 1.414 0l9.6 9.6a1 1 0 0 1-1.414 1.414l-8.893-8.893-8.893 8.893a1 1 0 0 1-1.414-1.414l9.6-9.6z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgChevronUp;
