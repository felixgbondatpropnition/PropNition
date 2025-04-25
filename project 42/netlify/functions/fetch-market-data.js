const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  try {
    // Extract parameters
    const { propertyType, location } = JSON.parse(event.body || '{}');
    
    console.log(`Fetching data for ${propertyType} in ${location}`);
    
    // 1. Collect news from RSS feeds (completely free)
    const newsItems = await fetchNewsItems(propertyType, location);
    
    // 2. Collect market data from public sources
    const marketData = await getPublicMarketData(location, propertyType);
    
    // 3. Collect regulatory updates from public sources
    const regulatoryData = await getPublicRegulatoryData(location);
    
    // Create the response data
    const responseData = {
      news: newsItems.slice(0, 5), // Top 5 most relevant news items
      market: marketData,
      regulatory: regulatoryData,
      lastUpdated: new Date().toISOString()
    };
    
    // Save to Supabase for caching
    await cacheMarketData(location, propertyType, responseData);
    
    // Return the collected data
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(responseData)
    };
  } catch (error) {
    console.error("Error in fetch-market-data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Function to fetch news items
async function fetchNewsItems(propertyType, location) {
  const rssFeeds = {
    'United Kingdom': [
      'https://www.propertywire.com/feed/',
      'https://www.propertyweek.com/cmlink/property-week-news.rss'
    ],
    'United States': [
      'https://therealdeal.com/feed/'
    ],
    'European Union': [
      'https://www.europroperty.com/feed/'
    ],
    // Default feeds if no specific ones are found
    'default': [
      'https://www.propertywire.com/feed/',
      'https://www.propertyweek.com/cmlink/property-week-news.rss'
    ]
  };
  
  // Get the appropriate feeds for the location
  const feeds = rssFeeds[location] || rssFeeds['default'];
  const newsItems = [];
  
  for (const feed of feeds) {
    try {
      const response = await axios.get(feed, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      // Parse XML
      const $ = cheerio.load(response.data, { xmlMode: true });
      
      $('item').each((i, item) => {
        const title = $(item).find('title').text();
        const description = $(item).find('description').text();
        const pubDate = $(item).find('pubDate').text();
        const link = $(item).find('link').text();
        
        // Only include relevant news (containing keywords)
        const lowerPropertyType = propertyType.toLowerCase();
        const lowerTitle = title.toLowerCase();
        const lowerDesc = description.toLowerCase();
        
        if (lowerTitle.includes(lowerPropertyType) || 
            lowerTitle.includes('real estate') ||
            lowerTitle.includes('property') ||
            lowerTitle.includes('tokenization') ||
            lowerDesc.includes(lowerPropertyType) ||
            lowerDesc.includes('tokenization')) {
          newsItems.push({ title, description, pubDate, link });
        }
      });
    } catch (error) {
      console.error(`Error fetching feed ${feed}:`, error);
    }
  }
  
  return newsItems;
}

// Function to get market data
async function getPublicMarketData(location, propertyType) {
  // For demo purposes, using static data based on location and property type
  const marketData = {
    'United Kingdom': {
      'Commercial office': {
        capRateRange: "5.0-6.5%",
        vacancyRate: "8.5%",
        recentTransactions: [
          { location: "Central London", size: "15,000 sq ft", price: "£12.5M" },
          { location: "Manchester", size: "8,000 sq ft", price: "£4.2M" }
        ]
      },
      'Retail space': {
        capRateRange: "6.5-8.0%",
        vacancyRate: "12.5%",
        recentTransactions: [
          { location: "Birmingham", size: "5,000 sq ft", price: "£2.1M" },
          { location: "Leeds", size: "10,000 sq ft", price: "£3.8M" }
        ]
      },
      'Multi-family residential': {
        capRateRange: "4.5-5.5%",
        vacancyRate: "3.2%",
        recentTransactions: [
          { location: "Liverpool", size: "25 units", price: "£5.5M" },
          { location: "Edinburgh", size: "42 units", price: "£9.7M" }
        ]
      }
    },
    'United States': {
      'Commercial office': {
        capRateRange: "5.5-7.0%",
        vacancyRate: "15.2%",
        recentTransactions: [
          { location: "New York", size: "25,000 sq ft", price: "$18.5M" },
          { location: "Chicago", size: "12,000 sq ft", price: "$7.2M" }
        ]
      },
      'Retail space': {
        capRateRange: "7.0-8.5%",
        vacancyRate: "10.8%",
        recentTransactions: [
          { location: "Miami", size: "8,000 sq ft", price: "$4.5M" },
          { location: "Los Angeles", size: "15,000 sq ft", price: "$12.8M" }
        ]
      }
    }
  };
  
  // Return data specific to location and property type, or a general fallback
  if (marketData[location] && marketData[location][propertyType]) {
    return marketData[location][propertyType];
  } else if (marketData[location]) {
    // Return any property type for that location
    return Object.values(marketData[location])[0];
  } else {
    // Default fallback data
    return {
      capRateRange: "5.5-7.5%",
      vacancyRate: "8.5%",
      recentTransactions: [
        { location: "Major City", size: "10,000 sq ft", price: "$5.5M" }
      ]
    };
  }
}

// Function to get regulatory data
async function getPublicRegulatoryData(location) {
  // Static regulatory data by location
  const regulatoryData = {
    'United Kingdom': {
      latestUpdate: "January 2025: FCA issues revised guidelines for tokenized real estate investments",
      authority: "Financial Conduct Authority (FCA)",
      complianceRequirements: [
        "KYC/AML verification for all investors",
        "Quarterly reporting requirements",
        "Maximum 2,000 non-accredited investors per offering",
        "Client money protection requirements"
      ]
    },
    'United States': {
      latestUpdate: "November 2024: SEC approves new framework for digital asset securities",
      authority: "Securities and Exchange Commission (SEC)",
      complianceRequirements: [
        "Regulation D compliance for private offerings",
        "KYC/AML requirements",
        "Accredited investor verification",
        "Custody requirements for digital securities"
      ]
    },
    'European Union': {
      latestUpdate: "March 2025: MiCA implementation guidelines published for real estate tokens",
      authority: "European Securities and Markets Authority (ESMA)",
      complianceRequirements: [
        "Prospectus requirement for offerings above €8 million",
        "KYC/AML compliance under 6AMLD standards",
        "Qualified custodian requirements",
        "Cross-border offering registration"
      ]
    }
  };
  
  return regulatoryData[location] || {
    latestUpdate: "Regulations vary by jurisdiction, consult with a local securities attorney",
    authority: "Local financial regulator",
    complianceRequirements: [
      "KYC/AML verification",
      "Securities offering registration or exemption",
      "Ongoing compliance reporting",
      "Investor qualification requirements"
    ]
  };
}

// Function to cache data in Supabase
async function cacheMarketData(location, propertyType, data) {
  try {
    // First check if a record already exists
    const { data: existingData, error: selectError } = await supabase
      .from('market_data')
      .select('id')
      .eq('location', location)
      .eq('property_type', propertyType)
      .maybeSingle();
    
    if (selectError) {
      console.error("Error checking for existing data:", selectError);
      return;
    }
    
    if (existingData) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('market_data')
        .update({ 
          data: data, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', existingData.id);
      
      if (updateError) {
        console.error("Error updating market data:", updateError);
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from('market_data')
        .insert({ 
          location, 
          property_type: propertyType, 
          data, 
          updated_at: new Date().toISOString() 
        });
      
      if (insertError) {
        console.error("Error inserting market data:", insertError);
      }
    }
  } catch (error) {
    console.error("Error caching market data:", error);
  }
}