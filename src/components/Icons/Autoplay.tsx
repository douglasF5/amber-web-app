import * as React from "react";
import { SVGProps } from "react";

const SvgAutoplay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.91 1.528a1 1 0 0 1 1.39-.263l3.01 2.052a1 1 0 0 1 .263 1.39L11.668 7.5a1 1 0 0 1-1.652-1.127l.757-1.11a1.008 1.008 0 0 1-.12.027 8 8 0 1 0 7.88 3.269 1 1 0 1 1 1.633-1.155 10 10 0 1 1-10.28-4.002l-.713-.485a1 1 0 0 1-.263-1.39Zm1.803 15.37 4.062-2.922c.304-.216.296-.735 0-.95l-4.062-2.93c-.303-.225-.713-.035-.713.388v6.024c0 .424.381.631.713.39Z"
      fill={props.color}
    />
  </svg>
);

export default SvgAutoplay;
