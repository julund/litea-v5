import * as icon from "react-icons/tb";

export interface IconProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    xmlns?: string;
    size?: string | number;
    color?: string;
    title?: string;
    strokeWidth?: string | number;
    viewBox?: string;
}

const defaultIconProps: IconProps = {
    xmlns: "http://www.w3.org/2000/svg",
    size: 20, stroke: "currentColor", fill: "none", strokeWidth: 1.75, viewBox: "0 0 24 24", strokeLinecap: "round", strokeLinejoin: "round"
};

export const IconArrowBack = ({ ...props }: IconProps) => icon.TbArrowBack({ ...defaultIconProps, ...props });
export const IconX = ({ ...props }: IconProps) => icon.TbX({ ...defaultIconProps, ...props });
export const IconCheck = ({ ...props }: IconProps) => icon.TbCheck({ ...defaultIconProps, ...props });
export const IconDashboard = ({ ...props }: IconProps) => icon.TbDashboard({ ...defaultIconProps, ...props });
export const IconLogout = ({ ...props }: IconProps) => icon.TbLogout({ ...defaultIconProps, ...props });
export const IconLogin = ({ ...props }: IconProps) => icon.TbLogin({ ...defaultIconProps, ...props });
export const IconWorld = ({ ...props }: IconProps) => icon.TbWorld({ ...defaultIconProps, ...props });
export const IconUser = ({ ...props }: IconProps) => icon.TbUser({ ...defaultIconProps, ...props });
export const IconChevronDown = ({ ...props }: IconProps) => icon.TbChevronDown({ ...defaultIconProps, ...props });
export const IconChevronRight = ({ ...props }: IconProps) => icon.TbChevronRight({ ...defaultIconProps, ...props });
export const IconChevronLeft = ({ ...props }: IconProps) => icon.TbChevronLeft({ ...defaultIconProps, ...props });
export const IconCircle = ({ ...props }: IconProps) => icon.TbCircle({ ...defaultIconProps, ...props });
export const IconCircleDotted = ({ ...props }: IconProps) => icon.TbCircleDotted({ ...defaultIconProps, ...props });
export const IconRefresh = ({ ...props }: IconProps) => icon.TbRefresh({ ...defaultIconProps, ...props });
export const IconExternalLink = ({ ...props }: IconProps) => icon.TbExternalLink({ ...defaultIconProps, ...props });
export const IconDownload = ({ ...props }: IconProps) => icon.TbDownload({ ...defaultIconProps, ...props });
export const IconLoader = ({ ...props }: IconProps) => icon.TbLoader({ ...defaultIconProps, ...props });
export const IconSettings = ({ ...props }: IconProps) => icon.TbSettings({ ...defaultIconProps, ...props });

export const IconBrandChrome = ({ ...props }: IconProps) => icon.TbBrandChrome({ ...defaultIconProps, ...props });
export const IconBrandAndroid = ({ ...props }: IconProps) => icon.TbBrandAndroid({ ...defaultIconProps, ...props });
export const IconBrandWindows = ({ ...props }: IconProps) => icon.TbBrandWindows({ ...defaultIconProps, ...props });
export const IconBrandApple = ({ ...props }: IconProps) => icon.TbBrandApple({ ...defaultIconProps, ...props });
export const IconBrandEdge = ({ ...props }: IconProps) => icon.TbBrandEdge({ ...defaultIconProps, ...props });
export const IconBrandFirefox = ({ ...props }: IconProps) => icon.TbBrandFirefox({ ...defaultIconProps, ...props });

export const IconDeviceTv = ({ ...props }: IconProps) => icon.TbDeviceTv({ ...defaultIconProps, ...props });
export const IconDeviceDesktop = ({ ...props }: IconProps) => icon.TbDeviceDesktop({ ...defaultIconProps, ...props });
export const IconDeviceMobile = ({ ...props }: IconProps) => icon.TbDeviceMobile({ ...defaultIconProps, ...props });
export const IconDeviceTablet = ({ ...props }: IconProps) => icon.TbDeviceTablet({ ...defaultIconProps, ...props });

export const IconEngine = ({ ...props }: IconProps) => icon.TbEngine({ ...defaultIconProps, ...props });

export const IconLink = ({ ...props }: IconProps) => icon.TbLink({ ...defaultIconProps, ...props });
export const IconFileText = ({ ...props }: IconProps) => icon.TbFileText({ ...defaultIconProps, ...props });