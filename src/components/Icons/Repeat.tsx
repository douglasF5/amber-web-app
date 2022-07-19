import * as React from "react";
import { SVGProps } from "react";

const SvgRepeat = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14.708 3.294a1 1 0 1 0-1.416 1.412l.291.292-4.731-.014h-.003C5.077 4.984 2 8.074 2 11.848a6.85 6.85 0 0 0 2.01 4.847 1 1 0 0 0 1.416-1.412A4.85 4.85 0 0 1 4 11.848c0-2.675 2.186-4.863 4.848-4.864h.001l7.148.021a1 1 0 0 0 .711-1.706l-2-2.005zm5.282 4.01a1 1 0 1 0-1.416 1.413A4.85 4.85 0 0 1 20 12.152c0 2.675-2.186 4.863-4.848 4.864h-.001l-7.148-.021a1 1 0 0 0-.711 1.706l2 2.005a1 1 0 0 0 1.416-1.412l-.29-.292 4.73.014h.003c3.772 0 6.849-3.09 6.849-6.864a6.85 6.85 0 0 0-2.01-4.847z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgRepeat;
