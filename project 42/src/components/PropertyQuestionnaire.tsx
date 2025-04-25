import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, FileText, Building2, ArrowRight, Info } from 'lucide-react';
import { generateFullReport } from '../utils/ReportGenerator';
import TokenizationReport from './TokenizationReport';

interface QuestionnaireStep {
  title: string;
  description: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'radio' | 'checkbox' | 'textarea';
  options?: string[];
  required?: boolean;
  placeholder?: string;
  validation?: (value: any) => boolean;
  errorMessage?: string;
  condition?: {
    field: string;
    value: any;
  };
  hasRange?: boolean;
  rangeOptions?: string[];
  dynamicOptions?: (formData: any) => string[];
  helpText?: string;
  recommendation?: (value: any) => string;
}

const getPropertyTypeQuestions = (propertyType: string): FormField[] => {
  const baseQuestions = [
    {
      id: "propertyDetails.condition",
      label: "Current property condition",
      type: "select",
      options: [
        "Excellent",
        "Good",
        "Fair",
        "Needs Renovation"
      ],
      required: true,
      helpText: "Overall condition of the property"
    }
  ];

  const typeSpecificQuestions: Record<string, FormField[]> = {
    'Commercial office': [
      {
        id: "propertyDetails.officeType",
        label: "Office building class",
        type: "select",
        options: ["Class A", "Class B", "Class C"],
        required: true,
        helpText: "Building classification based on quality and amenities"
      },
      {
        id: "propertyDetails.tenantMix",
        label: "Current tenant mix",
        type: "select",
        options: [
          "Single tenant",
          "Multiple corporate tenants",
          "Mixed tenants",
          "Government tenants",
          "Vacant"
        ],
        required: true
      }
    ],
    'Multi-family residential': [
      {
        id: "propertyDetails.unitCount",
        label: "Number of units",
        type: "select",
        options: [
          "Under 10 units",
          "10-50 units",
          "51-100 units",
          "101-250 units",
          "Over 250 units"
        ],
        required: true
      },
      {
        id: "propertyDetails.unitMix",
        label: "Unit mix",
        type: "select",
        options: [
          "Studio/1-bedroom dominant",
          "2-bedroom dominant",
          "3+ bedroom dominant",
          "Mixed unit types"
        ],
        required: true
      }
    ],
    'Retail space': [
      {
        id: "propertyDetails.retailType",
        label: "Retail property type",
        type: "select",
        options: [
          "Shopping center",
          "Strip mall",
          "Single tenant",
          "Mixed-use retail",
          "High street retail"
        ],
        required: true
      },
      {
        id: "propertyDetails.anchorTenant",
        label: "Anchor tenant status",
        type: "select",
        options: [
          "Has anchor tenant",
          "Multiple anchor tenants",
          "No anchor tenant",
          "Not applicable"
        ],
        required: true
      }
    ],
    'Industrial': [
      {
        id: "propertyDetails.industrialType",
        label: "Industrial property type",
        type: "select",
        options: [
          "Warehouse/Distribution",
          "Manufacturing",
          "Flex space",
          "Research & Development",
          "Cold storage"
        ],
        required: true
      },
      {
        id: "propertyDetails.clearHeight",
        label: "Clear height",
        type: "select",
        options: [
          "Under 20 feet",
          "20-30 feet",
          "31-40 feet",
          "Over 40 feet"
        ],
        required: false
      }
    ]
  };

  return [...baseQuestions, ...(typeSpecificQuestions[propertyType] || [])];
};

