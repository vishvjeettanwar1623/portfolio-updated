import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/ui/text-stagger-hover";

interface ButtonWithIconProps {
  label: string;
  onClick?: () => void;
}

export const ButtonWithIcon = ({ label, onClick }: ButtonWithIconProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-fog hover:bg-molten border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-molten"
    >
      <TextStaggerHover className="relative z-10 transition-all duration-500 text-night font-semibold">
        <TextStaggerHoverActive animation="top">
          {label}
        </TextStaggerHoverActive>
        <TextStaggerHoverHidden animation="bottom">
          {label}
        </TextStaggerHoverHidden>
      </TextStaggerHover>
      <div className="absolute right-1 w-10 h-10 bg-night text-fog group-hover:bg-night rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </button>
  );
};

export default ButtonWithIcon;
