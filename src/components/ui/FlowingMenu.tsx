import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

export interface SkillItem {
  title: string;
  icon: React.ReactNode;
  color?: string;
}

export interface FlowingMenuItemProps {
  category: string;
  items: SkillItem[];
}

export interface FlowingMenuProps {
  categories?: FlowingMenuItemProps[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

interface MenuItemProps {
  category: string;
  items: SkillItem[];
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  fontFamily: string;
}

const MenuItem = ({
  category,
  items,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  fontFamily,
}: MenuItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeInner = marqueeInnerRef.current;
    if (!marqueeInner) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeInner, {
        xPercent: -50,
        repeat: -1,
        duration: speed,
        ease: "none",
      }).totalProgress(0.5);
    }, marqueeRef);

    return () => ctx.revert();
  }, [speed]);

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, { y: '0%', opacity: 1, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, { y: '101%', opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <div
        className="menu__item-link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor, fontFamily: fontFamily }}
      >
        {category}
      </div>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(2)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <div className="marquee__skills-list">
                  {items.map((skill: SkillItem, i: number) => (
                    <div key={i} className="marquee__skill-item font-[family-name:var(--font-syne-mono)]">
                      <div className="w-8 h-8 md:w-10 md:h-10 relative flex-shrink-0">
                        {skill.icon}
                      </div>
                      <span>{skill.title}</span>
                    </div>
                  ))}
                  <div className="marquee__skill-item text-white/20">
                     •
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FlowingMenu({
  categories = [],
  speed = 40,
  textColor = '#ffffff',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#000000',
  borderColor = 'rgba(255,255,255,0.05)',
  fontFamily = 'inherit',
}: FlowingMenuProps) {
  return (
    <nav className="menu">
      {categories.map((category, index) => (
        <MenuItem
          key={index}
          {...category}
          speed={speed}
          textColor={textColor}
          marqueeBgColor={marqueeBgColor}
          marqueeTextColor={marqueeTextColor}
          borderColor={borderColor}
          fontFamily={fontFamily}
        />
      ))}
    </nav>
  );
}
