import { RefAttributes, SVGProps } from "react";

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ElementAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export const Icons = {
  filter: (props: IconProps) => (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.40005 8.24761H11.6M2.80005 5.04761H13.2M6.80005 11.4476H9.20005"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),

  arrowRight: (props: IconProps) => (
    <svg
      className="rotate-0"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#CBF947"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="#CBF947"
        d="M12.8333 7.625L17 12M17 12L12.8333 16.375M17 12L7 12"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="#CBF947"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),

  XIcon: (props: IconProps) => (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.18549 7.49741L14.4309 1.39999H13.1879L8.63331 6.6943L4.99554 1.39999H0.799805L6.30082 9.40592L0.799805 15.8H2.04288L6.85269 10.209L10.6944 15.8H14.8902L9.18518 7.49741H9.18549ZM7.48292 9.47645L6.92556 8.67924L2.49078 2.33576H4.40007L7.97899 7.45515L8.53635 8.25236L13.1885 14.9068H11.2792L7.48292 9.47676V9.47645Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  discord: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 640 512"
      {...props}
    >
      <path
        d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
        fill="currentColor"
      />
    </svg>
  ),
};
