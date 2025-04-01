// src/app/page.tsx
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { NavColor } from "@/hooks/types";

export default function Home() {
  return (
    <>
      <Header positionColorRelation={{
          0: NavColor.dark,
          13: NavColor.light,
          34: NavColor.dark,
          42: NavColor.light,
          52: NavColor.dark,
          63: NavColor.light,
          65: NavColor.dark,
          78: NavColor.light,
        }} />

      <Hero />
    </>
  );
}
