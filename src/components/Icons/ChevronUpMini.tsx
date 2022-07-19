import * as React from "react";
import { SVGProps } from "react";

const SvgChevronUpMini = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      fill={props.color}
      fillRule="evenodd"
      d="M5.312 3.24a.818.818 0 0 1 1.157 0l4.8 4.8a.818.818 0 0 1-1.157 1.157L5.891 4.975 1.669 9.197A.818.818 0 0 1 .512 8.04l4.8-4.8z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgChevronUpMini;
