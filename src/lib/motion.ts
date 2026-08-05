export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeOut },
};

export const stagger = (index: number, base = 0.08) => ({
  duration: 0.55,
  delay: index * base,
  ease: easeOut,
});
