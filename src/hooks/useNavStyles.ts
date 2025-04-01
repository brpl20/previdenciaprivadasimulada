// src/hooks/useNavStyles.ts
"use client"
import { useEffect, useState } from "react";
import { PositionColorRelation, NavColor } from "./types";

class NavStyles extends Date {
  isLight = false;
  isFixed = false;
  private readonly refreshRateMs = 80;

  get shouldRefresh(): boolean {
    const prevRefresh = super.getTime();
    const nextRefresh = prevRefresh + this.refreshRateMs;
    const currentTime = new Date().getTime();
    return currentTime > nextRefresh;
  }
}

export const useNavStyles = (positionColorRelation: PositionColorRelation) => {
  const [navStyles, setNavStyles] = useState(() => {
    const n = new NavStyles();
    n.isLight = positionColorRelation[0] === NavColor.light;
    return n
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!navStyles.shouldRefresh) return;
  
      const scrollPositionY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollHeightPercent = (scrollPositionY / totalHeight) * 100;
  
      const _navStyles = new NavStyles();
      _navStyles.isFixed = scrollHeightPercent > 1;
      _navStyles.isLight = navStyles.isLight;
  
      const positions = Object.keys(positionColorRelation);
      for (let p = positions.length - 1; p >= 0; --p) {
        const position = +positions[p];
  
        if (position > scrollHeightPercent) continue;
  
        _navStyles.isLight = positionColorRelation[position] === NavColor.light;
        break;
      }
  
      setNavStyles(_navStyles);
    };
  
    const evtOptions = { passive: true } as AddEventListenerOptions;
    window.addEventListener("scroll", handleScroll, evtOptions);
    window.addEventListener("resize", handleScroll, evtOptions);
  
    handleScroll();
  
    return () => {
      window.removeEventListener("scroll", handleScroll, evtOptions);
      window.removeEventListener("resize", handleScroll, evtOptions);
    };
  }, [positionColorRelation]); // Only re-run if positionColorRelation changes
  
  return { navStyles };
  
};
