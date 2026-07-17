import { Artwork } from "./types";

// ⚠️ PLACEHOLDER COPY: dimensions, materials, story, and meaning below are
// drafted in the brand voice as placeholders so the site is complete for
// launch. Replace with the artist's actual details for each piece as soon
// as possible — especially "dimensions" and "materials," which still need
// the artist's real input rather than decorative approximation.

export const ARTWORKS: Artwork[] = [
  {
    id: "i-am",
    title: "I AM",
    year: "2026",
    dimensions: "Dimensions TBD",
    materials: "Mixed media on canvas.",
    seriesSize: 1,
    status: "Available",
    story: "The work arrives as a quiet act of self-recognition, where layered surfaces feel both intimate and monumental.",
    meaning: "It considers the tension between the private self and the public gaze, asking what remains when identity is stripped to its essential pulse.",
    creationSteps: [
      "Conceptual development and composition drafting.",
      "Building the base layers and underpainting.",
      "Sculpting and detailing key focal elements.",
      "Refining color, contrast, and texture.",
      "Final sealing and museum-quality finishing."
    ],
    imageSrc: "/images/i-am.png",
    macroPrompt: "Close detail of surface texture and brushwork.",
    wallScale: "w-44 h-64"
  },
  {
    id: "mother-and-child",
    title: "Mother and Child",
    year: "2026",
    dimensions: "Dimensions TBD",
    materials: "Mixed media on canvas.",
    seriesSize: 1,
    status: "Available",
    story: "A tender study of inheritance, where the body becomes a shelter made visible through touch, shadow, and soft pressure.",
    meaning: "It honors the fragile continuity of care, tracing how love is carried from one body to the next, almost without words.",
    creationSteps: [
      "Conceptual development and composition drafting.",
      "Building the base layers and underpainting.",
      "Sculpting and detailing key focal elements.",
      "Refining color, contrast, and texture.",
      "Final sealing and museum-quality finishing."
    ],
    imageSrc: "/images/mother-and-child.png",
    macroPrompt: "Close detail of surface texture and brushwork.",
    wallScale: "w-44 h-56"
  },
  {
    id: "among-us",
    title: "Among Us",
    year: "2026",
    dimensions: "Dimensions TBD",
    materials: "Mixed media on canvas.",
    seriesSize: 1,
    status: "Available",
    story: "The piece gathers a field of presences into a single atmosphere, as if each figure were listening for the others just beyond the frame.",
    meaning: "It speaks to belonging as something felt rather than declared, a shared current that binds individuals without making them identical.",
    creationSteps: [
      "Conceptual development and composition drafting.",
      "Building the base layers and underpainting.",
      "Sculpting and detailing key focal elements.",
      "Refining color, contrast, and texture.",
      "Final sealing and museum-quality finishing."
    ],
    imageSrc: "/images/among-us.png",
    macroPrompt: "Close detail of surface texture and brushwork.",
    wallScale: "w-48 h-52"
  },
  {
    id: "wonderful-nina",
    title: "Wonderful Nina",
    year: "2026",
    dimensions: "Dimensions TBD",
    materials: "Mixed media on canvas.",
    seriesSize: 1,
    status: "Available",
    story: "Rendered with both reverence and defiance, the portrait turns presence into a kind of afterglow, luminous and unyielding.",
    meaning: "It celebrates a figure who refuses to be reduced to a single story, allowing charisma, memory, and resistance to coexist in one enduring image.",
    creationSteps: [
      "Conceptual development and composition drafting.",
      "Building the base layers and underpainting.",
      "Sculpting and detailing key focal elements.",
      "Refining color, contrast, and texture.",
      "Final sealing and museum-quality finishing."
    ],
    imageSrc: "/images/wonderful-nina.png",
    macroPrompt: "Close detail of surface texture and brushwork.",
    wallScale: "w-40 h-56"
  },
  {
    id: "crossroads",
    title: "CrossRoads",
    year: "2026",
    dimensions: "Dimensions TBD",
    materials: "Mixed media on canvas.",
    seriesSize: 1,
    status: "Available",
    story: "The work stands at the threshold where intention meets uncertainty, where each mark seems to hesitate before moving forward.",
    meaning: "It explores the quiet drama of change — the crossing itself, not merely the destination — and the courage required to choose.",
    creationSteps: [
      "Conceptual development and composition drafting.",
      "Building the base layers and underpainting.",
      "Sculpting and detailing key focal elements.",
      "Refining color, contrast, and texture.",
      "Final sealing and museum-quality finishing."
    ],
    imageSrc: "/images/crossroads.png",
    macroPrompt: "Close detail of surface texture and brushwork.",
    wallScale: "w-44 h-64"
  },
  {
    id: "eyes-and-thoughts",
    title: "Eyes and Thoughts",
    year: "2026",
    dimensions: "Dimensions TBD",
    materials: "Mixed media on canvas.",
    seriesSize: 1,
    status: "Available",
    story: "A portrait of inwardness, where the gaze becomes a chamber of memory, doubt, and unspoken thought.",
    meaning: "It asks what is visible when a person turns inward, revealing that the most intimate landscapes are often the ones no one else can enter.",
    creationSteps: [
      "Conceptual development and composition drafting.",
      "Building the base layers and underpainting.",
      "Sculpting and detailing key focal elements.",
      "Refining color, contrast, and texture.",
      "Final sealing and museum-quality finishing."
    ],
    imageSrc: "/images/eyes-and-thoughts.png",
    macroPrompt: "Close detail of surface texture and brushwork.",
    wallScale: "w-56 h-44"
  }
];

