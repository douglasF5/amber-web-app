import * as React from "react";
import { SVGProps } from "react";

const SvgPlayNext = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18 4a1 1 0 0 0-1 1v6.579a.99.99 0 0 0-.384-.43L6.524 4.937A1 1 0 0 0 5 5.79v12.42a1 1 0 0 0 1.524.852l10.092-6.21a.99.99 0 0 0 .384-.43V19a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgPlayNext;
