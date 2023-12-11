import { Box, useMediaQuery } from "@mui/material";
import { type ReactNode, useRef, useEffect } from "react";

interface SliderProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  direction: "left" | "right";
}

export default function Slider({
  children,
  direction,
  onClose,
  open,
}: SliderProps) {
  const isDesktop = useMediaQuery("(max-width: 80em)");
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderDirection = {
    left: {
      left: 0,
      translate: open ? "none" : "-100%",
    },
    right: {
      right: 0,
      translate: open ? "none" : "100%",
    },
  };
  useEffect(() => {
    const sliderContainer = sliderContainerRef.current;
    const slider = sliderRef.current;

    function detectClickOutside(e: MouseEvent) {
      if (!slider?.contains(e.target as Node)) onClose();
    }

    sliderContainer?.addEventListener("click", detectClickOutside);

    return () => {
      sliderContainer?.removeEventListener("click", detectClickOutside);
    };
  });
  return (
    <Box
      ref={sliderContainerRef}
      sx={
        isDesktop
          ? {
              position: "fixed",
              inset: open ? 0 : null,
              zIndex: 20,
            }
          : null
      }
    >
      <Box
        sx={
          isDesktop
            ? {
                position: "fixed",
                inset: 0,
                bgcolor: "#00000080",
                zIndex: -1,
                visibility: open ? "visible" : "hidden",
                opacity: open ? 1 : 0,
                transition: "opacity 300ms linear",
              }
            : null
        }
      ></Box>
      <Box
        ref={sliderRef}
        sx={
          isDesktop
            ? {
                position: "fixed",
                top: 0,
                bottom: 0,
                ...sliderDirection[direction],
                transition: "translate 300ms ease-out",
              }
            : null
        }
      >
        {children}
      </Box>
    </Box>
  );
}
