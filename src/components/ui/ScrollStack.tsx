
'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 150,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '25%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 2,
  useWindowScroll = true,
  onStackComplete = () => {}
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    const ctx = gsap.context(() => {
      const containerHeight = window.innerHeight;
      const stackPositionPx = typeof stackPosition === 'string' && stackPosition.includes('%') 
        ? (parseFloat(stackPosition) / 100) * containerHeight 
        : parseFloat(stackPosition);
      const scaleEndPositionPx = typeof scaleEndPosition === 'string' && scaleEndPosition.includes('%')
        ? (parseFloat(scaleEndPosition) / 100) * containerHeight
        : parseFloat(scaleEndPosition);

      cards.forEach((card: any, i: number) => {
        const isLast = i === cards.length - 1;
        const cardStackOffset = i * itemStackDistance;
        const cardStackPos = stackPositionPx + cardStackOffset;
        
        
        
        
        const scrollDistance = cardStackPos - scaleEndPositionPx;

        
        gsap.set(card, {
          transformOrigin: 'top center',
          z: 0,
          zIndex: 10 + i,
          willChange: 'transform, opacity, filter'
        } as any);

        
        ScrollTrigger.create({
          trigger: card,
          start: `top ${cardStackPos}px`,
          endTrigger: cards[cards.length - 1],
          end: () => `top ${String(stackPositionPx + ((cards.length - 1) * itemStackDistance))}px`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          anticipatePin: 1,
          id: `card-pin-${i}`,
        });

        
        
        
        const targetScaleValue = baseScale + i * itemScale;
        
        gsap.to(card as any, {
          scrollTrigger: {
            trigger: card,
            start: `top ${cardStackPos}px`,
            end: `+=${scrollDistance}`,
            scrub: true,
          },
          scale: targetScaleValue,
          rotationX: rotationAmount ? i * rotationAmount : 0, 
          
          filter: blurAmount ? `blur(${Math.min(blurAmount * (cards.length - 1 - i), 10)}px)` : 'none',
          overwrite: 'auto'
        });

        
        if (isLast) {
          ScrollTrigger.create({
            trigger: card,
            start: `top ${cardStackPos}px`,
            onEnter: () => onStackComplete(),
          });
        }
      });
    }, scroller as any);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [
    stackPosition,
    baseScale,
    itemScale,
    blurAmount,
    onStackComplete
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: '5vh' }} />
      </div>
    </div>
  );
};

export default ScrollStack;
