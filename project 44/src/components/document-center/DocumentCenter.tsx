import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Search, Filter, X, Calendar, Clock, Tag, FileText, Download, Eye, AlertTriangle, Info } from 'lucide-react';
import { marked } from 'marked';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Initialize marked with options
marked.use({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

// Document content templates
const documentTemplates = {
  tpaTemplate: `# Token Purchase Agreement Template

## 1. Introduction

This Token Purchase Agreement (the "Agreement") is made between [Company Name] ("Issuer") and the purchaser ("Purchaser") of digital tokens representing fractional ownership in real estate assets.

## 2. Token Details

### 2.1 Token Description
- Token Name: [Property Name] Tokens
- Token Symbol: [Symbol]
- Smart Contract Address: [Address]
- Blockchain Network: [Network]

### 2.2 Rights Represented
Each token represents:
- Fractional ownership of the underlying property
- Right to receive proportional distributions
- Voting rights on major decisions

## 3. Purchase Terms

### 3.1 Token Price
- Price per token: [Amount]
- Minimum purchase: [Amount]
- Maximum purchase: [Amount]

### 3.2 Payment Terms
- Accepted currencies
- Payment process
- Confirmation requirements

## 4. Legal Framework

### 4.1 Regulatory Compliance
- Securities laws applicability
- KYC/AML requirements
- Transfer restrictions

### 4.2 Representations and Warranties
- Issuer representations
- Purchaser representations
- Compliance obligations

## 5. Risk Factors

### 5.1 Investment Risks
- Market risks
- Technical risks
- Regulatory risks
- Property-specific risks

## 6. Additional Terms

### 6.1 Governing Law
This Agreement shall be governed by the laws of [Jurisdiction].

### 6.2 Dispute Resolution
Any disputes shall be resolved through [Resolution Method].

## 7. Signatures

- Issuer: _______________
- Purchaser: _______________
- Date: _______________`,

  stoChecklist: `# Security Token Offering Checklist

## 1. Pre-Offering Requirements

### 1.1 Legal Structure
- [ ] Establish appropriate legal entity
- [ ] Confirm jurisdiction selection
- [ ] Prepare corporate documents

### 1.2 Property Documentation
- [ ] Title verification
- [ ] Property valuation
- [ ] Environmental assessment
- [ ] Technical due diligence

### 1.3 Regulatory Compliance
- [ ] Securities registration/exemption
- [ ] KYC/AML procedures
- [ ] Investment restrictions
- [ ] Cross-border considerations

## 2. Token Structure

### 2.1 Technical Requirements
\`\`\`solidity
contract PropertyToken is ERC20, Ownable {
    string public propertyId;
    uint256 public totalTokens;
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        string memory _propertyId
    ) ERC20(_name, _symbol) {
        propertyId = _propertyId;
        totalTokens = _totalSupply;
        _mint(msg.sender, _totalSupply);
    }
    
    // Additional functionality...
}
\`\`\`

### 2.2 Token Economics
- [ ] Total supply calculation
- [ ] Token price determination
- [ ] Distribution mechanism
- [ ] Vesting schedules`,

  kycProcedures: `# KYC/AML Procedures Guide

## 1. KYC Requirements

### 1.1 Individual Investors
- Government-issued ID
- Proof of address
- Source of funds declaration
- Tax identification number

### 1.2 Corporate Investors
- Company registration
- Corporate structure
- Ultimate beneficial owners
- Board resolutions

## 2. AML Procedures

### 2.1 Risk Assessment
- Investor risk profiling
- Transaction monitoring
- Red flag indicators
- Reporting procedures

### 2.2 Monitoring Requirements
- Transaction thresholds
- Suspicious activity detection
- Ongoing monitoring
- Periodic reviews`,

  smartContractSpec: `# Smart Contract Specifications

## 1. Contract Architecture

### 1.1 Core Contracts

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract PropertyToken is ERC20, Ownable, Pausable, ERC20Votes {
    struct PropertyDetails {
        string propertyId;
        string location;
        uint256 totalValue;
        uint256 tokenizedPercentage;
    }
    
    PropertyDetails public property;
    mapping(address => bool) public whitelist;
    uint256 public constant MIN_INVESTMENT = 1000;
    
    event PropertyUpdated(string propertyId, uint256 totalValue);
    event InvestorWhitelisted(address investor, bool status);
    
    constructor(
        string memory _name,
        string memory _symbol,
        PropertyDetails memory _property
    ) ERC20(_name, _symbol) ERC20Permit(_name) {
        property = _property;
        _mint(msg.sender, property.totalValue * property.tokenizedPercentage / 100);
    }
    
    function whitelistInvestor(address investor, bool status) external onlyOwner {
        whitelist[investor] = status;
        emit InvestorWhitelisted(investor, status);
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(whitelist[msg.sender] && whitelist[to], "Transfer restricted to whitelisted addresses");
        require(amount >= MIN_INVESTMENT, "Amount below minimum investment");
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(whitelist[from] && whitelist[to], "Transfer restricted to whitelisted addresses");
        require(amount >= MIN_INVESTMENT, "Amount below minimum investment");
        return super.transferFrom(from, to, amount);
    }
    
    function updateProperty(string memory _propertyId, uint256 _totalValue) external onlyOwner {
        property.propertyId = _propertyId;
        property.totalValue = _totalValue;
        emit PropertyUpdated(_propertyId, _totalValue);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
\`\`\`

## 2. Security Features

### 2.1 Access Control
- Owner-only functions
- Whitelist management
- Transfer restrictions

### 2.2 Safety Mechanisms
- Pausable functionality
- Minimum investment limits
- Emergency procedures`
};

// Document data structure
const documents = {
  legal: [
    {
      id: 'tpa-template',
      name: 'Token Purchase Agreement Template (EXAMPLE)',
      type: 'PDF',
      size: '245 KB',
      access: 'free',
      category: 'Legal',
      lastUpdated: '2024-03-15',
      description: 'EXAMPLE TEMPLATE ONLY - NOT FOR ACTUAL USE. A comprehensive template showing typical structure of token purchase agreements.',
      content: `# EXAMPLE DOCUMENT - NOT FOR ACTUAL USE

> **IMPORTANT NOTICE**: This is an EXAMPLE document provided for educational and illustrative purposes only. 
> This template should NOT be used for actual tokenization projects without proper legal review and customization.

${documentTemplates.tpaTemplate}`
    },
    {
      id: 'sto-checklist',
      name: 'Security Token Offering Checklist (EXAMPLE)',
      type: 'PDF',
      size: '180 KB',
      access: 'free',
      category: 'Legal',
      lastUpdated: '2024-03-14',
      description: 'EXAMPLE CHECKLIST ONLY - NOT FOR ACTUAL USE. Sample checklist demonstrating typical requirements for security token offerings.',
      content: `# EXAMPLE DOCUMENT - NOT FOR ACTUAL USE

> **IMPORTANT NOTICE**: This is an EXAMPLE checklist provided for educational and illustrative purposes only. 
> This document should NOT be used for actual tokenization projects without proper legal review and customization.

${documentTemplates.stoChecklist}`
    },
    {
      id: 'kyc-procedures',
      name: 'KYC/AML Procedures (EXAMPLE)',
      type: 'PDF',
      size: '210 KB',
      access: 'free',
      category: 'Compliance',
      lastUpdated: '2024-03-15',
      description: 'EXAMPLE PROCEDURES ONLY - NOT FOR ACTUAL USE. Sample procedures showing typical KYC/AML implementation approaches.',
      content: `# EXAMPLE DOCUMENT - NOT FOR ACTUAL USE

> **IMPORTANT NOTICE**: This is an EXAMPLE document provided for educational and illustrative purposes only. 
> These procedures should NOT be used for actual tokenization projects without proper legal review and customization.

${documentTemplates.kycProcedures}`
    }
  ],
  technical: [
    {
      id: 'smart-contract-spec',
      name: 'Smart Contract Specifications (EXAMPLE)',
      type: 'PDF',
      size: '156 KB',
      access: 'free',
      category: 'Technical',
      lastUpdated: '2024-03-15',
      description: 'EXAMPLE SPECIFICATIONS ONLY - NOT FOR ACTUAL USE. Sample technical specifications showing typical smart contract implementation approaches.',
      content: `# EXAMPLE DOCUMENT - NOT FOR ACTUAL USE

> **IMPORTANT NOTICE**: This is an EXAMPLE specification provided for educational and illustrative purposes only. 
> These specifications should NOT be used for actual tokenization projects without proper technical review and customization.

${documentTemplates.smartContractSpec}`
    }
  ]
};

export default function DocumentCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const categories = ['All', 'Legal', 'Technical', 'Compliance'];

  const filteredDocuments = Object.values(documents)
    .flat()
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                            doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const handleDocumentClick = (doc: any) => {
    setSelectedDocument(doc);
  };

  const handleDownload = async (doc: any) => {
    // Create a temporary div to render the document
    const tempDiv = document.createElement('div');
    tempDiv.className = 'pdf-export bg-white p-8';
    
    // Add styling
    tempDiv.innerHTML = `
      <style>
        .pdf-export {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .pdf-export h1 {
          font-size: 24px;
          color: #1a365d;
          margin-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 8px;
        }
        .pdf-export h2 {
          font-size: 20px;
          color: #2d3748;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        .pdf-export h3 {
          font-size: 18px;
          color: #4a5568;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .pdf-export p {
          margin-bottom: 12px;
          color: #2d3748;
        }
        .pdf-export ul {
          margin-bottom: 12px;
          padding-left: 24px;
        }
        .pdf-export li {
          margin-bottom: 6px;
          color: #2d3748;
        }
        .pdf-export pre {
          background-color: #f7fafc;
          padding: 12px;
          border-radius: 4px;
          overflow-x: auto;
          margin-bottom: 16px;
        }
        .pdf-export code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          color: #2d3748;
        }
        .pdf-export blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 16px;
          margin: 16px 0;
          color: #718096;
        }
        .pdf-header {
          text-align: center;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }
        .pdf-header h1 {
          color: #1a365d;
          margin-bottom: 8px;
          border-bottom: none;
        }
        .pdf-header p {
          color: #718096;
        }
        .pdf-footer {
          margin-top: 32px;
          padding-top: 16px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          color: #718096;
          font-size: 12px;
        }
      </style>
      <div class="pdf-header">
        <h1>${doc.name}</h1>
        <p>Generated by Propnition.com on ${new Date().toLocaleDateString()}</p>
      </div>
      ${marked(doc.content)}
      <div class="pdf-footer">
        <p>This document is provided for educational purposes only.</p>
        <p>© ${new Date().getFullYear()} Propnition.com - All rights reserved</p>
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      // Convert to PDF
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // Save the PDF
      pdf.save(`${doc.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Important Notice Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-amber-800">Example Documents Only</h3>
            <div className="mt-2 text-amber-700">
              <p className="text-sm">
                All documents in this section are provided as <strong>examples only</strong> to illustrate typical structures and content.
                These documents are <strong>not legally binding</strong> and should <strong>not be used for actual tokenization projects</strong> without proper legal and technical review.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Notice */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-6 w-6 text-blue-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              These example documents demonstrate common approaches and considerations in property tokenization.
              Always consult with qualified legal and technical experts for your specific project requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Note */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              Much of this will be completed and managed by the platform you use to tokenize your real estate, however, it's useful to know the information in the documents to better understand the process and make informed decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search example documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
              className={`px-4 py-2 rounded-lg ${
                (category === 'All' && !selectedCategory) || selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                {doc.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Updated: {doc.lastUpdated}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDocumentClick(doc)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Example Document"
                  >
                    <Eye className="h-5 w-5 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download Example Document"
                  >
                    <Download className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedDocument.name}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Updated: {selectedDocument.lastUpdated}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{selectedDocument.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      <span>{selectedDocument.category}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocument(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Example Document Notice */}
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  <strong>Example Document Only:</strong> This document is provided as an example for educational purposes.
                  Do not use this template without proper legal and technical review for your specific project requirements.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-8">
                {/* Description */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">{selectedDocument.description}</p>
                </div>

                {/* Document Content */}
                <div className="bg-white rounded-lg prose prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: marked(selectedDocument.content) }} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>Example {selectedDocument.type}</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Example Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}