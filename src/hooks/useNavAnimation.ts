// src/hooks/useNavAnimation.ts
export const useNavAnimation = () => ({
    menuAnimation: Object.freeze({
        hidden: { opacity: 0, height: 0 },
        visible: {
          opacity: 1,
          height: "100%",
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        },
      } as const),
      navOptionsAnimation: Object.freeze({
        hidden: { opacity: 0, y: 100, scale: 0 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        },
      } as const),
})
