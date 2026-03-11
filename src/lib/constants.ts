export const RING_SIZE = 800;
export const RING_CENTER = RING_SIZE / 2;
export const RING_RADIUS = 280;
export const DOT_RADIUS = 18;
export const LABEL_OFFSET = 60;

export const STAGE_COLORS = [
  "oklch(0.73 0.12 83)",    // 1: Electric Yellow (Planning)
  "oklch(0.7 0.15 170)",    // 2: Teal (Intake)
  "oklch(0.68 0.16 250)",   // 3: Blue (Sourcing)
  "oklch(0.72 0.14 140)",   // 4: Green (Screening)
  "oklch(0.65 0.2 310)",    // 5: Purple (Interview)
  "oklch(0.7 0.18 30)",     // 6: Orange (Offer)
  "oklch(0.75 0.13 60)",    // 7: Gold (Onboarding)
];

export const ANIMATION_DURATION = {
  ringRotation: 120,
  panelEntry: 0.4,
  panelExit: 0.3,
  dotHover: 0.2,
  dotSelect: 0.3,
};
