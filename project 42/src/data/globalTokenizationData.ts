const globalTokenizationData = {
  regulatoryFrameworks: {
    unitedkingdom: {
      primaryAuthority: "Financial Conduct Authority (FCA)",
      keyLegislation: [
        {
          name: "Financial Services and Markets Act 2023 (FSMA 2023)",
          key_provisions: [
            "Security tokens subject to full FCA oversight",
            "Prospectus Regulation compliance for offerings > £5M"
          ]
        },
        {
          name: "Property (Digital Assets etc) Bill (2024)",
          key_provisions: [
            "Classifies cryptoassets as 'digital property' under English law",
            "Enables legal action for theft or fraud of tokens",
            "Explicit recognition of fractional ownership rights via tokenized assets (Section 3.2)"
          ]
        }
      ],
      taxImplications: {
        income: {
          rentalIncome: "Subject to Income Tax at applicable rates (20-45%)",
          tradingIncome: "Corporation Tax at 25% if through a company",
          distributionTax: "Dividend tax rates of 8.75-39.35% for individuals"
        },
        capital: {
          capitalGains: "Capital Gains Tax at 20% for higher rate taxpayers",
          stampDuty: "SDLT applies to initial property purchase (0-12%)",
          tokenTransfers: "No SDLT on secondary token trading"
        },
        reporting: {
          annual: "Annual tax returns required for all token holders",
          quarterly: "MTD reporting for VAT registered entities",
          disclosure: "Mandatory reporting of digital asset holdings"
        }
      },
      esgConsiderations: {
        environmental: {
          requirements: [
            "Energy Performance Certificate (EPC) rating disclosure",
            "Carbon footprint reporting for large properties",
            "Environmental impact assessment for major developments"
          ],
          incentives: [
            "Tax relief for energy efficiency improvements",
            "Green financing options",
            "Renewable energy integration benefits"
          ]
        },
        social: {
          requirements: [
            "Affordable housing contributions if applicable",
            "Community impact assessment",
            "Accessibility compliance"
          ],
          benefits: [
            "Social housing tax incentives",
            "Community development opportunities",
            "Employment generation metrics"
          ]
        },
        governance: {
          structure: [
            "Independent board representation",
            "Investor voting rights framework",
            "Transparency requirements"
          ],
          reporting: [
            "Regular ESG performance updates",
            "Stakeholder engagement protocols",
            "Risk management framework"
          ]
        }
      }
    },
    unitedstates: {
      primaryAuthorities: ["Securities and Exchange Commission (SEC)", "CFTC"],
      keyLegislation: [
        {
          name: "Securities Act of 1933",
          key_provisions: [
            "Reg D 506c for private offerings",
            "Form D filings required for security token offerings > $10M"
          ]
        },
        {
          name: "Digital Asset Securities Framework",
          key_provisions: [
            "Token classification guidelines",
            "Trading platform requirements",
            "Investor protection measures"
          ]
        }
      ],
      taxImplications: {
        income: {
          rentalIncome: "Subject to Federal Income Tax (10-37%)",
          tradingIncome: "Corporate tax rate of 21% for entities",
          distributionTax: "Qualified dividend rates of 0-20%"
        },
        capital: {
          capitalGains: "Long-term capital gains rates (0-20%)",
          propertyTax: "State and local property taxes apply",
          tokenTransfers: "Taxable events for token trades"
        },
        reporting: {
          annual: "Form 1099-B for token trading",
          quarterly: "Estimated tax payments required",
          disclosure: "FBAR reporting for foreign-held tokens"
        }
      },
      esgConsiderations: {
        environmental: {
          requirements: [
            "State-specific energy efficiency standards",
            "Environmental compliance certifications",
            "Sustainability reporting for public offerings"
          ],
          incentives: [
            "Federal tax credits for green buildings",
            "State-level environmental incentives",
            "Carbon offset programs"
          ]
        },
        social: {
          requirements: [
            "Fair housing compliance",
            "ADA accessibility standards",
            "Equal opportunity requirements"
          ],
          benefits: [
            "Opportunity zone tax benefits",
            "Community reinvestment credits",
            "Job creation incentives"
          ]
        },
        governance: {
          structure: [
            "SEC reporting requirements",
            "Board diversity guidelines",
            "Internal control frameworks"
          ],
          reporting: [
            "Quarterly financial reports",
            "Material event disclosures",
            "ESG metrics reporting"
          ]
        }
      }
    },
    europeanunion: {
      primaryFramework: "Markets in Crypto-Assets (MiCA)",
      keyLegislation: [
        {
          name: "MiCA Framework",
          key_provisions: [
            "8% capital buffer for platforms handling >€100M volume",
            "Mandatory ESG disclosures for tokenized assets"
          ]
        },
        {
          name: "EU Digital Finance Package",
          key_provisions: [
            "Digital asset custody requirements",
            "Cross-border transaction framework",
            "Investor protection measures"
          ]
        }
      ],
      taxImplications: {
        income: {
          rentalIncome: "Subject to national income tax rates",
          tradingIncome: "Corporate rates vary by member state",
          distributionTax: "Withholding tax requirements vary"
        },
        capital: {
          capitalGains: "National capital gains rates apply",
          vatImplications: "VAT exemption for token transfers",
          crossBorder: "EU-wide taxation agreements"
        },
        reporting: {
          annual: "Standardized EU reporting framework",
          quarterly: "VAT reporting requirements",
          disclosure: "DAC8 crypto-asset reporting"
        }
      },
      esgConsiderations: {
        environmental: {
          requirements: [
            "EU Taxonomy compliance",
            "SFDR reporting obligations",
            "Carbon footprint disclosure"
          ],
          incentives: [
            "Green bond framework",
            "Sustainable finance initiatives",
            "Energy efficiency grants"
          ]
        },
        social: {
          requirements: [
            "Social impact assessments",
            "Labor rights compliance",
            "Stakeholder engagement"
          ],
          benefits: [
            "Social housing incentives",
            "Employment programs",
            "Community development"
          ]
        },
        governance: {
          structure: [
            "EU corporate governance codes",
            "Shareholder rights directive",
            "Board composition requirements"
          ],
          reporting: [
            "Non-financial reporting directive",
            "ESG risk disclosures",
            "Sustainability metrics"
          ]
        }
      }
    },
    asiapacific: {
      primaryFramework: "Regional Regulatory Framework",
      keyLegislation: [
        {
          name: "Digital Assets Framework",
          key_provisions: [
            "Regional compliance requirements",
            "Cross-border transaction guidelines"
          ]
        },
        {
          name: "APAC Securities Standards",
          key_provisions: [
            "Token classification framework",
            "Trading platform requirements",
            "Investor protection measures"
          ]
        }
      ],
      taxImplications: {
        income: {
          rentalIncome: "Varies by jurisdiction (10-30%)",
          tradingIncome: "Corporate rates vary by country",
          distributionTax: "Withholding tax treaties apply"
        },
        capital: {
          capitalGains: "Country-specific CGT rates",
          stampDuty: "Varies by jurisdiction",
          tokenTransfers: "Digital asset taxation frameworks"
        },
        reporting: {
          annual: "Country-specific requirements",
          quarterly: "GST/VAT reporting",
          disclosure: "Digital asset reporting standards"
        }
      },
      esgConsiderations: {
        environmental: {
          requirements: [
            "National environmental standards",
            "Green building certifications",
            "Energy efficiency requirements"
          ],
          incentives: [
            "Green technology adoption",
            "Renewable energy credits",
            "Sustainability grants"
          ]
        },
        social: {
          requirements: [
            "Local community engagement",
            "Cultural heritage protection",
            "Social impact assessments"
          ],
          benefits: [
            "Affordable housing incentives",
            "Local employment quotas",
            "Community development funds"
          ]
        },
        governance: {
          structure: [
            "Regional governance standards",
            "Investor protection frameworks",
            "Compliance requirements"
          ],
          reporting: [
            "ESG reporting guidelines",
            "Sustainability metrics",
            "Risk management protocols"
          ]
        }
      }
    },
    middleeast: {
      primaryFramework: "Regional Guidelines",
      keyLegislation: [
        {
          name: "Digital Assets Framework",
          key_provisions: [
            "Regional compliance standards",
            "Islamic finance compatibility requirements"
          ]
        },
        {
          name: "MENA Securities Framework",
          key_provisions: [
            "Token offering guidelines",
            "Shariah compliance requirements",
            "Investor protection measures"
          ]
        }
      ],
      taxImplications: {
        income: {
          rentalIncome: "Tax-free in many jurisdictions",
          tradingIncome: "Varies by free zone/jurisdiction",
          distributionTax: "Subject to Shariah guidelines"
        },
        capital: {
          capitalGains: "Often tax-exempt",
          propertyFees: "Registration and transfer fees",
          tokenTransfers: "Digital asset regulations"
        },
        reporting: {
          annual: "Jurisdiction-specific requirements",
          quarterly: "VAT where applicable",
          disclosure: "Economic substance requirements"
        }
      },
      esgConsiderations: {
        environmental: {
          requirements: [
            "Sustainable development goals",
            "Green building standards",
            "Environmental impact studies"
          ],
          incentives: [
            "Smart city initiatives",
            "Clean energy programs",
            "Water conservation measures"
          ]
        },
        social: {
          requirements: [
            "Local workforce quotas",
            "Community benefits",
            "Cultural preservation"
          ],
          benefits: [
            "Social infrastructure development",
            "Education and training programs",
            "Community engagement initiatives"
          ]
        },
        governance: {
          structure: [
            "Shariah governance framework",
            "Corporate governance codes",
            "Transparency requirements"
          ],
          reporting: [
            "ESG compliance reporting",
            "Shariah audit requirements",
            "Risk management frameworks"
          ]
        }
      }
    }
  },
  marketData: {
    unitedkingdom: {
      marketSize: {
        totalValue: "£24.1B",
        growthRate: "+214% YoY",
        institutionalParticipation: "63%"
      },
      liquidityMetrics: {
        avgDaysToLiquidity: {
          residential: 22,
          commercial: 47
        },
        tradingVolume: {
          daily: "£12.3M",
          monthly: "£370M"
        }
      },
      marketTrends: {
        tokenization: {
          growth: "+156% YoY",
          popularSegments: ["Commercial Office", "Multi-family Residential"],
          emergingTrends: ["Fractional Luxury Properties", "Student Housing"]
        }
      }
    }
  },
  implementationTimelines: {
    unitedkingdom: {
      legalStructure: {
        timeframe: "4-6 weeks",
        complexity: "High",
        keySteps: [
          "Form appropriate legal entity",
          "Prepare operating agreements",
          "Establish governance structure",
          "Set up bank accounts"
        ]
      },
      regulatoryCompliance: {
        timeframe: "8-12 weeks",
        complexity: "High",
        keySteps: [
          "File necessary registrations",
          "Implement KYC/AML procedures",
          "Obtain legal opinions",
          "Establish compliance protocols"
        ]
      }
    }
  },
  riskAssessment: {
    methodologies: {
      marketRisk: {
        regionAdjustments: {
          "United Kingdom": 5.5,
          "United States": 6.0,
          "European Union": 5.8,
          "Asia Pacific": 6.5,
          "Middle East": 7.0
        }
      },
      propertyRisk: {
        propertyTypeAdjustments: {
          "Single-family residential": 4.5,
          "Multi-family residential": 5.0,
          "Commercial office": 6.0,
          "Retail space": 6.5,
          "Industrial": 5.5,
          "Mixed-use": 5.8
        }
      },
      regulatoryRisk: {
        jurisdictionAdjustments: {
          "United Kingdom": 4.5,
          "United States": 5.0,
          "European Union": 4.8,
          "Asia Pacific": 6.0,
          "Middle East": 6.5
        }
      }
    }
  }
};

export default globalTokenizationData;