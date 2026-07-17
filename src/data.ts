import { Artwork } from "./types";

// ⚠️ PLACEHOLDER COPY: dimensions, materials, story, and meaning below are
// drafted in the brand voice as placeholders so the site is complete for
// launch. Replace with the artist's actual details for each piece as soon
// as possible — especially "dimensions" and "materials," which should be
// accurate, not decorative.

export const ARTWORKS: Artwork[] = [
  {
    id: "i-am",
    title: "I AM",
    year: "2026",
    dimensions: "Dimensions TBD",
    materials: "Mixed media on canvas.",
    seriesSize: 1,
    status: "Available",
    story: "I AM is a meditation on identity and presence — a declaration rendered in physical, textured form.",
    meaning: "A study of selfhood and quiet assertion, inviting the viewer to sit with the weight of simply being.",
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
    story: "A tender rendering of the bond between mother and child, grounded in warmth and protection.",
    meaning: "An exploration of lineage, care, and the quiet strength passed between generations.",
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
    story: "Among Us considers community, belonging, and the presence we hold within a collective.",
    meaning: "A reflection on shared space and unseen connection between individuals within a larger whole.",
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
    story: "Wonderful Nina is a portrait rendered in homage — a study of voice, defiance, and grace.",
    meaning: "A celebration of an icon whose presence continues to resonate across generations.",
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
    story: "CrossRoads captures a moment of decision — the threshold between paths, and the weight of choosing.",
    meaning: "An inquiry into transition, fate, and the crossings — literal and spiritual — that shape a life.",
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
    story: "Eyes and Thoughts turns inward, rendering the interior life visible through gaze and expression.",
    meaning: "A meditation on perception, introspection, and what passes silently behind the eyes.",
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
    phase: "II. Preliminary Studies",
    title: "Charcoal and Sketches",
    description: "Translating abstract thoughts and reflections into physical drawings. We create multiple charcoal studies and geometric layouts on archival paper to refine the composition's balance."
  },
  {
    phase: "III. Canvas Preparation",
    title: "The Heavy Linen",
    description: "Stretching heavy, museum-grade raw linen onto custom-built hardwood support panels. A textured base gesso is applied to create a high-friction surface for subsequent layers."
  },
  {
    phase: "IV. Topological Mapping",
    title: "Structural Coordinates",
    description: "Drafting geometric guidelines and coordinate points directly onto the prepared canvas. This map guides the physical boundaries of the tactile relief lines that follow."
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