const getLocationQuestions = (jurisdiction: string): FormField[] => {
  const baseQuestions = [
    {
      id: "locationDetails.zoning",
      label: "Current zoning",
      type: "select",
      options: [
        "Commercial",
        "Residential",
        "Mixed Use",
        "Industrial",
        "Special Economic Zone",
        "Other"
      ],
      required: true
    },
    {
      id: "locationDetails.neighborhoodTrend",
      label: "Neighborhood trend",
      type: "select",
      options: [
        "Rapidly Improving",
        "Stable and Desirable",
        "Stable",
        "Declining",
        "Undergoing Redevelopment"
      ],
      required: true
    },
    {
      id: "locationDetails.proximityToTransit",
      label: "Proximity to public transit",
      type: "select",
      options: [
        "Less than 0.5 km",
        "0.5-1 km",
        "1-2 km",
        "2-5 km",
        "Over 5 km"
      ],
      required: false
    }
  ];

  const jurisdictionSpecificQuestions: Record<string, FormField[]> = {
    'United Kingdom': [
      {
        id: "locationDetails.floodRisk",
        label: "Flood risk assessment",
        type: "select",
        options: [
          "Very low risk",
          "Low risk",
          "Medium risk",
          "High risk"
        ],
        required: true
      }
    ],
    'United States': [
      {
        id: "locationDetails.opportunityZone",
        label: "Opportunity Zone status",
        type: "select",
        options: [
          "Located in Opportunity Zone",
          "Not in Opportunity Zone",
          "Not sure"
        ],
        required: true
      },
      {
        id: "locationDetails.naturalDisasterRisk",
        label: "Natural disaster risk assessment",
        type: "select",
        options: [
          "Low risk area",
          "Moderate risk area",
          "High risk area",
          "Not assessed"
        ],
        required: true
      }
    ],
    'European Union': [
      {
        id: "locationDetails.sustainabilityCertification",
        label: "Sustainability certification",
        type: "select",
        options: [
          "BREEAM",
          "LEED",
          "DGNB",
          "HQE",
          "None",
          "Other"
        ],
        required: false
      }
    ]
  };

  return [...baseQuestions, ...(jurisdictionSpecificQuestions[jurisdiction] || [])];
};

