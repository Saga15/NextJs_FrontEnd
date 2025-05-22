// Common Tags
export const TAGS = {
  ALL: 'all',
  RESEARCH: 'research',
  ANALYSIS: 'analysis',
  MEETING: 'meeting',
  IDEAS: 'ideas',
} as const;

// Tag Labels for UI
export const TAG_LABELS = [
  { id: TAGS.ALL, name: 'All Notes' },
  { id: TAGS.RESEARCH, name: 'Research' },
  { id: TAGS.ANALYSIS, name: 'Analysis' },
  { id: TAGS.MEETING, name: 'Meeting Notes' },
  { id: TAGS.IDEAS, name: 'Investment Ideas' },
];

// Dashboard Metrics Mock Data
export const DASHBOARD_METRICS = {
  portfolio: {
    value: '$2.45M',
    change: '+12.3%',
    status: 'positive'
  },
  activeStrategies: 4,
  pendingMeetings: 3,
  upcomingCalls: 2
};

// Mock Notes Data
export const NOTES_DATA = [
  {
    id: 1,
    title: "Tech Sector Analysis",
    content: "Detailed analysis of current tech sector trends and potential investment opportunities...",
    tags: ["research", "analysis"],
    lastModified: "2024-02-28T15:30:00",
    author: "John Smith",
    important: true,
  },
  {
    id: 2,
    title: "Q4 Earnings Call Notes - Apple",
    content: "Key takeaways from Apple Q4 2023 earnings call discussion...",
    tags: ["meeting", "research"],
    lastModified: "2024-02-25T11:20:00",
    author: "Sarah Johnson",
    important: false,
  },
  {
    id: 3,
    title: "Emerging Markets Investment Thesis",
    content: "Analysis and investment thesis for emerging markets opportunities...",
    tags: ["ideas", "analysis"],
    lastModified: "2024-02-22T09:45:00",
    author: "Michael Brown",
    important: true,
  },
  {
    id: 4,
    title: "ESG Investment Opportunities",
    content: "Research on ESG-focused investment opportunities and market trends...",
    tags: ["research", "ideas"],
    lastModified: "2024-02-20T14:15:00",
    author: "Emma Davis",
    important: false,
  },
]; 
export const tableData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "User" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Admin" },
  { id: 6, name: "Eva Adams", email: "eva@example.com", role: "Editor" },
  { id: 7, name: "Michael Scott", email: "michael@example.com", role: "User" },
  { id: 8, name: "Dwight Schrute", email: "dwight@example.com", role: "Admin" },
  { id: 9, name: "Jim Halpert", email: "jim@example.com", role: "Editor" },
];


   // Dummy data for charts
  export const chartData1 = [
    { time: "2024-02-01", value: 100 },
    { time: "2024-02-02", value: 105 },
    { time: "2024-02-03", value: 102 },
    { time: "2024-02-04", value: 110 },
  ];

  export const chartData2 = [
    { time: "2024-02-01", value: 90 },
    { time: "2024-02-02", value: 95 },
    { time: "2024-02-03", value: 93 },
    { time: "2024-02-04", value: 98 },
    { time: "2024-02-05", value: 100 },
    { time: "2024-02-06", value: 105 },
    { time: "2024-02-07", value: 110 },
    { time: "2024-02-08", value: 115 },
    { time: "2024-02-09", value: 120 },
    { time: "2024-02-10", value: 125 },
    

  ];

  export const chartData3 = [
    { time: "2024-02-01", value: 120 },
    { time: "2024-02-02", value: 125 },
    { time: "2024-02-03", value: 128 },
    { time: "2024-02-04", value: 130 },
  ];

  export const chartData4 = [
    { time: "2024-02-01", value: 170 },
    { time: "2024-02-02", value: 75 },
    { time: "2024-02-03", value: 78 },
    { time: "2024-02-04", value: 80 },
  ];


  export const candlestickData = [
    { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
    { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
    { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
    { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
    { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
    { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
];


export const QuarterlyColumns = [
  { id: "year", label: "Year" },
  { id: "q1", label: "Q1" },
  { id: "q2", label: "Q2" },
  { id: "q3", label: "Q3" },
  { id: "q4", label: "Q4" }
];

export const QuarterlyRows = [
  { year: "2023", q1: "100", q2: "120", q3: "110", q4: "130" },
  { year: "2022", q1: "90", q2: "110", q3: "105", q4: "125" },
  { year: "2021", q1: "95", q2: "115", q3: "102", q4: "118" },
  { year: "2020", q1: "95", q2: "115", q3: "102", q4: "118" },
  { year: "2021", q1: "95", q2: "115", q3: "102", q4: "118" }

];

export const QuarterlyOutlookVsExceptions = [
  { year: "2023", outlook: "100", exceptions: "120" },
  { year: "2022", outlook: "90", exceptions: "110" },
  { year: "2021", outlook: "95", exceptions: "115" }
];
export const QuarterlyOutlookVsExceptionsColumns = [
  { id: "year", label: "Year" },
  { id: "outlook", label: "Outlook" },
  { id: "exceptions", label: "Exceptions" }
];


export const QuarterlyMacroDrivers = [
  { year: "2023", macroDrivers: "100", exceptions: "120" },
  { year: "2022", macroDrivers: "90", exceptions: "110" },
  { year: "2021", macroDrivers: "95", exceptions: "115" }
];


export const  waterFallChartData =  
  {
    type: "waterfall",
    yValueFormatString: "₹#,##0,.00L",
    indexLabel: "{y}",
    indexLabelPlacement: "inside",
    "risingColor": "#36013F",
    "fallingColor": "#36013F",
    "dataPoints": [
      { "label": "Jan", "y": 8312 },
      { "label": "Feb", "y": 5065 },
      { "label": "Mar", "y": -2564 },
      { "label": "Apr", "y": 7004 },
      { "label": "May", "y": 4324 },
      { "label": "Jun", "y": -3543 },
      { "label": "July", "y": 4008 },
      { "label": "Sep", "y": -6997 },
      { "label": "Aug", "y": 5673 },
      { "label": "Oct", "y": 6654 },
      { "label": "Nov", "y": -4943 },
      { "label": "Dec", "y": 6324 },
      { "label": "Final", "isCumulativeSum": true, "indexLabel": "{y}", "color": "#36013F" }
    ]
  }

  export const candlestickChartData = {
    type: "candlestick",
    risingColor: "#36013F",
    fallingColor: "#36013F",
    dataPoints: [
      { label: "Jan", y: [8000, 8500, 7800, 8312] },
      { label: "Feb", y: [4900, 5200, 4800, 5065] },
      { label: "Mar", y: [2600, 2700, 2500, -2564] },
      { label: "Apr", y: [6800, 7200, 6900, 7004] },
      { label: "May", y: [4200, 4500, 4300, 4324] },
      { label: "Jun", y: [3400, 3700, 3500, -3543] },
      { label: "July", y: [3900, 4200, 4100, 4008] },
      { label: "Aug", y: [5500, 5800, 5600, 5673] },
      { label: "Sep", y: [6800, 7100, 6900, -6997] },
      { label: "Oct", y: [6500, 6800, 6600, 6654] },
      { label: "Nov", y: [4800, 5100, 4900, -4943] },
      { label: "Dec", y: [6200, 6400, 6300, 6324] }
    ]
  };
  

