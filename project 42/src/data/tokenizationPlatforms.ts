import { Platform } from './types';

export interface Platform {
  name: string;
  focus: string[];
  minValue: number;
  maxValue: number;
  minInvestment: number;
  jurisdiction: string[];
  liquidityScore: number;
  specialFeatures: string[];
  pros: string[];
  cons: string[];
  website: string;
  description?: string;
  tokenDetails?: {
    type: string;
    features: string[];
  };
  complianceFeatures?: string[];
}

export const platforms: Record<string, Platform> = {
  tpx: {
    name: "TPX Property Exchanges",
    focus: ["Residential", "Commercial", "Public Real Estate"],
    minValue: 1000000,
    maxValue: 1000000000,
    minInvestment: 1000,
    jurisdiction: ["United Kingdom", "Global"],
    liquidityScore: 9.5,
    specialFeatures: [
      "Global Property Operating System",
      "Real-time liquidity engines",
      "Mutually Exclusive Chain Ecosystem",
      "AI-powered processes",
      "280,000 TPS capacity"
    ],
    pros: [
      "Advanced blockchain and DeFi integration",
      "Ultra-fast transaction processing",
      "Strong regulatory compliance",
      "Global expansion strategy",
      "Institutional-grade infrastructure"
    ],
    cons: [
      "New platform in development",
      "Complex technology stack",
      "Requires local partnerships for expansion"
    ],
    website: "https://www.tpx-global.com",
    description: "Global property exchange platform with advanced blockchain technology and real-time liquidity engines",
    tokenDetails: {
      type: "Custom Chain Ecosystem",
      features: [
        "Title-to-fiat transactions",
        "DeFi architecture",
        "Automated Market Maker",
        "Sovereign-secure system"
      ]
    },
    complianceFeatures: [
      "FCA Innovation Sandbox participant",
      "Regulatory body collaboration",
      "Advanced KYC/AML processes",
      "Market surveillance systems"
    ]
  },
  mattereum: {
    name: "Mattereum",
    focus: ["Commercial", "Residential", "Mixed-use"],
    minValue: 1000000,
    maxValue: 100000000,
    minInvestment: 10000,
    jurisdiction: ["United Kingdom", "European Union", "Global"],
    liquidityScore: 8.5,
    specialFeatures: [
      "Mattereum Asset Passport (MAP)",
      "Legal-technical framework",
      "Cross-border enforceability",
      "Smart contract automation"
    ],
    pros: [
      "Strong legal framework with global enforceability",
      "Comprehensive asset documentation system",
      "Advanced smart contract capabilities",
      "UK common law foundation"
    ],
    cons: [
      "Higher minimum investment threshold",
      "Complex legal structure",
      "Limited track record in some jurisdictions"
    ],
    website: "https://mattereum.com",
    description: "Global platform specializing in legally-enforceable digital asset transfers using the Mattereum Asset Passport system",
    tokenDetails: {
      type: "Security Token (MAP-compliant)",
      features: [
        "Cross-border transferability",
        "Automated compliance checks",
        "Legal enforceability guarantees"
      ]
    },
    complianceFeatures: [
      "Automated KYC/AML",
      "Cross-border regulatory alignment",
      "Real-time compliance monitoring"
    ]
  },
  reitium: {
    name: "Reitium",
    focus: ["Residential", "Commercial", "Multi-family"],
    minValue: 500000,
    maxValue: 50000000,
    minInvestment: 1000,
    jurisdiction: ["United States", "Canada", "Global"],
    liquidityScore: 7.5,
    specialFeatures: [
      "Fractional ownership platform",
      "Automated dividend distribution",
      "User-friendly interface",
      "Low minimum investment"
    ],
    pros: [
      "Accessible minimum investment",
      "Strong focus on retail investors",
      "Automated income distribution",
      "Simple user experience"
    ],
    cons: [
      "Limited geographic presence",
      "Newer platform with less track record",
      "Lower liquidity compared to larger platforms"
    ],
    website: "https://reitium.com",
    description: "Accessible real estate investment platform focusing on fractional ownership and automated distributions",
    tokenDetails: {
      type: "ERC-20 Security Token",
      features: [
        "Automated dividend payments",
        "Fractional ownership rights",
        "Secondary market trading"
      ]
    }
  },
  harbor: {
    name: "Harbor",
    focus: ["Commercial", "Institutional", "Mixed-use"],
    minValue: 5000000,
    maxValue: 250000000,
    minInvestment: 25000,
    jurisdiction: ["United States", "Global"],
    liquidityScore: 8.0,
    specialFeatures: [
      "Compliance automation",
      "Institutional-grade platform",
      "Regulatory focus",
      "Advanced compliance tools"
    ],
    pros: [
      "Strong regulatory compliance framework",
      "Institutional-quality infrastructure",
      "Robust security measures",
      "Comprehensive reporting system"
    ],
    cons: [
      "Higher minimum investment requirements",
      "Focus on larger properties",
      "Limited retail investor access"
    ],
    website: "https://harbor.com",
    description: "Institutional-grade platform specializing in regulatory-compliant real estate tokenization",
    tokenDetails: {
      type: "R-Token Standard",
      features: [
        "Built-in compliance",
        "Institutional-grade security",
        "Automated reporting"
      ]
    },
    complianceFeatures: [
      "SEC compliance automation",
      "Accredited investor verification",
      "Transfer restriction enforcement"
    ]
  },
  redswan: {
    name: "RedSwan",
    focus: ["Commercial", "Class A Properties", "Institutional"],
    minValue: 10000000,
    maxValue: 500000000,
    minInvestment: 50000,
    jurisdiction: ["United States", "Canada"],
    liquidityScore: 7.8,
    specialFeatures: [
      "Institutional-grade properties",
      "Commercial focus",
      "Large portfolio access",
      "Professional management"
    ],
    pros: [
      "Access to premium commercial properties",
      "Strong institutional backing",
      "Professional asset management",
      "Established track record"
    ],
    cons: [
      "High minimum investment",
      "Limited geographic scope",
      "Focus on larger properties only"
    ],
    website: "https://redswan.io",
    description: "Premium commercial real estate tokenization platform focusing on institutional-grade properties",
    tokenDetails: {
      type: "Security Token (ERC-20)",
      features: [
        "Institutional compliance",
        "Professional management rights",
        "Automated distributions"
      ]
    }
  },
  propchain: {
    name: "PropChain",
    focus: ["Luxury Residential", "Commercial"],
    minValue: 5000000,
    maxValue: 100000000,
    minInvestment: 5000,
    jurisdiction: ["Middle East", "European Union"],
    liquidityScore: 8,
    specialFeatures: [
      "Bi-annual trading windows",
      "EU-compliant structure",
      "GCC market expertise"
    ],
    pros: [
      "Strong presence in Dubai and Riyadh markets",
      "EU regulatory compliance via Lithuania",
      "High-value property expertise"
    ],
    cons: [
      "Limited by GCC capital controls",
      "Bi-annual liquidity only",
      "Higher minimum investment"
    ],
    website: "https://propchain.network",
    description: "Specialized platform for luxury property tokenization in the Middle East and EU markets",
    tokenDetails: {
      type: "Hybrid Token ($PROPC)",
      features: [
        "GCC market optimization",
        "EU regulatory compliance",
        "Bi-annual trading"
      ]
    }
  },
  smartblocks: {
    name: "SmartBlocks",
    focus: ["Hospitality", "Renewable Energy"],
    minValue: 1000000,
    maxValue: 85000000,
    minInvestment: 1000,
    jurisdiction: ["UAE", "Global"],
    liquidityScore: 9,
    specialFeatures: [
      "AI-driven due diligence",
      "Automated market making",
      "Sharia compliance"
    ],
    pros: [
      "Low minimum investment",
      "Continuous secondary trading",
      "Strong family office network"
    ],
    cons: [
      "1.2% transaction fees",
      "Limited to specific asset types",
      "Complex due diligence process"
    ],
    website: "https://smartblocks.com",
    description: "AI-powered tokenization platform with Sharia-compliant options for hospitality and renewable energy assets",
    tokenDetails: {
      type: "Sharia-Compliant Security Token",
      features: [
        "Islamic finance compatibility",
        "Automated compliance",
        "AI-driven valuation"
      ]
    }
  },
  meridio: {
    name: "Meridio",
    focus: ["Single-family Residential"],
    minValue: 100000,
    maxValue: 5000000,
    minInvestment: 100,
    jurisdiction: ["United States"],
    liquidityScore: 7,
    specialFeatures: [
      "Polygon integration",
      "Micro-investments",
      "Automated rental distributions"
    ],
    pros: [
      "Lowest minimum investment",
      "High rental yields",
      "Low transaction fees"
    ],
    cons: [
      "90-day redemption periods",
      "US market only",
      "Stricter KYC requirements"
    ],
    website: "https://meridio.co",
    description: "Accessible residential real estate investment platform using Polygon blockchain for efficiency",
    tokenDetails: {
      type: "Polygon-based Security Token",
      features: [
        "Low-cost transactions",
        "Automated distributions",
        "Fractional ownership"
      ]
    }
  },
  brickblock: {
    name: "Brickblock",
    focus: ["Commercial Office", "Institutional"],
    minValue: 10000000,
    maxValue: 650000000,
    minInvestment: 10000,
    jurisdiction: ["European Union"],
    liquidityScore: 8,
    specialFeatures: [
      "Proof-of-Asset tokens",
      "Instant settlements",
      "Dual regulatory approval"
    ],
    pros: [
      "BaFin and AMF approved",
      "Institutional-grade assets",
      "Advanced token ecosystem"
    ],
    cons: [
      "2.5% annual management fee",
      "High minimum investment",
      "Limited to institutional assets"
    ],
    website: "https://www.brickblock.io",
    description: "EU-regulated platform for institutional-grade commercial real estate tokenization",
    tokenDetails: {
      type: "Proof-of-Asset Token",
      features: [
        "Dual regulatory compliance",
        "Instant settlement",
        "Institutional features"
      ]
    }
  },
  propy: {
    name: "Propy",
    focus: ["Residential", "Commercial", "Luxury"],
    minValue: 500000,
    maxValue: 50000000,
    minInvestment: 500,
    jurisdiction: ["Global"],
    liquidityScore: 9.5,
    specialFeatures: [
      "Cross-border infrastructure",
      "Multi-currency support",
      "Atomic swaps"
    ],
    pros: [
      "18 currency support",
      "Instant property transfers",
      "Global accessibility"
    ],
    cons: [
      "Chinese market restrictions",
      "Complex cross-border compliance",
      "Variable transaction times"
    ],
    website: "https://propy.com",
    description: "Global real estate transaction platform with multi-currency support and cross-border capabilities",
    tokenDetails: {
      type: "Multi-Currency Security Token",
      features: [
        "Cross-border transfers",
        "Multi-currency support",
        "Atomic swap capability"
      ]
    }
  },
  realT: {
    name: "RealT",
    focus: ["Residential", "Single Family"],
    minValue: 1000000,
    maxValue: 10000000,
    minInvestment: 500,
    jurisdiction: ["United States"],
    liquidityScore: 7,
    specialFeatures: ["Automated Dividends", "Non-accredited"],
    pros: [
      "Low minimum investment",
      "Automated dividend payments",
      "User-friendly platform"
    ],
    cons: [
      "Limited to US properties",
      "Lower property value range",
      "Only for residential"
    ],
    website: "https://realt.co",
    description: "Residential real estate platform allowing non-accredited investor participation",
    tokenDetails: {
      type: "ERC-20 Security Token",
      features: [
        "Non-accredited access",
        "Automated dividends",
        "Residential focus"
      ]
    }
  },
  blocksquare: {
    name: "Blocksquare",
    focus: ["Commercial", "Mixed-use", "Retail"],
    minValue: 5000000,
    maxValue: 100000000,
    minInvestment: 1000,
    jurisdiction: ["European Union", "United Kingdom", "Asia Pacific"],
    liquidityScore: 7.5,
    specialFeatures: ["Secondary Market", "White-label"],
    pros: [
      "Advanced tokenization infrastructure",
      "Established secondary market",
      "Multi-jurisdiction support"
    ],
    cons: [
      "Complex integration process",
      "Higher platform fees",
      "Limited to certain property types"
    ],
    website: "https://blocksquare.io",
    description: "Multi-jurisdiction platform offering white-label tokenization solutions",
    tokenDetails: {
      type: "BST Security Token",
      features: [
        "Secondary market trading",
        "White-label capability",
        "Multi-jurisdiction compliance"
      ]
    }
  },
  realt0: {
    name: "RealT0",
    focus: ["Commercial", "Residential", "Industrial"],
    minValue: 10000000,
    maxValue: 250000000,
    minInvestment: 2500,
    jurisdiction: ["United States", "European Union"],
    liquidityScore: 8.5,
    specialFeatures: ["Global Access", "Multi-asset"],
    pros: [
      "Global property access",
      "High liquidity potential",
      "Diverse asset types"
    ],
    cons: [
      "Complex regulatory requirements",
      "Higher entry barriers",
      "Longer processing times"
    ],
    website: "https://realt0.com",
    description: "Global platform supporting diverse property types with high liquidity focus",
    tokenDetails: {
      type: "Multi-Asset Security Token",
      features: [
        "Global investor access",
        "Multi-asset support",
        "High liquidity features"
      ]
    }
  },
  revested: {
    name: "Revested",
    focus: ["Residential", "Mixed Use"],
    minValue: 500000,
    maxValue: 20000000,
    minInvestment: 1000,
    jurisdiction: ["United Kingdom"],
    liquidityScore: 7,
    specialFeatures: ["Fast Settlement", "Smart Contracts"],
    pros: [
      "Fast transaction settlement (14 days avg)",
      "FCA-registered with MiFID II compliance",
      "Focus on UK commuter belt properties"
    ],
    cons: [
      "Limited to UK market",
      "Biweekly auction liquidity only",
      "Regional focus might limit opportunities"
    ],
    website: "https://revested.co.uk",
    description: "UK-focused platform specializing in fast settlement and smart contract automation",
    tokenDetails: {
      type: "FCA-Compliant Security Token",
      features: [
        "Fast settlement",
        "Smart contract automation",
        "MiFID II compliance"
      ]
    }
  }
};

export interface PropertyDetails {
  type: string;
  value: number;
  location: string;
  targetInvestorType: string;
  minInvestmentTarget: number;
}

export const scorePlatform = (platform: Platform, property: PropertyDetails): number => {
  // If the platform doesn't operate in the property's jurisdiction, return 0
  if (!platform.jurisdiction.includes(property.location) && !platform.jurisdiction.includes('Global')) {
    return 0;
  }
  
  let score = 0;
  
  // Property type match
  if (platform.focus.some(focus => property.type.includes(focus))) {
    score += 30;
  }
  
  // Value range match
  if (property.value >= platform.minValue && property.value <= platform.maxValue) {
    score += 25;
  }
  
  // Investment minimum match
  if (platform.minInvestment <= property.minInvestmentTarget) {
    score += 15;
  }
  
  // Add liquidity score (normalized to 10 points)
  score += (platform.liquidityScore / 10) * 10;

  // Jurisdiction bonus for local platforms
  if (platform.jurisdiction.includes(property.location)) {
    score += 10;
  }

  // Global platform adjustment
  if (platform.jurisdiction.includes('Global')) {
    score += 5;
  }

  return Math.round(Math.min(score, 100));
};