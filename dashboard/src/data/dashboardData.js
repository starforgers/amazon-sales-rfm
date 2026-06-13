export const kpis = {
  totalRevenue: 71670272,
  totalOrders: 128968,
  cancelRate: 0.1421,
  returnRate: 0.0164,
  avgOrderValue: 648.56,
  shippedOrders: 109487,
};

export const monthlyRevenue = [
  { month: "Apr 2022", revenue: 26234520, orders: 44980 },
  { month: "May 2022", revenue: 23951575, orders: 49821 },
  { month: "Jun 2022", revenue: 21389367, orders: 34167 },
];

export const categoryData = [
  { name: "Set",           orders: 50281, revenue: 32456000 },
  { name: "Kurta",         orders: 49873, revenue: 22198000 },
  { name: "Western Dress", orders: 15500, revenue: 10987000 },
  { name: "Top",           orders: 10622, revenue:  4628000 },
  { name: "Ethnic Dress",  orders:  1159, revenue:   865000 },
  { name: "Blouse",        orders:   926, revenue:   430000 },
  { name: "Bottom",        orders:   440, revenue:   106000 },
];

export const topStates = [
  { state: "Maharashtra",   revenue: 12223831, trend: "+8.2%" },
  { state: "Karnataka",     revenue:  9649981, trend: "+5.1%" },
  { state: "Telangana",     revenue:  6290128, trend: "+3.4%" },
  { state: "Uttar Pradesh", revenue:  6186123, trend: "+6.7%" },
  { state: "Tamil Nadu",    revenue:  5953862, trend: "-1.2%" },
];

export const rfmSegments = [
  { segment: "At Risk",             customers: 40, revenue:  8420000, pct: 26.3, color: "#EF4444" },
  { segment: "Loyal",               customers: 22, revenue:  9810000, pct: 14.5, color: "#3B82F6" },
  { segment: "Champions",           customers: 21, revenue: 18640000, pct: 13.8, color: "#10B981" },
  { segment: "Potential Loyalists", customers: 15, revenue:  5230000, pct:  9.9, color: "#8B5CF6" },
  { segment: "Needs Attention",     customers: 13, revenue:  3180000, pct:  8.6, color: "#F59E0B" },
  { segment: "Hibernating",         customers: 12, revenue:  2040000, pct:  7.9, color: "#6B7280" },
  { segment: "New / Recent",        customers: 11, revenue:  1870000, pct:  7.2, color: "#06B6D4" },
  { segment: "Lost",                customers:  8, revenue:   680000, pct:  5.3, color: "#9CA3AF" },
  { segment: "Big Spenders",        customers:  7, revenue:  3920000, pct:  4.6, color: "#F97316" },
];

export const topCustomers = [
  { customer: "Mulberries Boutique",       recency:  37, frequency: 10, monetary: 2094071, segment: "Champions",           rfm: 455 },
  { customer: "Amani Concept Trading",     recency: 201, frequency:  3, monetary:  930451, segment: "At Risk",             rfm: 255 },
  { customer: "Vaharsha Boutique",         recency:  89, frequency:  4, monetary:  588760, segment: "Potential Loyalists",  rfm: 355 },
  { customer: "Galaxy Group Of Companies", recency: 220, frequency:  1, monetary:  445058, segment: "At Risk",             rfm: 215 },
  { customer: "Fash Empire",               recency:  45, frequency:  6, monetary:  398200, segment: "Loyal",               rfm: 445 },
  { customer: "Diya Collections",          recency:  62, frequency:  5, monetary:  341500, segment: "Loyal",               rfm: 435 },
  { customer: "Style Hub India",           recency: 190, frequency:  4, monetary:  298700, segment: "At Risk",             rfm: 245 },
];

export const segmentActions = {
  "Champions":           "Reward & upsell. Feature in referral programmes.",
  "Loyal":               "Offer loyalty tiers. Protect from competitors.",
  "Big Spenders":        "Push frequency. One re-purchase locks them in.",
  "New / Recent":        "Strong onboarding. Second purchase is the goal.",
  "Potential Loyalists": "Targeted nudge. Time-limited offer to reactivate.",
  "Needs Attention":     "Re-engagement campaign before they go cold.",
  "At Risk":             "Win-back email. Personalise with last category.",
  "Hibernating":         "Low-cost reactivation. Accept lower conversion.",
  "Lost":                "Suppression list. Re-market only if CAC justifies.",
};

export const statusBreakdown = [
  { name: "Shipped",   value: 77800 },
  { name: "Delivered", value: 28769 },
  { name: "Cancelled", value: 18329 },
  { name: "Returned",  value:  2114 },
  { name: "Pending",   value:   939 },
];

