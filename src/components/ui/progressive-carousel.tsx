"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
  vertical: boolean;
}

interface ProgressSliderProps {
  children: ReactNode;
  vertical?: boolean;
  activeSlider: string;
  className?: string;
}

interface SliderContentProps {
  children: ReactNode;
  className?: string;
}

interface SliderWrapperProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface SliderBtnGroupProps {
  children: ReactNode;
  className?: string;
}

interface SliderBtnProps {
  children: ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}

const ProgressSliderContext = createContext<ProgressSliderContextType | undefined>(undefined);

export const useProgressSliderContext = (): ProgressSliderContextType => {
  const context = useContext(ProgressSliderContext);
  if (!context) {
    throw new Error("useProgressSliderContext must be used within a ProgressSlider");
  }
  return context;
};

export const ProgressSlider: FC<ProgressSliderProps> = ({
  children,
  vertical = false,
  activeSlider,
  className,
}) => {
  const [active, setActive] = useState<string>(activeSlider);

  return (
    <ProgressSliderContext.Provider
      value={{
        active,
        progress: 100,
        handleButtonClick: (val: string) => setActive(val),
        vertical,
      }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </ProgressSliderContext.Provider>
  );
};

export const SliderContent: FC<SliderContentProps> = ({ children, className }) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const SliderWrapper: FC<SliderWrapperProps> = ({ children, value, className }) => {
  const { active } = useProgressSliderContext();

  return (
    <AnimatePresence mode="popLayout">
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={cn("", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SliderBtnGroup: FC<SliderBtnGroupProps> = ({ children, className }) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const SliderBtn: FC<SliderBtnProps> = ({
  children,
  value,
  className,
  progressBarClass,
}) => {
  const { active, progress, handleButtonClick, vertical } = useProgressSliderContext();

  return (
    <button
      className={cn(
        `relative transition-opacity ${active === value ? "opacity-100" : "opacity-60 hover:opacity-90"}`,
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      {children}
      <div
        className="absolute inset-0 overflow-hidden -z-10 max-h-full max-w-full"
        role="progressbar"
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={cn("absolute left-0", progressBarClass)}
          style={{
            [vertical ? "height" : "width"]: active === value ? `${progress}%` : "0%",
          }}
        />
      </div>
    </button>
  );
};

export default ProgressSlider;
