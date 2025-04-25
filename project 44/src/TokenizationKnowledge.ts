// Knowledge base for the Real Estate Tokenization AI Agent
export const tokenizationKnowledge = {
  concepts: {
    'security tokens': {
      description: 'Security tokens are blockchain-based tokens that represent a financial security such as equity, debt, or other investment contracts. Real estate tokens typically qualify as security tokens because they represent an investment in a common enterprise with expectation of profits.',
      examples: [
        'Tokens representing ownership shares in a REIT (Real Estate Investment Trust)',
        'Tokens that entitle holders to rental income from a commercial property',
        'Property debt tokens that represent a loan secured by real estate'
      ],
      related: ['real estate tokenization', 'securities regulations', 'investment contract']
    },
    'smart contracts': {
      description: 'Smart contracts are self-executing programs stored on a blockchain that automatically enforce the terms of an agreement. In real estate tokenization, smart contracts enable automated compliance, dividend distributions, and ownership transfers without requiring intermediaries.',
      examples: [
        'A smart contract that automatically distributes rental income to token holders every month',
        'A smart contract that enforces transfer restrictions based on investor accreditation status',
        'A voting mechanism implemented through smart contracts for token holder governance'
      ],
      related: ['blockchain', 'automated compliance', 'token distribution']
    },
    'regulatory compliance': {
      description: 'Regulatory compliance refers to the adherence to laws and regulations governing tokenized real estate. Since real estate tokens typically qualify as securities, they must comply with securities laws in the jurisdictions where they are offered and sold.',
      examples: [
        'Regulation D compliance for private placements to accredited investors in the US',
        'KYC/AML procedures to verify investor identities and source of funds',
        'Prospectus requirements for public offerings in the EU'
      ],
      related: ['securities laws', 'KYC/AML', 'accredited investors', 'offering exemptions']
    },
    'fractional ownership': {
      description: 'Fractional ownership is a method where multiple investors share ownership of a high-value asset, such as real estate. Tokenization enables fractional ownership by dividing property rights into small, affordable units represented by digital tokens.',
      examples: [
        'A $1M vacation home divided into 1,000 tokens worth $1,000 each',
        'Multiple investors owning shares of a commercial building through tokens',
        'A collective of token holders sharing ownership and income from a rental property'
      ],
      related: ['real estate tokenization', 'liquidity', 'diversification']
    },
    'liquidity': {
      description: 'Liquidity refers to the ease with which an asset can be converted to cash without affecting its market price. Tokenization aims to increase real estate liquidity by enabling fractional ownership and secondary market trading of property tokens.',
      examples: [
        'Trading real estate tokens on a security token exchange',
        'Selling a portion of property ownership without selling the entire asset',
        'Accessing property equity without refinancing or selling'
      ],
      related: ['secondary markets', 'token exchanges', 'market depth']
    }
  },
  faq: {
    'What is real estate tokenization?': {
      answer: 'Real estate tokenization is the process of converting ownership rights in a property into digital tokens on a blockchain. These tokens represent fractional ownership in the underlying real estate asset, allowing for smaller investment amounts, increased liquidity, and programmable features like automated income distribution.',
      relatedQuestions: [
        'What are the benefits of tokenizing real estate?',
        'How does blockchain apply to real estate?'
      ]
    },
    'Is real estate tokenization legal?': {
      answer: 'Yes, real estate tokenization is legal in most jurisdictions, but it must comply with applicable securities laws, property laws, and financial regulations. Since real estate tokens typically qualify as securities, they must follow the securities laws of each jurisdiction where they are offered or sold. This often means registering the offering or qualifying for an exemption, implementing KYC/AML procedures, and adhering to transfer restrictions.',
      relatedQuestions: [
        'What regulations apply to tokenized real estate?',
        'Do I need SEC approval to tokenize my property?'
      ]
    },
    'How much does it cost to tokenize a property?': {
      answer: 'The cost of tokenizing a property typically ranges from $30,000 to $150,000 for initial setup, depending on the complexity of the structure, the jurisdiction, and the specific requirements. Key cost components include legal structuring ($5,000-$20,000), securities compliance ($10,000-$50,000), smart contract development ($15,000-$40,000), and platform integration ($5,000-$25,000). Ongoing annual costs for compliance, management, and platform fees can range from $8,000 to $25,000 or more.',
      relatedQuestions: [
        'Is tokenization cost-effective for smaller properties?',
        'What are the ongoing costs of maintaining a tokenized property?'
      ]
    },
    'What is the process for tokenizing a property?': {
      answer: 'The process for tokenizing a property typically involves: 1) Legal structure setup (creating an SPV or LLC to hold the property), 2) Regulatory compliance planning (choosing the right exemption or registration path), 3) Token design and smart contract development, 4) Property transfer to the legal entity, 5) Marketing and investor documents preparation, 6) Token issuance and distribution to investors, and 7) Ongoing management and compliance. The timeline usually ranges from 4-12 months depending on regulatory approach and property complexity.',
      relatedQuestions: [
        'How long does tokenization take?',
        'What legal entities are needed for tokenization?'
      ]
    },
    'Which properties are best suited for tokenization?': {
      answer: 'Properties best suited for tokenization typically have: 1) Clear income generation potential (e.g., rental income), 2) Stable or growing value, 3) Minimal debt or lender approval for tokenization, 4) Sufficient value to justify tokenization costs (typically $1M+), 5) Appeal to a broader investor base, and 6) Low regulatory complications. Commercial properties, multi-family residential, and premium real estate in desirable locations often make good candidates. Single-family residential with strong rental income can also work well.',
      relatedQuestions: [
        'Can I tokenize my personal residence?',
        'What types of commercial properties tokenize best?'
      ]
    }
  },
  regulations: {
    'United Kingdom': {
      overview: 'The UK has a comprehensive regulatory framework for real estate tokenization under FCA oversight.',
      keyPoints: [
        'Security tokens subject to FCA regulation',
        'Prospectus required for offerings over £5M',
        'Digital property rights recognized by law',
        'No SDLT on secondary token trading'
      ],
      taxConsiderations: [
        'Income tax on rental income (20-45%)',
        'Corporation tax at 25% for companies',
        'Capital gains tax at 20% for higher rate taxpayers'
      ]
    },
    'United States': {
      overview: 'US regulation primarily through SEC with state-level considerations.',
      keyPoints: [
        'Securities registration required unless exempt',
        'Regulation D common for private placements',
        'State "blue sky" laws apply',
        'FinCEN compliance required'
      ],
      taxConsiderations: [
        'Federal income tax applies',
        'State and local tax variations',
        'Capital gains treatment possible'
      ]
    },
    'European Union': {
      overview: 'MiCA regulation provides EU-wide framework for crypto-assets.',
      keyPoints: [
        'Harmonized rules across EU member states',
        'White paper requirement for offerings',
        'CASP authorization needed',
        'ESG considerations mandatory'
      ],
      taxConsiderations: [
        'VAT implications vary by country',
        'Withholding tax considerations',
        'Cross-border tax treaties apply'
      ]
    }
  }
};

export default tokenizationKnowledge;