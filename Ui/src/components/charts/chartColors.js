export const CHART_COLORS = [
  "#2563EB",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
  "#EC4899",
  "#6366F1"
];

export const formatCurrency = (value) =>
  `₹ ${Number(value).toLocaleString("en-IN")}`;
