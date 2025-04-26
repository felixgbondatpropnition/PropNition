import axios from 'axios';
import { generateReportSection } from './localAI';

// Function to fetch live data
async function fetchLiveData(propertyType, location) {
  try {
    const response = await axios.post('/.netlify/functions/get-live-data', {
      propertyType,
      location
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching live data:", error);
    
    // If we get a 404, we're likely in local development without the Netlify functions deployed
    console.log("Using mock data instead for local development");
    
    // Return mock data that mimics what would come from the Netlify function
    return {
      news: [
        { title: "New regulations for tokenized real estate approved", description: "Regulatory bodies have approved new frameworks.", pubDate: "Mon, 21 Apr 2025", link: "#" },
        { title: "Tokenized properties show 24% higher liquidity", description: "Recent market analysis reveals significant advantages.", pubDate: "Fri, 18 Apr 2025", link: "#" },
        { title: `${propertyType} segment sees growing tokenization adoption`, description: "Industry adoption continues to accelerate.", pubDate: "Wed, 16 Apr 2025", link: "#" },
      ],
      market: {
        capRateRange: propertyType.includes("Commercial") ? "5.0-6.5%" : (propertyType.includes("Residential") ? "4.5-5.5%" : "5.5-7.0%"),
        vacancyRate: propertyType.includes("Commercial") ? "8.5%" : (propertyType.includes("Residential") ? "3.2%" : "6.5%"),
        recentTransactions: [
          { location: location === "United Kingdom" ? "London" : "New York", size: "15,000 sq ft", price: location === "United Kingdom" ? "£12.5M" : "$18.5M" },
          { location: location === "United Kingdom" ? "Manchester" : "Chicago", size: "8,000 sq ft", price: location === "United Kingdom" ? "£4.2M" : "$7.2M" }
        ]
      },
      regulatory: {
        latestUpdate: location === "United Kingdom" 
          ? "January 2025: FCA issues revised guidelines for tokenized real estate investments" 
          : (location === "United States" 
              ? "November 2024: SEC approves new framework for digital asset securities" 
              : "March 2025: MiCA implementation guidelines published for real estate tokens"),
        authority: location === "United Kingdom" 
          ? "Financial Conduct Authority (FCA)" 
          : (location === "United States" 
              ? "Securities and Exchange Commission (SEC)" 
              : "European Securities and Markets Authority (ESMA)"),
        complianceRequirements: [
          "KYC/AML verification for all investors",
          "Quarterly reporting requirements",
          "Maximum 2,000 non-accredited investors per offering",
          "Client money protection requirements"
        ]
      },
      fromMock: true
    };
  }
}

// Main function to generate AI-enhanced report
export async function generateAIReport(formData, additionalInfo = "") {
  // Extract key data from form
  const propertyType = formData?.propertyBasics?.propertyType || 'Commercial property';
  const location = formData?.propertyBasics?.location?.jurisdiction || 'United Kingdom';
  const propertyValue = formData?.propertyBasics?.valuation?.currentValue || 1000000;
  const condition = formData?.propertyDetails?.condition || 'Good';
  const occupancyRate = formData?.propertyDetails?.occupancyRate || 95;
  
  // Prepare property data object
  const propertyData = {
    propertyType,
    location,
    value: propertyValue,
    condition,
    occupancyRate,
    additionalInfo
  };
  
  // Step 1: Fetch live market data
  console.log(`Fetching live data for ${propertyType} in ${location}...`);
  const marketData = await fetchLiveData(propertyType, location);
  console.log("Live data fetched:", marketData);
  
  // Step 2: Generate individual report sections
  console.log("Generating report sections with AI...");
  
  try {
    // Generate sections in parallel for speed
    const [marketAnalysis, regulatoryAnalysis, financialAnalysis, aiAdvice] = await Promise.all([
      generateReportSection("marketAnalysis", propertyData, marketData),
      generateReportSection("regulatoryAnalysis", propertyData, marketData),
      generateReportSection("financialAnalysis", propertyData, marketData),
      generateReportSection("aiAdvice", propertyData, marketData)
    ]);
    
    console.log("Report sections generated");
    
    // Return the complete report data
    return {
      sections: {
        marketAnalysis,
        regulatoryAnalysis,
        financialAnalysis,
        aiAdvice
      },
      marketData,
      timestamp: new Date().toISOString(),
      usingMockData: marketData.fromMock === true
    };
  } catch (error) {
    console.error("Error generating report sections:", error);
    
    // Provide fallback content if AI generation fails
    return {
      sections: {
        marketAnalysis: `The market for ${propertyType} in ${location} shows potential for tokenization with current cap rates around ${marketData.market.capRateRange}.`,
        regulatoryAnalysis: `Tokenizing properties in ${location} requires compliance with regulations set by ${marketData.regulatory.authority}.`,
        financialAnalysis: `This ${propertyType} valued at $${propertyValue.toLocaleString()} could benefit from tokenization through improved liquidity and fractional ownership.`,
        aiAdvice: `Consider engaging with specialized tokenization platforms and legal advisors with experience in ${location}.`
      },
      marketData,
      timestamp: new Date().toISOString(),
      usingFallback: true
    };
  }
}