export const recentOrders = [
  { id: "405-8078784-5731545", date: "2022-06-30", category: "Set",           status: "Cancelled", revenue:  647, state: "Maharashtra"  },
  { id: "171-9198151-1101146", date: "2022-06-30", category: "Kurta",         status: "Delivered", revenue:  406, state: "Karnataka"    },
  { id: "404-0687676-7273146", date: "2022-06-30", category: "Kurta",         status: "Shipped",   revenue:  329, state: "Maharashtra"  },
  { id: "407-1069790-7240320", date: "2022-06-30", category: "Top",           status: "Shipped",   revenue:  574, state: "Tamil Nadu"   },
  { id: "403-9615377-8133951", date: "2022-06-30", category: "Western Dress", status: "Cancelled", revenue:  753, state: "Puducherry"  },
  { id: "408-2841025-3281947", date: "2022-06-29", category: "Set",           status: "Delivered", revenue:  899, state: "Uttar Pradesh"},
  { id: "171-0014231-7760344", date: "2022-06-29", category: "Set",           status: "Pending",   revenue: 1214, state: "Gujarat"     },
];

export const allOrders = [
  { id: "405-8078784-5731545", date: "2022-06-30", category: "Set",           status: "Cancelled", revenue:  647, state: "Maharashtra"  },
  { id: "171-9198151-1101146", date: "2022-06-30", category: "Kurta",         status: "Delivered", revenue:  406, state: "Karnataka"    },
  { id: "404-0687676-7273146", date: "2022-06-30", category: "Kurta",         status: "Shipped",   revenue:  329, state: "Maharashtra"  },
  { id: "407-1069790-7240320", date: "2022-06-30", category: "Top",           status: "Shipped",   revenue:  574, state: "Tamil Nadu"   },
  { id: "403-9615377-8133951", date: "2022-06-30", category: "Western Dress", status: "Cancelled", revenue:  753, state: "Puducherry"  },
  { id: "408-2841025-3281947", date: "2022-06-29", category: "Set",           status: "Delivered", revenue:  899, state: "Uttar Pradesh"},
  { id: "171-0014231-7760344", date: "2022-06-29", category: "Set",           status: "Pending",   revenue: 1214, state: "Gujarat"     },
  { id: "402-3847561-9274856", date: "2022-06-29", category: "Kurta",         status: "Shipped",   revenue:  489, state: "Rajasthan"   },
  { id: "406-1928374-5647382", date: "2022-06-28", category: "Set",           status: "Delivered", revenue: 1102, state: "Karnataka"   },
  { id: "403-7654321-8765432", date: "2022-06-28", category: "Western Dress", status: "Shipped",   revenue:  835, state: "Maharashtra" },
  { id: "407-2345678-3456789", date: "2022-06-28", category: "Top",           status: "Delivered", revenue:  312, state: "Delhi"       },
  { id: "404-8765432-2109876", date: "2022-06-27", category: "Ethnic Dress",  status: "Cancelled", revenue:  620, state: "Tamil Nadu"  },
  { id: "405-3456789-4109871", date: "2022-06-27", category: "Kurta",         status: "Shipped",   revenue:  445, state: "Telangana"   },
  { id: "402-9876543-3456781", date: "2022-06-27", category: "Set",           status: "Returned",  revenue:  987, state: "Gujarat"     },
  { id: "408-4567890-5678902", date: "2022-06-26", category: "Blouse",        status: "Delivered", revenue:  289, state: "Maharashtra" },
  { id: "403-1234567-6789013", date: "2022-06-26", category: "Western Dress", status: "Shipped",   revenue:  743, state: "Karnataka"   },
  { id: "406-5678901-7890124", date: "2022-06-26", category: "Set",           status: "Delivered", revenue: 1350, state: "Uttar Pradesh"},
  { id: "407-2109876-8901235", date: "2022-06-25", category: "Kurta",         status: "Shipped",   revenue:  520, state: "Rajasthan"   },
  { id: "404-3210987-9012346", date: "2022-06-25", category: "Top",           status: "Cancelled", revenue:  398, state: "Tamil Nadu"  },
  { id: "405-4321098-0123457", date: "2022-06-25", category: "Set",           status: "Delivered", revenue:  876, state: "Maharashtra" },
  { id: "402-5432109-1234568", date: "2022-06-24", category: "Ethnic Dress",  status: "Shipped",   revenue:  692, state: "Telangana"   },
  { id: "408-6543210-2345679", date: "2022-06-24", category: "Set",           status: "Delivered", revenue: 1100, state: "Karnataka"   },
  { id: "406-7654321-3456790", date: "2022-06-23", category: "Bottom",        status: "Shipped",   revenue:  215, state: "Delhi"       },
  { id: "403-8765432-4567891", date: "2022-06-23", category: "Kurta",         status: "Delivered", revenue:  567, state: "Maharashtra" },
  { id: "407-9876543-5678902", date: "2022-06-22", category: "Western Dress", status: "Cancelled", revenue:  810, state: "Gujarat"     },
];

export const notifications = [
  { id: 1, title: "High cancellation rate",  message: "Jun 2022 cancel rate hit 15.2% — above the 10% benchmark.", time: "2h ago",  type: "warning" },
  { id: 2, title: "New champion customer",   message: "Mulberries Boutique placed order #171-9198151.",             time: "4h ago",  type: "info"    },
  { id: 3, title: "Maharashtra milestone",   message: "Maharashtra crossed ₹12 Cr in Q2 revenue.",                 time: "1d ago",  type: "success" },
  { id: 4, title: "At-risk segment alert",   message: "40 customers flagged as At Risk — 26.3% of customer base.", time: "2d ago",  type: "warning" },
];
