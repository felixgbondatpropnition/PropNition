import * as transformers from '@xenova/transformers';

// We'll use a small, locally-runnable model for text generation
const MODEL_NAME = 'Xenova/distilgpt2';
let model = null;
let tokenizer = null;
let modelLoadFailed = false;

// Initialize the model (this will download and cache it)
export async function initializeModel() {
  if (modelLoadFailed) {
    console.log("Using fallback mechanism as model previously failed to load");
    return false;
  }

  if (!model || !tokenizer) {
    try {
      console.log("Loading AI model...");
      
      // Load the tokenizer with timeout
      const tokenizerPromise = transformers.AutoTokenizer.from_pretrained(MODEL_NAME);
      tokenizer = await Promise.race([
        tokenizerPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Tokenizer loading timed out")), 15000))
      ]);
      
      // Load the model with timeout
      const modelPromise = transformers.AutoModelForCausalLM.from_pretrained(MODEL_NAME);
      model = await Promise.race([
        modelPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Model loading timed out")), 15000))
      ]);
      
      console.log("AI model loaded successfully");
      return true;
    } catch (error) {
      console.error("Error loading AI model:", error);
      modelLoadFailed = true;
      return false;
    }
  }
  return true;
}

// Generate text based on a prompt
export async function generateText(prompt, maxLength = 200) {
  if (!model || !tokenizer) {
    const initialized = await initializeModel();
    if (!initialized) {
      return useFallbackGeneration(prompt);
    }
  }
  
  try {
    // Tokenize the input
    const inputs = await tokenizer(prompt);
    
    // Generate text
    const output = await model.generate(inputs.input_ids, {
      max_length: maxLength,
      num_return_sequences: 1,
      temperature: 0.7,
      top_p: 0.9
    });
    
    // Decode the output
    const decoded = await tokenizer.decode(output[0], {
      skip_special_tokens: true
    });
    
    // Extract only the newly generated text (not the prompt)
    return decoded.slice(prompt.length);
  } catch (error) {
    console.error("Error generating text:", error);
    return useFallbackGeneration(prompt);
  }
}

// Fallback text generation using templates
function useFallbackGeneration(prompt) {
  console.log("Using fallback text generation for prompt:", prompt);
  
  // Extract key information from the prompt
  const propertyTypeMatch = prompt.match(/for a ([^in]+) in/);
  const propertyType = propertyTypeMatch ? propertyTypeMatch[1].trim() : "property";
  
  const locationMatch = prompt.match(/in ([^\.]+)\./);
  const location = locationMatch ? locationMatch[1].trim() : "this location";
  
  if (prompt.includes("market analysis")) {
    return `The market for ${propertyType} in ${location} currently shows promising dynamics. 

With the current cap rate range and vacancy rates, the sector demonstrates resilience despite broader economic fluctuations.

Recent transactions suggest strong investor appetite, particularly in prime locations. Development pipelines remain controlled, which should support stable growth in values over the medium term.

Based on current trends, tokenization of this asset class is gaining traction due to increased liquidity and accessibility for a broader investor base.`;
  } else if (prompt.includes("regulatory analysis")) {
    return `The regulatory framework for tokenizing ${propertyType} in ${location} is governed by the local financial regulatory authority.

Important compliance considerations include:
- KYC/AML requirements for all token purchasers
- Securities law compliance under relevant local regulations
- Ongoing disclosure requirements post-issuance
- Corporate governance standards for the property-holding entity

We recommend engaging specialist legal counsel with experience in both real estate and digital assets to ensure compliance with all applicable regulations.`;
  } else if (prompt.includes("financial analysis")) {
    return `Financial analysis for this ${propertyType}:

Tokenization financial benefits:
- Potential liquidity premium of 15-20% over traditional ownership
- Reduced transaction costs (estimated 3-5% savings)
- Opportunity for fractional sales without full disposition
- More efficient capital raising through token issuance

Consider implementing a staggered token release strategy to maximize value and manage market absorption.`;
  } else if (prompt.includes("strategic advice")) {
    return `Strategic recommendations for tokenizing your ${propertyType} in ${location}:

1. Structure: We recommend a security token offering structured as equity shares in a Special Purpose Vehicle (SPV) that holds the property.

2. Token Economics: Consider issuing tokens representing 100,000 shares with a minimum purchase of 100 tokens to balance accessibility with administrative efficiency.

3. Platform Selection: Based on your jurisdiction, platforms with strong regulatory compliance in ${location} would be most suitable.

4. Marketing Strategy: Target both institutional investors seeking portfolio diversification and retail investors interested in real estate exposure.

5. Timeline: Implementing full tokenization typically requires 4-6 months from legal structuring through token issuance.`;
  } else {
    return "Based on the information provided, here are some key points to consider for your property tokenization project. The specific details would depend on your property type, location, and other factors.";
  }
}

// Function to generate a specific section of a report
export async function generateReportSection(sectionType, propertyData, marketData) {
  // Create a prompt specific to the section
  let prompt = "";
  
  switch (sectionType) {
    case "marketAnalysis":
      prompt = `Generate a detailed market analysis for a ${propertyData.propertyType} in ${propertyData.location}. 
Current market conditions: Cap Rate Range: ${marketData.market.capRateRange}, Vacancy Rate: ${marketData.market.vacancyRate}.
Recent news: ${marketData.news.map(item => item.title).join('. ')}.
Regulatory updates: ${marketData.regulatory.latestUpdate}.

The market analysis should cover:`;
      break;
    case "regulatoryAnalysis":
      prompt = `Generate a regulatory analysis for tokenizing a ${propertyData.propertyType} in ${propertyData.location}.
Key regulatory authority: ${marketData.regulatory.authority}.
Latest update: ${marketData.regulatory.latestUpdate}.
Compliance requirements: ${marketData.regulatory.complianceRequirements.join(', ')}.

The regulatory analysis should cover:`;
      break;
    case "financialAnalysis":
      prompt = `Generate a financial analysis for a ${propertyData.propertyType} valued at ${propertyData.value} in ${propertyData.location}.
Current market cap rate range: ${marketData.market.capRateRange}.
Property is ${propertyData.condition} condition with ${propertyData.occupancyRate}% occupancy.

The financial analysis should cover:`;
      break;
    case "aiAdvice":
      prompt = `Provide strategic advice for tokenizing a ${propertyData.propertyType} valued at ${propertyData.value} in ${propertyData.location}.
Current market conditions: ${marketData.market.capRateRange} cap rate, ${marketData.market.vacancyRate} vacancy.
Regulatory environment: ${marketData.regulatory.latestUpdate}.
User's additional information: ${propertyData.additionalInfo || "None provided"}.

Advice should include:`;
      break;
    default:
      prompt = `Generate information about ${sectionType} for a ${propertyData.propertyType} in ${propertyData.location}.`;
  }
  
  // Generate the text
  const generatedText = await generateText(prompt, 500); // Limit to ~500 tokens
  
  return generatedText;
}