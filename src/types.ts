export interface Artwork {
  id: string;
  title: string;
  year: string;
  dimensions: string;
  materials: string;
  seriesSize: number;
  status: "Available" | "Collected" | "Inquire";
  story: string;
  meaning: string;
  creationSteps: string[];
  imageSrc: string;
  macroPrompt: string; // Describes the close-up texture
  wallScale: string; // E.g. "w-44 h-56" relative size on the virtual wall
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface CollectorInquiry {
  artworkId: string;
  artworkTitle: string;
  name: string;
  email: string;
  notes: string;
  deliveryCity: string;
  isCustomRequest: boolean;
}
