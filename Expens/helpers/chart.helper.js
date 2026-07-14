const fs = require("fs-extra");
const path = require("path");
const {ChartJSNodeCanvas} = require("chartjs-node-canvas");

/* =========================================================
   CONFIG
========================================================= */

const width = 900;

const height = 500;

const chartJSNodeCanvas =

  new ChartJSNodeCanvas({

    width,

    height,

    backgroundColour: "white"

  });

const chartFolder = path.join(

  __dirname,

  "../temp/charts"

);

fs.ensureDirSync(chartFolder);

/* =========================================================
   COLORS
========================================================= */

const COLORS = [

  "#2563EB",

  "#22C55E",

  "#F97316",

  "#EF4444",

  "#A855F7",

  "#14B8A6",

  "#EAB308",

  "#EC4899"

];

/* =========================================================
   PIE CHART
========================================================= */

async function generateExpensePieChart(data) {

  const configuration = {

    type: "pie",

    data: {

      labels: data.map(

        item => item.category

      ),

      datasets: [

        {

          data: data.map(

            item => Number(item.amount)

          ),

          backgroundColor: COLORS

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

  const filePath = path.join(

    chartFolder,

    "expense-pie.png"

  );

  const image =

    await chartJSNodeCanvas.renderToBuffer(

      configuration

    );

  await fs.writeFile(

    filePath,

    image

  );

  return filePath;

}

/* =========================================================
   BAR CHART
========================================================= */

async function generateMonthlyBarChart(data) {

  const configuration = {

    type: "bar",

    data: {

      labels: data.map(

        item => item.month

      ),

      datasets: [

        {

          label: "Income",

          data: data.map(

            item => Number(item.income)

          ),

          backgroundColor: "#22C55E"

        },

        {

          label: "Expense",

          data: data.map(

            item => Number(item.expense)

          ),

          backgroundColor: "#EF4444"

        }

      ]

    },

    options: {

      responsive: false,

      plugins: {

        title: {

          display: true,

          text: "Monthly Income vs Expense"

        }

      }

    }

  };

  const filePath = path.join(

    chartFolder,

    "monthly-bar.png"

  );

  const image =

    await chartJSNodeCanvas.renderToBuffer(

      configuration

    );

  await fs.writeFile(

    filePath,

    image

  );

  return filePath;

}

/* =========================================================
   PAYMENT CHART
========================================================= */

async function generatePaymentChart(data) {

  const configuration = {

    type: "doughnut",

    data: {

      labels: data.map(

        item => item.payment_method

      ),

      datasets: [

        {

          data: data.map(

            item => Number(item.amount)

          ),

          backgroundColor: COLORS

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

          text: "Payment Methods"

        }

      }

    }

  };

  const filePath = path.join(

    chartFolder,

    "payment-chart.png"

  );

  const image =

    await chartJSNodeCanvas.renderToBuffer(

      configuration

    );

  await fs.writeFile(

    filePath,

    image

  );

  return filePath;

}

/* =========================================================
   EXPORTS
========================================================= */

module.exports = {

  generateExpensePieChart,

  generateMonthlyBarChart,

  generatePaymentChart

};