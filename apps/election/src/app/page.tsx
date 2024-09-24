'use client';

import { css } from '@emotion/css';
import { useEffect, useState } from 'react';

import { useWindowDimensions } from '../hooks';
import { Northeastern } from '../svg/region';

export default function Index() {
  const { width } = useWindowDimensions();

  const [tootltip, setTooltip] = useState({
    x: 0,
    y: 0,
    areaId: '',
    show: false,
  });

  // useEffect(() => {
  //   const element = document.getElementById('area-7102');
  //   if (!element) return;
  //   const rect = element.querySelector('rect');
  //   rect?.setAttribute('fill', 'rgb(255, 127, 43)');
  // }, []);

  useEffect(() => {
    const handleMouseLeave = () => {
      setTooltip((prev) => ({ ...prev, show: false }));
    };

    const onClick = (id: string) => {
      document.querySelectorAll('svg g g').forEach((e) => {
        if (
          e.id === id ||
          e.id.includes(`area-${id.split('-')[1]}`) ||
          e.id === `province-${id.slice(5, 7)}-name`
        ) {
          e.setAttribute('opacity', '1');
        } else {
          e.setAttribute('opacity', '0.3');
        }
      });
    };

    document.querySelectorAll('svg g g').forEach((e) => {
      const { x, y } = e.getBoundingClientRect();
      e.addEventListener('mouseenter', () => {
        e.setAttribute('cursor', 'pointer');
        if (e.id.includes('name')) return;
        setTooltip({ show: true, x: x + 40, y, areaId: e.id });
      });
      e.addEventListener('click', () => onClick(e.id));
      e.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.querySelectorAll('svg g g').forEach((e) => {
        e.removeEventListener('mouseenter', () => console.log('remove'));
        e.removeEventListener('mouseleave', handleMouseLeave);
        e.removeEventListener('click', () => console.log('remove'));
      });
    };
  }, [width]);

  return (
    <>
      <div
        className="wrapper"
        style={{
          background: '#ffece0',
          height: '100vh',
        }}
      >
        <div
          className={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            border-radius: 4px;
            padding: 16px;
            max-width: 546px;

            svg {
              width: 100%;
              height: auto;
            }
          `}
        >
          <Northeastern />
        </div>
      </div>
      {tootltip.show && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: tootltip.y,
            left: tootltip.x,
            background: '#fff',
            padding: 10,
            borderRadius: 4,
          }}
        >
          {tootltip.areaId}
        </div>
      )}
    </>
  );
}
