const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

/* =========================================================
   CONSTANTS
========================================================= */

const WIDTH = 900;
const HEIGHT = 500;

/*
   Vercel serverless environment:
   /tmp is writable.
*/
const CHART_DIR = path.join(
  process.cwd(),
  "uploads",
  "reports",
  "charts"
);

if (!fs.existsSync(CHART_DIR)) {
  fs.mkdirSync(CHART_DIR, {
    recursive: true
  });
}

/* =========================================================
   HELPERS
========================================================= */

const escapeXml = (value) => {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const createFileName = (name) => {
  const id = crypto.randomBytes(8).toString("hex");

  return `${id}-${name}`;
};

/* =========================================================
   SAVE SVG AS PNG
========================================================= */

const saveSvgAsPng = async (
  svg,
  fileName
) => {
  const filePath = path.join(
    CHART_DIR,
    createFileName(fileName)
  );

  await sharp(
    Buffer.from(svg)
  )
    .png()
    .toFile(filePath);

  return filePath;
};

/* =========================================================
   INCOME VS EXPENSE BAR CHART
========================================================= */

const generateIncomeExpenseChart = async (
  report
) => {
  const monthlySummary =
    Array.isArray(report?.monthlySummary)
      ? report.monthlySummary
      : [];

  const labels = monthlySummary.map(
    (item) => item.month
  );

  const income = monthlySummary.map(
    (item) => Number(item.income) || 0
  );

  const expense = monthlySummary.map(
    (item) => Number(item.expense) || 0
  );

  const allValues = [
    ...income,
    ...expense
  ];

  const maxValue =
    Math.max(...allValues, 0);

  const chartMax =
    maxValue > 0
      ? maxValue * 1.2
      : 100;

  /* =======================================================
     CHART DIMENSIONS
  ======================================================= */

  const marginLeft = 90;
  const marginRight = 40;
  const marginTop = 80;
  const marginBottom = 80;

  const chartWidth =
    WIDTH -
    marginLeft -
    marginRight;

  const chartHeight =
    HEIGHT -
    marginTop -
    marginBottom;

  const groupWidth =
    labels.length > 0
      ? chartWidth / labels.length
      : chartWidth;

  const barWidth = Math.min(
    28,
    groupWidth / 4
  );

  /* =======================================================
     Y AXIS GRID
  ======================================================= */

  let gridLines = "";
  let yLabels = "";

  const gridCount = 5;

  for (
    let i = 0;
    i <= gridCount;
    i++
  ) {
    const value =
      (chartMax / gridCount) * i;

    const y =
      marginTop +
      chartHeight -
      (value / chartMax) *
        chartHeight;

    gridLines += `
      <line
        x1="${marginLeft}"
        y1="${y}"
        x2="${WIDTH - marginRight}"
        y2="${y}"
        stroke="#E5E7EB"
        stroke-width="1"
      />
    `;

    yLabels += `
      <text
        x="${marginLeft - 12}"
        y="${y + 5}"
        text-anchor="end"
        font-size="13"
        fill="#6B7280"
        font-family="Arial"
      >
        ${Math.round(value)}
      </text>
    `;
  }

  /* =======================================================
     BARS
  ======================================================= */

  let bars = "";
  let xLabels = "";

  labels.forEach(
    (label, index) => {
      const centerX =
        marginLeft +
        groupWidth * index +
        groupWidth / 2;

      const incomeHeight =
        (income[index] / chartMax) *
        chartHeight;

      const expenseHeight =
        (expense[index] / chartMax) *
        chartHeight;

      const incomeX =
        centerX -
        barWidth -
        4;

      const expenseX =
        centerX +
        4;

      const incomeY =
        marginTop +
        chartHeight -
        incomeHeight;

      const expenseY =
        marginTop +
        chartHeight -
        expenseHeight;

      bars += `
        <rect
          x="${incomeX}"
          y="${incomeY}"
          width="${barWidth}"
          height="${Math.max(
            incomeHeight,
            1
          )}"
          rx="6"
          fill="#10B981"
        />

        <rect
          x="${expenseX}"
          y="${expenseY}"
          width="${barWidth}"
          height="${Math.max(
            expenseHeight,
            1
          )}"
          rx="6"
          fill="#EF4444"
        />
      `;

      xLabels += `
        <text
          x="${centerX}"
          y="${HEIGHT - 40}"
          text-anchor="middle"
          font-size="13"
          fill="#6B7280"
          font-family="Arial"
        >
          ${escapeXml(label)}
        </text>
      `;
    }
  );

  /* =======================================================
     LEGEND
  ======================================================= */

  const legend = `
    <rect
      x="330"
      y="25"
      width="16"
      height="16"
      rx="3"
      fill="#10B981"
    />

    <text
      x="354"
      y="38"
      font-size="14"
      fill="#374151"
      font-family="Arial"
    >
      Income
    </text>

    <rect
      x="450"
      y="25"
      width="16"
      height="16"
      rx="3"
      fill="#EF4444"
    />

    <text
      x="474"
      y="38"
      font-size="14"
      fill="#374151"
      font-family="Arial"
    >
      Expense
    </text>
  `;

  /* =======================================================
     SVG
  ======================================================= */

  const svg = `
    <svg
      width="${WIDTH}"
      height="${HEIGHT}"
      xmlns="http://www.w3.org/2000/svg"
    >

      <rect
        width="100%"
        height="100%"
        fill="#FFFFFF"
      />

      <text
        x="${WIDTH / 2}"
        y="25"
        text-anchor="middle"
        font-size="20"
        font-weight="bold"
        fill="#111827"
        font-family="Arial"
      >
        Income vs Expense
      </text>

      ${legend}

      ${gridLines}

      ${yLabels}

      <line
        x1="${marginLeft}"
        y1="${marginTop + chartHeight}"
        x2="${WIDTH - marginRight}"
        y2="${marginTop + chartHeight}"
        stroke="#9CA3AF"
        stroke-width="1"
      />

      ${bars}

      ${xLabels}

    </svg>
  `;

  return saveSvgAsPng(
    svg,
    "income-expense.png"
  );
};

/* =========================================================
   EXPENSE CATEGORY PIE CHART
========================================================= */

const generateExpenseCategoryChart = async (
  report
) => {
  const categories =
    Array.isArray(report?.expenseByCategory)
      ? report.expenseByCategory
      : [];

  const labels = categories.map(
    (item) => item.category
  );

  const values = categories.map(
    (item) => Number(item.amount) || 0
  );

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
    "#EC4899",
    "#6366F1"
  ];

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  /* =======================================================
     PIE CHART
  ======================================================= */

  const centerX = 300;
  const centerY = 270;
  const radius = 150;

  let currentAngle = -Math.PI / 2;

  let slices = "";
  let legend = "";

  if (total > 0) {
    values.forEach(
      (value, index) => {
        if (value <= 0) {
          return;
        }

        const sliceAngle =
          (value / total) *
          Math.PI *
          2;

        const endAngle =
          currentAngle +
          sliceAngle;

        const x1 =
          centerX +
          radius *
            Math.cos(currentAngle);

        const y1 =
          centerY +
          radius *
            Math.sin(currentAngle);

        const x2 =
          centerX +
          radius *
            Math.cos(endAngle);

        const y2 =
          centerY +
          radius *
            Math.sin(endAngle);

        const largeArcFlag =
          sliceAngle > Math.PI
            ? 1
            : 0;

        const pathData = `
          M ${centerX} ${centerY}
          L ${x1} ${y1}
          A ${radius} ${radius}
            0 ${largeArcFlag} 1
            ${x2} ${y2}
          Z
        `;

        slices += `
          <path
            d="${pathData}"
            fill="${
              colors[index % colors.length]
            }"
            stroke="#FFFFFF"
            stroke-width="2"
          />
        `;

        currentAngle = endAngle;
      }
    );
  } else {
    slices = `
      <circle
        cx="${centerX}"
        cy="${centerY}"
        r="${radius}"
        fill="#E5E7EB"
      />
    `;
  }

  /* =======================================================
     LEGEND
  ======================================================= */

  labels.forEach(
    (label, index) => {
      const y =
        120 + index * 42;

      const amount =
        values[index];

      legend += `
        <rect
          x="555"
          y="${y - 13}"
          width="16"
          height="16"
          rx="3"
          fill="${
            colors[index % colors.length]
          }"
        />

        <text
          x="580"
          y="${y}"
          font-size="14"
          fill="#374151"
          font-family="Arial"
        >
          ${escapeXml(label)}
        </text>

        <text
          x="830"
          y="${y}"
          text-anchor="end"
          font-size="14"
          fill="#111827"
          font-family="Arial"
        >
          ${amount.toFixed(2)}
        </text>
      `;
    }
  );

  /* =======================================================
     SVG
  ======================================================= */

  const svg = `
    <svg
      width="${WIDTH}"
      height="${HEIGHT}"
      xmlns="http://www.w3.org/2000/svg"
    >

      <rect
        width="100%"
        height="100%"
        fill="#FFFFFF"
      />

      <text
        x="${WIDTH / 2}"
        y="45"
        text-anchor="middle"
        font-size="20"
        font-weight="bold"
        fill="#111827"
        font-family="Arial"
      >
        Expense By Category
      </text>

      ${slices}

      ${legend}

    </svg>
  `;

  return saveSvgAsPng(
    svg,
    "expense-category.png"
  );
};

/* =========================================================
   GENERATE ALL CHARTS
========================================================= */

const generateCharts = async (
  report
) => {
  const incomeExpenseChart =
    await generateIncomeExpenseChart(
      report
    );

  const expenseCategoryChart =
    await generateExpenseCategoryChart(
      report
    );

  return {
    incomeExpenseChart,
    expenseCategoryChart
  };
};

/* =========================================================
   CLEANUP TEMP CHARTS
========================================================= */

const cleanupCharts = (
  charts
) => {
  if (!charts) {
    return;
  }

  Object.values(charts).forEach(
    (file) => {
      if (
        file &&
        fs.existsSync(file)
      ) {
        try {
          fs.unlinkSync(file);
        } catch (error) {
          console.error(
            "Chart cleanup failed:",
            error.message
          );
        }
      }
    }
  );
};

/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
  generateCharts,
  cleanupCharts
};