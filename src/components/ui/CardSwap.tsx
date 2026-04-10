
import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: any, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: string;
  onOrderChange?: (frontIndex: number) => void;
  children?: React.ReactNode;
  isAutoPlayActive?: boolean;
}

const CardSwap = forwardRef<any, CardSwapProps>(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'power',
  onOrderChange,
  children,
  isAutoPlayActive = true
}, ref) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power3.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<any>(null);
  const container = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  
  useImperativeHandle(ref, () => ({
    next: () => {
      
      clearInterval(intervalRef.current);
      swap('next');
      intervalRef.current = window.setInterval(() => swap('next'), delay);
    },
    prev: () => {
      clearInterval(intervalRef.current);
      swap('prev');
      intervalRef.current = window.setInterval(() => swap('next'), delay);
    }
  }));

  const swap = (direction = 'next') => {
    if (order.current.length < 2 || isAnimating.current) return;
    isAnimating.current = true;

    if (direction === 'next') {
      const [front, ...rest] = order.current;
      onOrderChange?.(rest[0]); 
      const elFront = refs[front].current as any;
      const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false; } });
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current as any;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    } else {
      
      const back = order.current[order.current.length - 1];
      const rest = order.current.slice(0, order.current.length - 1);
      onOrderChange?.(back); 
      const elBack = refs[back].current as any;
      const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false; } });
      tlRef.current = tl;

      
      const dropY = parseFloat(gsap.getProperty(elBack, "y") as any) + 500;
      
      tl.set(elBack, { zIndex: refs.length });
      tl.to(elBack, {
        y: dropY,
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

      
      rest.forEach((idx, i) => {
        const el = refs[idx].current as any;
        const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.to(elBack, {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        duration: config.durReturn,
        ease: config.ease
      }, 'return');

      tl.call(() => {
        order.current = [back, ...rest];
      });
    }
  };

  useEffect(() => {
    
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
    
    
    onOrderChange?.(order.current[0]);

    
    if (isAutoPlayActive) {
      intervalRef.current = window.setInterval(() => swap('next'), delay);
    } else {
      clearInterval(intervalRef.current);
    }

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => swap('next'), delay);
      };
      if (node) {
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        return () => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
          clearInterval(intervalRef.current);
        };
      }
    }
    return () => clearInterval(intervalRef.current);
    
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, isAutoPlayActive]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
        ? cloneElement(child as any, {
            key: i,
            ref: refs[i],
            style: { width, height, ...((child as any).props.style ?? {}) },
            onClick: (e: any) => {
              (child as any).props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
