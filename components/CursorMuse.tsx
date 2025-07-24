"use client";

import React, { useEffect, useRef, useState } from "react";

const TAIL_LENGTH = 14;
const TAIL_OPACITY = 0.16;
const TAIL_WIDTH = 44;
const TAIL_HEIGHT = 16;
const HEAD_SIZE = 48;

function getAngle(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
}

export const CursorMuse: React.FC = () => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    Array(TAIL_LENGTH + 1).fill({ x: 0, y: 0 })
  );
  const requestRef = useRef<number>();

  useEffect(() => {
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      setPositions((prev) => {
        const next = [...prev];
        next[0] = {
          x: next[0].x + (mouse.x - next[0].x) * 0.32,
          y: next[0].y + (mouse.y - next[0].y) * 0.32,
        };
        for (let i = 1; i < next.length; i++) {
          next[i] = {
            x: next[i].x + (next[i - 1].x - next[i].x) * 0.32,
            y: next[i].y + (next[i - 1].y - next[i].y) * 0.32,
          };
        }
        return next;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {positions.slice(1).map((pos, i) => {
        const prev = positions[i] || pos;
        const angle = getAngle(pos, prev);
        const scale = 1 - i / (TAIL_LENGTH + 2);
        return (
          <div
            key={i}
            style={{
              position: "fixed",
              left: pos.x - (TAIL_WIDTH * scale) / 2,
              top: pos.y - (TAIL_HEIGHT * scale) / 2,
              width: TAIL_WIDTH * scale,
              height: TAIL_HEIGHT * scale,
              pointerEvents: "none",
              zIndex: 9998,
              borderRadius: "50%",
              opacity: TAIL_OPACITY * (1 - i / TAIL_LENGTH),
              background:
                "linear-gradient(90deg, #0B5CFF 0%, #732DEE 100%)",
              filter: `blur(${4 + i * 1.2}px)`,
              transform: `rotate(${angle}deg) scaleX(1.8)`,
              mixBlendMode: "screen",
              transition: "none",
            }}
          />
        );
      })}
      <div
        style={{
          position: "fixed",
          left: positions[0].x - HEAD_SIZE / 2,
          top: positions[0].y - HEAD_SIZE / 2,
          width: HEAD_SIZE,
          height: HEAD_SIZE,
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 60% 40%, #0B5CFF 0%, #732DEE 100%)",
          boxShadow:
            "0 0 48px 16px #0B5CFF66, 0 0 64px 24px #732DEE66, 0 0 32px 8px #0B5CFF88, 0 0 32px 8px #732DEE88",
          filter: "blur(1.2px)",
          opacity: 0.85,
          mixBlendMode: "screen",
          transition: "none",
        }}
      />
    </>
  );
}; 