const steps: QuestionnaireStep[] = [
  {
    title: "Basic Property Details",
    description: "Let's start with the fundamental information about your property",
    fields: [
      {
        id: "propertyBasics.propertyType",
        label: "Property type",
        type: "select",
        options: [
          "Single-family residential",
          "Multi-family residential",
          "Commercial office",
          "Retail space",
          "Industrial",
          "Mixed-use",
          "Vacant land",
          "Hotel/Resort",
          "Student housing",
          "Senior living",
          "Self-storage",
          "Data center",
          "Healthcare facility",
          "Other"
        ],
        required: true,
        helpText: "This will determine specific questions and tokenization recommendations"
      },
      {
        id: "propertyBasics.location.jurisdiction",
        label: "Jurisdiction/Country",
        type: "select",
        options: [
          "United Kingdom",
          "United States",
          "European Union",
          "Asia Pacific",
          "Middle East",
          "Other"
        ],
        required: true,
        helpText: "This will determine applicable regulations and market analysis"
      },
      {
        id: "propertyBasics.location.areaType",
        label: "Area type",
        type: "select",
        options: [
          "Urban core (City Center/Downtown)",
          "Urban fringe (Edge of City/Inner Suburbs)",
          "Suburban prime (Established Suburban Areas)",
          "Suburban secondary (Developing Suburban Areas)",
          "Rural developed (Towns/Villages)",
          "Rural undeveloped (Countryside/Agricultural Areas)"
        ],
        required: true
      },
      {
        id: "propertyBasics.propertyAge",
        label: "Age of property (years)",
        type: "select",
        options: [
          "New construction",
          "1-5 years",
          "6-10 years",
          "11-20 years",
          "21-50 years",
          "50+ years"
        ],
        required: true
      },
      {
        id: "propertyBasics.totalArea",
        label: "Total area (sq ft/sq m)",
        type: "select",
        options: [
          "Under 1,000",
          "1,000-2,500",
          "2,501-5,000",
          "5,001-10,000",
          "10,001-25,000",
          "25,001-50,000",
          "50,001+"
        ],
        required: true
      },
      {
        id: "propertyBasics.occupancyStatus",
        label: "Current occupancy status",
        type: "select",
        options: [
          "Fully occupied",
          "Partially occupied (75%+)",
          "Partially occupied (50-75%)",
          "Partially occupied (<50%)",
          "Vacant",
          "Under renovation",
          "Pre-leasing"
        ],
        required: true
      },
      {
        id: "propertyBasics.recentRenovations",
        label: "Recent major renovations",
        type: "select",
        options: [
          "Within last year",
          "1-3 years ago",
          "3-5 years ago",
          "5-10 years ago",
          "Over 10 years ago",
          "No major renovations"
        ],
        required: false,
        helpText: "Most recent significant property improvements"
      }
    ]
  },
  {
    title: "Property Specific Details",
    description: "Let's gather specific information about your property type",
    fields: []
  },
  {
    title: "Location Specific Details",
    description: "Information specific to your property's location",
    fields: []
  },
  {
    title: "Valuation and Financial Details",
    description: "Information about the property's value and financial performance",
    fields: [
      {
        id: "propertyBasics.valuation.currentValue",
        label: "Current estimated market value ($)",
        type: "text",
        required: true,
        validation: (value) => value > 0,
        errorMessage: "Please enter a valid property value",
        placeholder: "Enter the current market value",
        helpText: "Recent professional appraisal value or best estimate"
      },
      {
        id: "propertyBasics.valuation.lastAppraisalDate",
        label: "Last professional appraisal date",
        type: "select",
        options: [
          "Within last 3 months",
          "3-6 months ago",
          "6-12 months ago",
          "1-2 years ago",
          "Over 2 years ago",
          "Never appraised",
          "Not sure"
        ],
        required: true
      },
      {
        id: "financialMetrics.mortgages.hasMortgage",
        label: "Does the property have any mortgages?",
        type: "select",
        options: ["Yes", "No"],
        required: true,
        helpText: "Include all mortgages and liens on the property"
      },
      {
        id: "financialMetrics.mortgages.mortgageCount",
        label: "Number of mortgages",
        type: "select",
        options: ["1", "2", "3 or more"],
        required: true,
        condition: {
          field: "financialMetrics.mortgages.hasMortgage",
          value: "Yes"
        }
      },
      {
        id: "financialMetrics.mortgages.totalBalance",
        label: "Total mortgage balance ($)",
        type: "text",
        required: true,
        condition: {
          field: "financialMetrics.mortgages.hasMortgage",
          value: "Yes"
        },
        validation: (value) => value >= 0,
        errorMessage: "Please enter valid total mortgage balance",
        placeholder: "Enter total remaining mortgage balance",
        helpText: "Combined balance of all mortgages"
      },
      {
        id: "financialMetrics.mortgages.avgInterestRate",
        label: "Average interest rate (%)",
        type: "number",
        required: true,
        condition: {
          field: "financialMetrics.mortgages.hasMortgage",
          value: "Yes"
        },
        validation: (value) => value >= 0 && value <= 100,
        errorMessage: "Please enter valid interest rate",
        placeholder: "Enter weighted average interest rate",
        helpText: "Weighted average interest rate across all mortgages"
      },
      {
        id: "financialMetrics.mortgages.monthlyPayment",
        label: "Total monthly mortgage payment ($)",
        type: "text",
        required: true,
        condition: {
          field: "financialMetrics.mortgages.hasMortgage",
          value: "Yes"
        },
        validation: (value) => value >= 0,
        errorMessage: "Please enter valid monthly payment amount",
        placeholder: "Enter total monthly payment",
        helpText: "Combined monthly payment for all mortgages"
      },
      {
        id: "financialMetrics.mortgages.type",
        label: "Predominant mortgage type",
        type: "select",
        options: [
          "Fixed rate",
          "Adjustable rate (ARM)",
          "Interest only",
          "Balloon payment",
          "Mixed types",
          "Other"
        ],
        required: true,
        condition: {
          field: "financialMetrics.mortgages.hasMortgage",
          value: "Yes"
        }
      },
      {
        id: "financialMetrics.otherDebt.hasOtherDebt",
        label: "Does the property have any other debt?",
        type: "select",
        options: ["Yes", "No"],
        required: true,
        helpText: "Include construction loans, mezzanine debt, etc."
      },
      {
        id: "financialMetrics.otherDebt.totalAmount",
        label: "Total other debt ($)",
        type: "text",
        required: true,
        condition: {
          field: "financialMetrics.otherDebt.hasOtherDebt",
          value: "Yes"
        },
        validation: (value) => value >= 0,
        errorMessage: "Please enter valid debt amount",
        placeholder: "Enter total other debt",
        helpText: "Total of all non-mortgage debt"
      },
      {
        id: "financialMetrics.otherDebt.type",
        label: "Type of other debt",
        type: "select",
        options: [
          "Construction loan",
          "Mezzanine debt",
          "Line of credit",
          "Personal loan",
          "Other"
        ],
        required: true,
        condition: {
          field: "financialMetrics.otherDebt.hasOtherDebt",
          value: "Yes"
        }
      },
      {
        id: "financialMetrics.annualOperatingExpenses",
        label: "Annual Operating Expenses ($)",
        type: "text",
        required: true,
        validation: (value) => value >= 0,
        errorMessage: "Please enter valid annual operating expenses",
        placeholder: "Enter annual operating expenses",
        helpText: "Include maintenance, utilities, insurance, property tax, etc."
      },
      {
        id: "financialMetrics.incomeGeneration.currentlyGeneratingIncome",
        label: "Is the property currently generating income?",
        type: "select",
        options: ["Yes", "No"],
        required: true,
        helpText: "Indicate if the property is currently producing rental or other income"
      },
      {
        id: "financialMetrics.incomeGeneration.monthlyGrossIncome",
        label: "Current / Expected Monthly Income ($)",
        type: "text",
        required: true,
        condition: {
          field: "financialMetrics.incomeGeneration.currentlyGeneratingIncome",
          value: "Yes"
        },
        validation: (value) => value === "Not Sure" || value === "None" || (parseFloat(value) >= 0),
        errorMessage: "Please enter a valid amount, 'Not Sure', or 'None'",
        placeholder: "Enter monthly income, 'Not Sure', or 'None'",
        helpText: "Gross monthly income before expenses"
      },
      {
        id: "financialMetrics.incomeGeneration.occupancyRate",
        label: "Current Occupancy Rate (%)",
        type: "number",
        required: true,
        condition: {
          field: "financialMetrics.incomeGeneration.currentlyGeneratingIncome",
          value: "Yes"
        },
        validation: (value) => value >= 0 && value <= 100,
        errorMessage: "Please enter a percentage between 0 and 100",
        placeholder: "Enter current occupancy rate",
        helpText: "Current percentage of property that is occupied/leased"
      }
    ]
  },
  {
    title: "Tokenization Goals",
    description: "Your objectives and preferences for tokenizing this property",
    fields: [
      {
        id: "tokenizationGoals.tokenizationPercentage",
        label: "Percentage of property to tokenize (%)",
        type: "number",
        required: true,
        validation: (value) => value > 0 && value <= 100,
        errorMessage: "Please enter a percentage between 1 and 100",
        placeholder: "Enter percentage to tokenize"
      },
      {
        id: "tokenizationGoals.timeframe",
        label: "Desired timeframe for tokenization",
        type: "select",
        options: [
          "Immediate (1-3 months)",
          "Short-term (3-6 months)",
          "Medium-term (6-12 months)",
          "Long-term (12+ months)",
          "Not sure"
        ],
        required: true
      },
      {
        id: "tokenizationGoals.expectedAppreciation",
        label: "Expected Annual Property Appreciation (%)",
        type: "select",
        options: [
          "Less than 1%",
          "1-2%",
          "3-5%",
          "6-8%",
          "9-12%",
          "More than 12%",
          "Not sure"
        ],
        required: false,
        helpText: "Your estimate of annual property value growth"
      },
      {
        id: "tokenizationGoals.holdingPeriod",
        label: "Expected Holding Period (Years)",
        type: "select",
        options: [
          "Less than 1 year",
          "1-3 years",
          "4-5 years",
          "6-10 years",
          "More than 10 years",
          "Not sure"
        ],
        required: false,
        helpText: "How long you plan to hold the property before selling"
      },
      {
        id: "tokenizationGoals.additionalInfo",
        label: "Additional Information or Questions",
        type: "textarea",
        required: false,
        placeholder: "Share any additional details or specific questions for AI-enhanced analysis",
        helpText: "This information will be used to personalize your AI-generated report"
      }
    ]
  }
];

function PropertyQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const getDynamicSteps = () => {
    const propertyType = formData?.propertyBasics?.propertyType;
    const jurisdiction = formData?.propertyBasics?.location?.jurisdiction;
    
    const updatedSteps = [...steps];
    
    if (propertyType) {
      updatedSteps[1].fields = getPropertyTypeQuestions(propertyType);
    }
    
    if (jurisdiction) {
      updatedSteps[2].fields = getLocationQuestions(jurisdiction);
    }

    return updatedSteps;
  };

  const handleInputChange = (fieldId: string, value: any) => {
    if (fieldId === "propertyBasics.valuation.currentValue") {
      const numericValue = value.toString().replace(/[^\d.]/g, '');
      const parts = numericValue.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      } else {
        value = numericValue;
      }
      value = value ? parseFloat(value) : '';
    }

    setFormData(prev => {
      const parts = fieldId.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      
      return newData;
    });

    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const currentFields = getDynamicSteps()[currentStep].fields;
    const newErrors: Record<string, string> = {};

    currentFields.forEach(field => {
      if (field.condition) {
        const conditionValue = getNestedValue(formData, field.condition.field);
        if (conditionValue !== field.condition.value) return;
      }

      const value = getNestedValue(formData, field.id);

      if (field.required && !value) {
        newErrors[field.id] = `${field.label} is required`;
      } else if (field.validation && value && value !== "Not sure" && typeof value === 'number') {
        const isValid = field.validation(value);
        if (!isValid) {
          newErrors[field.id] = field.errorMessage || 'Invalid value';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, getDynamicSteps().length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const generatedReport = generateFullReport(formData);
      const additionalInfo = formData?.tokenizationGoals?.additionalInfo || "";
      setReport(generatedReport);
      setShowReport(true);
      setAdditionalInfo(additionalInfo);
    }
  };

  const renderField = (field: FormField) => {
    if (field.condition) {
      const conditionValue = getNestedValue(formData, field.condition.field);
      if (conditionValue !== field.condition.value) {
        return null;
      }
    }

    const value = getNestedValue(formData, field.id) || '';

    return (
      <>
        {renderFieldInput(field, value)}
        {field.helpText && (
          <p className="mt-1 text-xs sm:text-sm text-gray-500">{field.helpText}</p>
        )}
        {field.recommendation && value && (
          <p className="mt-1 text-sm text-blue-600">{field.recommendation(value)}</p>
        )}
      </>
    );
  };

  const renderFieldInput = (field: FormField, value: any) => {
    const options = field.dynamicOptions ? field.dynamicOptions(formData) : field.options;

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            value={field.id === "propertyBasics.valuation.currentValue" ? 
              value.toLocaleString('en-US', { maximumFractionDigits: 2 }) : 
              value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'number':
      case 'date':
        return (
          <input
            type={field.type}
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, field.type === 'number' ? parseFloat(e.target.value) : e.target.value)}
            placeholder={field.placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select an option</option>
            {options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'checkbox':
        const selectedOptions = Array.isArray(value) ? value : [];
        return (
          <div className="mt-1 space-y-2">
            {options?.map(option => (
              <label key={option} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...selectedOptions, option]
                      : selectedOptions.filter(item => item !== option);
                    handleInputChange(field.id, newValue);
                  }}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (showReport && report) {
    return <TokenizationReport responses={formData} additionalInfo={additionalInfo} />;
  }

  const currentSteps = getDynamicSteps();

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Important: Jurisdiction Availability
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Currently, our questionnaire and analysis are optimized for properties located in the United Kingdom, United States, European Union, Asia Pacific, and Middle East regions. If your property is in another jurisdiction, you can still complete the questionnaire, but some regulatory and location-specific recommendations may be limited.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="w-full bg-gray-200 h-2">
            <div
              className="bg-indigo-600 h-2 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / currentSteps.length) * 100}%` }}
            />
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {currentSteps[currentStep].title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                {currentSteps[currentStep].description}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {currentSteps[currentStep].fields.map(field => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {renderField(field)}
                  {errors[field.id] && (
                    <p className="text-red-500 text-xs sm:text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors[field.id]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center justify-center px-4 py-2 rounded-lg w-full sm:w-auto ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous
              </button>

              {currentStep === currentSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full sm:w-auto"
                >
                  <FileText className="h-5 w-5 mr-1" />
                  Generate Report
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full sm:w-auto"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyQuestionnaire;