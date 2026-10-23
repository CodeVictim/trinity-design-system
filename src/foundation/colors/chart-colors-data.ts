// Content for the Chart Colors story, GENERATED from the Figma frame "Trinity — Chart Colors" (66095:69148)
// on the 🎨 Color page of "Trinity Design System" — read-only, 2026-10-22. Swatches use the real
// --data-charts-* tokens; contrast is measured from them at render time (figmaCard / figmaText = what the frame states).
export type Ramp = { level: string; token: string; figmaCard: number; figmaText: number };
export type AreaMode = { mapping: string; fill: string; label: string; text: string; note: string };
export type Family = { name: string; key: string; subtitle: string; stops: { step: string; note: string }[];
  area: { light: AreaMode; dark: AreaMode }; shades: { light: string[]; dark: string[] }; ramps: { light: Ramp[]; dark: Ramp[] } };
export const FAMILIES: Family[] = [
 {
  "name": "Quality",
  "key": "quality",
  "subtitle": "data/charts/quality · Blue · Verifi Blue family",
  "stops": [
   {
    "step": "100",
    "note": "Dark: shade 2, ramp Max"
   },
   {
    "step": "200",
    "note": "Light: ramp Low"
   },
   {
    "step": "300",
    "note": "Dark: base, ramp High"
   },
   {
    "step": "400",
    "note": "Light: ramp Mid"
   },
   {
    "step": "500",
    "note": "Dark: shade 3, ramp Mid"
   },
   {
    "step": "600",
    "note": "Light: base, ramp High"
   },
   {
    "step": "700",
    "note": "Light: shade 2"
   },
   {
    "step": "800",
    "note": "Dark: ramp Low"
   },
   {
    "step": "900",
    "note": "Light: shade 3, ramp Max"
   }
  ],
  "area": {
   "light": {
    "mapping": "Quality → Verifi Blue 600",
    "fill": "data/charts/quality/600",
    "label": "neutral/0",
    "text": "data/charts/quality/600",
    "note": "Where Verifi started. Official brand blue."
   },
   "dark": {
    "mapping": "Quality → Blue (light)",
    "fill": "data/charts/quality/300",
    "label": "neutral/950",
    "text": "data/charts/quality/300",
    "note": ""
   }
  },
  "shades": {
   "light": [
    "data/charts/quality/600",
    "data/charts/quality/700",
    "data/charts/quality/900"
   ],
   "dark": [
    "data/charts/quality/300",
    "data/charts/quality/100",
    "data/charts/quality/500"
   ]
  },
  "ramps": {
   "light": [
    {
     "level": "Low",
     "token": "data/charts/quality/200",
     "figmaCard": 1.3,
     "figmaText": 13.9
    },
    {
     "level": "Mid",
     "token": "data/charts/quality/400",
     "figmaCard": 2.51,
     "figmaText": 7.2
    },
    {
     "level": "High",
     "token": "data/charts/quality/600",
     "figmaCard": 4.83,
     "figmaText": 4.8
    },
    {
     "level": "Max",
     "token": "data/charts/quality/900",
     "figmaCard": 13.52,
     "figmaText": 13.5
    }
   ],
   "dark": [
    {
     "level": "Low",
     "token": "data/charts/quality/800",
     "figmaCard": 1.51,
     "figmaText": 9.1
    },
    {
     "level": "Mid",
     "token": "data/charts/quality/500",
     "figmaCard": 4.79,
     "figmaText": 6.3
    },
    {
     "level": "High",
     "token": "data/charts/quality/300",
     "figmaCard": 7.64,
     "figmaText": 10.0
    },
    {
     "level": "Max",
     "token": "data/charts/quality/100",
     "figmaCard": 10.58,
     "figmaText": 13.9
    }
   ]
  }
 },
 {
  "name": "Operations",
  "key": "operations",
  "subtitle": "data/charts/operations · Orange · the traffic cone and safety vest",
  "stops": [
   {
    "step": "100",
    "note": "Light: ramp Low"
   },
   {
    "step": "200",
    "note": "Dark: shade 2, ramp Max"
   },
   {
    "step": "300",
    "note": "Light: ramp Mid"
   },
   {
    "step": "400",
    "note": "Dark: base, ramp High"
   },
   {
    "step": "500",
    "note": "Light: base, ramp High"
   },
   {
    "step": "600",
    "note": "Dark: shade 3, ramp Mid"
   },
   {
    "step": "700",
    "note": "Light: text"
   },
   {
    "step": "800",
    "note": "Light: shade 2"
   },
   {
    "step": "900",
    "note": "Light: shade 3, ramp Max"
   },
   {
    "step": "950",
    "note": "Dark: ramp Low"
   }
  ],
  "area": {
   "light": {
    "mapping": "Operations → Orange",
    "fill": "data/charts/operations/500",
    "label": "neutral/950",
    "text": "data/charts/operations/700",
    "note": "The traffic cone and safety vest."
   },
   "dark": {
    "mapping": "Operations → Orange",
    "fill": "data/charts/operations/400",
    "label": "neutral/950",
    "text": "data/charts/operations/400",
    "note": ""
   }
  },
  "shades": {
   "light": [
    "data/charts/operations/500",
    "data/charts/operations/800",
    "data/charts/operations/900"
   ],
   "dark": [
    "data/charts/operations/400",
    "data/charts/operations/200",
    "data/charts/operations/600"
   ]
  },
  "ramps": {
   "light": [
    {
     "level": "Low",
     "token": "data/charts/operations/100",
     "figmaCard": 1.32,
     "figmaText": 13.7
    },
    {
     "level": "Mid",
     "token": "data/charts/operations/300",
     "figmaCard": 2.06,
     "figmaText": 8.8
    },
    {
     "level": "High",
     "token": "data/charts/operations/500",
     "figmaCard": 3.29,
     "figmaText": 5.5
    },
    {
     "level": "Max",
     "token": "data/charts/operations/900",
     "figmaCard": 9.43,
     "figmaText": 9.4
    }
   ],
   "dark": [
    {
     "level": "Low",
     "token": "data/charts/operations/950",
     "figmaCard": 1.44,
     "figmaText": 9.6
    },
    {
     "level": "Mid",
     "token": "data/charts/operations/600",
     "figmaCard": 3.51,
     "figmaText": 4.6
    },
    {
     "level": "High",
     "token": "data/charts/operations/400",
     "figmaCard": 5.36,
     "figmaText": 7.1
    },
    {
     "level": "Max",
     "token": "data/charts/operations/200",
     "figmaCard": 7.66,
     "figmaText": 10.1
    }
   ]
  }
 },
 {
  "name": "Materials & Mixes",
  "key": "materials-mixes",
  "subtitle": "data/charts/materials-mixes · Earth brown · dirt, sand and aggregate",
  "stops": [
   {
    "step": "100",
    "note": "Dark: shade 2, ramp Max"
   },
   {
    "step": "200",
    "note": "Light: ramp Low"
   },
   {
    "step": "300",
    "note": "Dark: base, ramp High"
   },
   {
    "step": "400",
    "note": "Light: ramp Mid"
   },
   {
    "step": "500",
    "note": "Dark: shade 3, ramp Mid"
   },
   {
    "step": "600",
    "note": "Light: base, ramp High"
   },
   {
    "step": "700",
    "note": "Light: shade 2"
   },
   {
    "step": "800",
    "note": "Dark: ramp Low"
   },
   {
    "step": "900",
    "note": "Light: shade 3, ramp Max"
   }
  ],
  "area": {
   "light": {
    "mapping": "Materials & Mixes → Earth brown",
    "fill": "data/charts/materials-mixes/600",
    "label": "neutral/0",
    "text": "data/charts/materials-mixes/600",
    "note": "Dirt, sand and aggregate. Reads as sand in dark mode."
   },
   "dark": {
    "mapping": "Materials & Mixes → Earth brown",
    "fill": "data/charts/materials-mixes/300",
    "label": "neutral/950",
    "text": "data/charts/materials-mixes/300",
    "note": ""
   }
  },
  "shades": {
   "light": [
    "data/charts/materials-mixes/600",
    "data/charts/materials-mixes/700",
    "data/charts/materials-mixes/900"
   ],
   "dark": [
    "data/charts/materials-mixes/300",
    "data/charts/materials-mixes/100",
    "data/charts/materials-mixes/500"
   ]
  },
  "ramps": {
   "light": [
    {
     "level": "Low",
     "token": "data/charts/materials-mixes/200",
     "figmaCard": 1.31,
     "figmaText": 13.8
    },
    {
     "level": "Mid",
     "token": "data/charts/materials-mixes/400",
     "figmaCard": 2.55,
     "figmaText": 7.1
    },
    {
     "level": "High",
     "token": "data/charts/materials-mixes/600",
     "figmaCard": 4.87,
     "figmaText": 4.9
    },
    {
     "level": "Max",
     "token": "data/charts/materials-mixes/900",
     "figmaCard": 13.66,
     "figmaText": 13.7
    }
   ],
   "dark": [
    {
     "level": "Low",
     "token": "data/charts/materials-mixes/800",
     "figmaCard": 1.49,
     "figmaText": 9.2
    },
    {
     "level": "Mid",
     "token": "data/charts/materials-mixes/500",
     "figmaCard": 4.92,
     "figmaText": 6.5
    },
    {
     "level": "High",
     "token": "data/charts/materials-mixes/300",
     "figmaCard": 7.82,
     "figmaText": 10.3
    },
    {
     "level": "Max",
     "token": "data/charts/materials-mixes/100",
     "figmaCard": 10.75,
     "figmaText": 14.1
    }
   ]
  }
 },
 {
  "name": "Sustainability",
  "key": "sustainability",
  "subtitle": "data/charts/sustainability · Green",
  "stops": [
   {
    "step": "100",
    "note": "Light: ramp Low"
   },
   {
    "step": "200",
    "note": "Dark: shade 2, ramp Max"
   },
   {
    "step": "300",
    "note": "Dark: base, ramp High"
   },
   {
    "step": "400",
    "note": "Light: ramp Mid"
   },
   {
    "step": "500",
    "note": "Dark: shade 3, ramp Mid"
   },
   {
    "step": "600",
    "note": "Light: base, ramp High"
   },
   {
    "step": "700",
    "note": "Dark: ramp Low"
   },
   {
    "step": "800",
    "note": "Light: shade 2"
   },
   {
    "step": "900",
    "note": "Light: shade 3, ramp Max"
   }
  ],
  "area": {
   "light": {
    "mapping": "Sustainability → Green",
    "fill": "data/charts/sustainability/600",
    "label": "neutral/0",
    "text": "data/charts/sustainability/600",
    "note": "The obvious one."
   },
   "dark": {
    "mapping": "Sustainability → Green",
    "fill": "data/charts/sustainability/300",
    "label": "neutral/950",
    "text": "data/charts/sustainability/300",
    "note": ""
   }
  },
  "shades": {
   "light": [
    "data/charts/sustainability/600",
    "data/charts/sustainability/800",
    "data/charts/sustainability/900"
   ],
   "dark": [
    "data/charts/sustainability/300",
    "data/charts/sustainability/200",
    "data/charts/sustainability/500"
   ]
  },
  "ramps": {
   "light": [
    {
     "level": "Low",
     "token": "data/charts/sustainability/100",
     "figmaCard": 1.3,
     "figmaText": 13.9
    },
    {
     "level": "Mid",
     "token": "data/charts/sustainability/400",
     "figmaCard": 2.41,
     "figmaText": 7.5
    },
    {
     "level": "High",
     "token": "data/charts/sustainability/600",
     "figmaCard": 5.55,
     "figmaText": 5.5
    },
    {
     "level": "Max",
     "token": "data/charts/sustainability/900",
     "figmaCard": 15.46,
     "figmaText": 15.5
    }
   ],
   "dark": [
    {
     "level": "Low",
     "token": "data/charts/sustainability/700",
     "figmaCard": 1.55,
     "figmaText": 8.9
    },
    {
     "level": "Mid",
     "token": "data/charts/sustainability/500",
     "figmaCard": 4.25,
     "figmaText": 5.6
    },
    {
     "level": "High",
     "token": "data/charts/sustainability/300",
     "figmaCard": 6.84,
     "figmaText": 9.0
    },
    {
     "level": "Max",
     "token": "data/charts/sustainability/200",
     "figmaCard": 9.55,
     "figmaText": 12.6
    }
   ]
  }
 },
 {
  "name": "Adoption",
  "key": "adoption",
  "subtitle": "data/charts/adoption · Deep violet",
  "stops": [
   {
    "step": "100",
    "note": "Light: ramp Low"
   },
   {
    "step": "200",
    "note": "Dark: shade 2, ramp Max"
   },
   {
    "step": "300",
    "note": "Dark: base, ramp High"
   },
   {
    "step": "400",
    "note": "Light: shade 3, ramp Mid"
   },
   {
    "step": "500",
    "note": "Dark: shade 3, ramp Mid"
   },
   {
    "step": "600",
    "note": "Light: shade 2, ramp High"
   },
   {
    "step": "700",
    "note": "Dark: ramp Low"
   },
   {
    "step": "800",
    "note": "Light: base, ramp Max"
   }
  ],
  "area": {
   "light": {
    "mapping": "Adoption → Deep violet",
    "fill": "data/charts/adoption/800",
    "label": "neutral/0",
    "text": "data/charts/adoption/800",
    "note": "Chosen for separation. Keep it deep in light mode."
   },
   "dark": {
    "mapping": "Adoption → Deep violet",
    "fill": "data/charts/adoption/300",
    "label": "neutral/950",
    "text": "data/charts/adoption/300",
    "note": ""
   }
  },
  "shades": {
   "light": [
    "data/charts/adoption/800",
    "data/charts/adoption/600",
    "data/charts/adoption/400"
   ],
   "dark": [
    "data/charts/adoption/300",
    "data/charts/adoption/200",
    "data/charts/adoption/500"
   ]
  },
  "ramps": {
   "light": [
    {
     "level": "Low",
     "token": "data/charts/adoption/100",
     "figmaCard": 1.32,
     "figmaText": 13.7
    },
    {
     "level": "Mid",
     "token": "data/charts/adoption/400",
     "figmaCard": 3.6,
     "figmaText": 5.0
    },
    {
     "level": "High",
     "token": "data/charts/adoption/600",
     "figmaCard": 5.68,
     "figmaText": 5.7
    },
    {
     "level": "Max",
     "token": "data/charts/adoption/800",
     "figmaCard": 9.94,
     "figmaText": 9.9
    }
   ],
   "dark": [
    {
     "level": "Low",
     "token": "data/charts/adoption/700",
     "figmaCard": 1.45,
     "figmaText": 9.5
    },
    {
     "level": "Mid",
     "token": "data/charts/adoption/500",
     "figmaCard": 3.51,
     "figmaText": 4.6
    },
    {
     "level": "High",
     "token": "data/charts/adoption/300",
     "figmaCard": 4.93,
     "figmaText": 6.5
    },
    {
     "level": "Max",
     "token": "data/charts/adoption/200",
     "figmaCard": 7.08,
     "figmaText": 9.3
    }
   ]
  }
 },
 {
  "name": "Contractor Experience",
  "key": "contractor-experience",
  "subtitle": "data/charts/contractor-experience · Magenta",
  "stops": [
   {
    "step": "100",
    "note": "Light: ramp Low"
   },
   {
    "step": "200",
    "note": "Dark: shade 2, ramp Max"
   },
   {
    "step": "300",
    "note": "Dark: base, ramp High"
   },
   {
    "step": "400",
    "note": "Light: ramp Mid"
   },
   {
    "step": "500",
    "note": "Dark: shade 3, ramp Mid"
   },
   {
    "step": "600",
    "note": "Light: base, ramp High"
   },
   {
    "step": "700",
    "note": "Light: shade 2"
   },
   {
    "step": "800",
    "note": "Dark: ramp Low"
   },
   {
    "step": "900",
    "note": "Light: shade 3, ramp Max"
   }
  ],
  "area": {
   "light": {
    "mapping": "Contractor Experience → Magenta",
    "fill": "data/charts/contractor-experience/600",
    "label": "neutral/0",
    "text": "data/charts/contractor-experience/600",
    "note": "Chosen for separation."
   },
   "dark": {
    "mapping": "Contractor Experience → Magenta",
    "fill": "data/charts/contractor-experience/300",
    "label": "neutral/950",
    "text": "data/charts/contractor-experience/300",
    "note": ""
   }
  },
  "shades": {
   "light": [
    "data/charts/contractor-experience/600",
    "data/charts/contractor-experience/700",
    "data/charts/contractor-experience/900"
   ],
   "dark": [
    "data/charts/contractor-experience/300",
    "data/charts/contractor-experience/200",
    "data/charts/contractor-experience/500"
   ]
  },
  "ramps": {
   "light": [
    {
     "level": "Low",
     "token": "data/charts/contractor-experience/100",
     "figmaCard": 1.32,
     "figmaText": 13.7
    },
    {
     "level": "Mid",
     "token": "data/charts/contractor-experience/400",
     "figmaCard": 2.69,
     "figmaText": 6.7
    },
    {
     "level": "High",
     "token": "data/charts/contractor-experience/600",
     "figmaCard": 4.5,
     "figmaText": 4.5
    },
    {
     "level": "Max",
     "token": "data/charts/contractor-experience/900",
     "figmaCard": 12.78,
     "figmaText": 12.8
    }
   ],
   "dark": [
    {
     "level": "Low",
     "token": "data/charts/contractor-experience/800",
     "figmaCard": 1.42,
     "figmaText": 9.7
    },
    {
     "level": "Mid",
     "token": "data/charts/contractor-experience/500",
     "figmaCard": 4.24,
     "figmaText": 5.6
    },
    {
     "level": "High",
     "token": "data/charts/contractor-experience/300",
     "figmaCard": 6.86,
     "figmaText": 9.0
    },
    {
     "level": "Max",
     "token": "data/charts/contractor-experience/200",
     "figmaCard": 9.75,
     "figmaText": 12.8
    }
   ]
  }
 }
];
