const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  try {
    console.log("Starting scheduled update of market data");
    
    // Get list of property types and locations to update
    const { data: existingData, error } = await supabase
      .from('market_data')
      .select('property_type, location')
      .order('updated_at', { ascending: true })
      .limit(10); // Update 10 oldest records
    
    if (error) {
      throw new Error(`Error fetching existing data: ${error.message}`);
    }
    
    // If no data exists yet, seed with some common property types and locations
    const combinations = existingData && existingData.length > 0 ? existingData : [
      { property_type: 'Commercial office', location: 'United Kingdom' },
      { property_type: 'Retail space', location: 'United Kingdom' },
      { property_type: 'Multi-family residential', location: 'United Kingdom' },
      { property_type: 'Commercial office', location: 'United States' },
      { property_type: 'Retail space', location: 'United States' },
      { property_type: 'Commercial office', location: 'European Union' }
    ];
    
    console.log(`Found ${combinations.length} combinations to update`);
    
    // Update each combination
    const results = [];
    
    for (const combo of combinations) {
      try {
        console.log(`Updating data for ${combo.property_type} in ${combo.location}`);
        
        // Call the fetch-market-data function
        const response = await axios.post(`${process.env.URL}/.netlify/functions/fetch-market-data`, {
          propertyType: combo.property_type,
          location: combo.location
        });
        
        results.push({
          combo,
          status: 'success'
        });
        
        // Add a small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 2000));
      } catch (error) {
        console.error(`Error updating ${combo.property_type} in ${combo.location}:`, error);
        results.push({
          combo,
          status: 'error',
          error: error.message
        });
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Scheduled update completed',
        results
      })
    };
  } catch (error) {
    console.error("Error in scheduled update:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};