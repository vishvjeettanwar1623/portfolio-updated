"use client";

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
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const marqueeInner = marqueeInnerRef.current;
    const itemEl = itemRef.current;
    if (!marqueeInner || !itemEl) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(marqueeInner, {
        xPercent: -50,
        repeat: -1,
        duration: speed,
        ease: "none",
        paused: true,
      }).totalProgress(0.5);

      tweenRef.current = tween;
    }, marqueeRef);

    // High-performance IntersectionObserver to auto-pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tweenRef.current?.play();
        } else {
          tweenRef.current?.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(itemEl);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
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
                  {items.map((skill, sIdx) => (
                    <span key={sIdx} className="marquee__skill-tag">
                      {skill.icon}
                      <span className="marquee__skill-name">{skill.title}</span>
                    </span>
                  ))}
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
  speed = 18,
  textColor = '#ffffff',
  bgColor = '#09090b',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#000000',
  borderColor = 'rgba(255,255,255,0.1)',
  fontFamily = 'sans-serif',
}: FlowingMenuProps) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {categories.map((cat, idx) => (
          <MenuItem
            key={idx}
            category={cat.category}
            items={cat.items}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            fontFamily={fontFamily}
          />
        ))}
      </nav>
    </div>
  );
}
