const fs = require("fs");
const path = require("path");

const {
  ChartJSNodeCanvas
} = require("chartjs-node-canvas");

const {

  Chart,

  CategoryScale,

  LinearScale,

  BarElement,

  ArcElement,

  Tooltip,

  Legend,

  Title

} = require("chart.js");

/* =========================================================
   REGISTER CHART
========================================================= */

Chart.register(

  CategoryScale,

  LinearScale,

  BarElement,

  ArcElement,

  Tooltip,

  Legend,

  Title

);

/* =========================================================
   CONSTANTS
========================================================= */

const WIDTH = 900;

const HEIGHT = 500;

const chartCanvas = new ChartJSNodeCanvas({

  width: WIDTH,

  height: HEIGHT,

  backgroundColour: "#FFFFFF"

});

const CHART_DIR = path.join(

  __dirname,

  "../temp/charts"

);

if (!fs.existsSync(CHART_DIR)) {

  fs.mkdirSync(

    CHART_DIR,

    {

      recursive: true

    }

  );

}

/* =========================================================
   SAVE CHART
========================================================= */

const saveChart = async (

  configuration,

  fileName

) => {

  const buffer = await chartCanvas.renderToBuffer(

    configuration

  );

  const filePath = path.join(

    CHART_DIR,

    fileName

  );

  fs.writeFileSync(

    filePath,

    buffer

  );

  return filePath;

};

/* =========================================================
   INCOME VS EXPENSE BAR CHART
========================================================= */

const generateIncomeExpenseChart = async (

  report

) => {

  const labels =

    report.monthlySummary.map(

      (item) => item.month

    );

  const income =

    report.monthlySummary.map(

      (item) =>

        Number(item.income)

    );

  const expense =

    report.monthlySummary.map(

      (item) =>

        Number(item.expense)

    );

  const configuration = {

    type: "bar",

    data: {

      labels,

      datasets: [

        {

          label: "Income",

          data: income,

          backgroundColor:

            "#10B981",

          borderRadius: 8

        },

        {

          label: "Expense",

          data: expense,

          backgroundColor:

            "#EF4444",

          borderRadius: 8

        }

      ]

    },

    options: {

      responsive: false,

      plugins: {

        legend: {

          position: "top"

        },

        title: {

          display: true,

          text: "Income vs Expense"

        }

      },

      scales: {

        y: {

          beginAtZero: true

        }

      }

    }

  };

  return saveChart(

    configuration,

    "income-expense.png"

  );

};
/* =========================================================
   EXPENSE CATEGORY PIE CHART
========================================================= */

const generateExpenseCategoryChart = async (

  report

) => {

  const labels =

    report.expenseByCategory.map(

      (item) => item.category

    );

  const values =

    report.expenseByCategory.map(

      (item) =>

        Number(item.amount)

    );

  const configuration = {

    type: "pie",

    data: {

      labels,

      datasets: [

        {

          data: values,

          backgroundColor: [

            "#3B82F6",

            "#10B981",

            "#F59E0B",

            "#EF4444",

            "#8B5CF6",

            "#14B8A6",

            "#EC4899",

            "#6366F1"

          ],

          borderColor: "#FFFFFF",

          borderWidth: 2

        }

      ]

    },

    options: {

      responsive: false,

      plugins: {

        legend: {

          position: "bottom"

        },

        title: {

          display: true,

          text: "Expense By Category"

        }

      }

    }

  };

  return saveChart(

    configuration,

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

  if (!charts) return;

  Object.values(charts).forEach(

    (file) => {

      if (

        file &&

        fs.existsSync(file)

      ) {

        fs.unlinkSync(file);

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