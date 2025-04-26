const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  try {
    // Extract parameters
    const { propertyType, location } = JSON.parse(event.body || '{}');
    
    if (!propertyType || !location) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Property type and location are required" })
      };
    }
    
    // Get data from Supabase
    const { data: cachedData, error } = await supabase
      .from('market_data')
      .select('data, updated_at')
      .eq('location', location)
      .eq('property_type', propertyType)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching from Supabase:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch cached data" })
      };
    }
    
    // Check if we have cached data and if it's recent enough (within 24 hours)
    if (cachedData) {
      const lastUpdated = new Date(cachedData.updated_at);
      const now = new Date();
      const hoursAgo = (now - lastUpdated) / (1000 * 60 * 60);
      
      if (hoursAgo <= 24) {
        // Return cached data if it's fresh enough
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...cachedData.data,
            fromCache: true,
            cacheAge: Math.round(hoursAgo)
          })
        };
      }
    }
    
    // If no valid cached data, fetch fresh data by calling our other function
    // We use Netlify's internal fetch method to call our other function
    const response = await fetch(`${process.env.URL}/.netlify/functions/fetch-market-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ propertyType, location })
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching fresh data: ${response.statusText}`);
    }
    
    const freshData = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...freshData,
        fromCache: false
      })
    };
  } catch (error) {
    console.error("Error in get-live-data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};