export const CREATION_STEPS = [
  {
    phase: "I. Vision",
    title: "The Philosophical Seed",
    description: "Every piece begins with deep conceptual questioning. We investigate architectural space, light, and texture, drafting a philosophical narrative that serves as the soul of the work."
  },
  {
    phase: "II. AI Concept Development",
    title: "Generative Direction",
    description: "The concept is explored through iterative image generation and visual experimentation, allowing the studio to test mood, structure, and symbolic language before committing to a final composition."
  },
  {
    phase: "III. Digital Composition",
    title: "Compositional Refinement",
    description: "The selected direction is translated into a precise digital composition, balancing rhythm, scale, and spatial tension while preparing the piece for high-quality archival production."
  },
  {
    phase: "IV. Archival Printing",
    title: "Printed Onto Canvas",
    description: "The refined composition is printed onto canvas using archival-grade materials, establishing the support on which later sculptural and painted layers will be built."
  },
  {
    phase: "V. Texture Sculpting",
    title: "Hand-Applied Relief",
    description: "Using custom trowels, steel knives, and handmade tools, we apply a formulation of marble dust, gesso, and plaster to sculpt raised physical ridges and organic fissures directly on the canvas."
  },
  {
    phase: "VI. Hand Painting",
    title: "Gesso and Pigment Washes",
    description: "Hand-applying layers of dense charcoal powder, iron oxide, raw pigments, and acrylic glazes over the cured plaster relief to define deep shadows and strong, energetic brush strokes."
  },
  {
    phase: "VII. Metal Leaf Application",
    title: "Burnished Gilding",
    description: "Applying a delicate size adhesive to precise areas of the relief, followed by hand-laying micro-thin sheets of gold leaf, white gold, or copper. The leaf is burnished with agate stones to activate its shine."
  },
  {
    phase: "VIII. Final Finishing",
    title: "UV and Matte Seals",
    description: "Protecting the complex mixed-media surfaces with specialized non-yellowing conservation varnishes. This secures the gold leaf and gesso textures for years without color degradation."
  },
  {
    phase: "IX. Museum Presentation",
    title: "Floating Oak Frames",
    description: "Each finished piece is individually float-mounted inside deep, hand-finished dark oak or ash wood frames, suspended with a shadow gap to emphasize its dimensional physical presence."
  }
];
