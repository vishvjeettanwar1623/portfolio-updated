import { Button } from "@/components/ui/button";
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

const ButtonWithIcon = ({ label, onClick }: ButtonWithIconProps) => {
  return (
    <Button 
      onClick={onClick}
      className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-white hover:bg-white/90 border-0"
    >
      <TextStaggerHover className="relative z-10 transition-all duration-500 text-black font-semibold">
        <TextStaggerHoverActive animation="top">
          {label}
        </TextStaggerHoverActive>
        <TextStaggerHoverHidden animation="bottom">
          {label}
        </TextStaggerHoverHidden>
      </TextStaggerHover>
      <div className="absolute right-1 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
};

export default ButtonWithIcon;
