function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function fmt(num) {
  return Number(num).toFixed(3);
}

function buildSectorData(data) {
  const grouped = {};

  data.forEach((row) => {
    const sector = row.Sector || "Unclassified";
    if (!grouped[sector]) grouped[sector] = [];
    grouped[sector].push(row);
  });

  const sectors = Object.entries(grouped).map(([sector, companies]) => {
    const sortedCompanies = [...companies].sort(
      (a, b) => a.ESG_Score - b.ESG_Score
    );

    const esgScores = sortedCompanies.map(c => c.ESG_Score);
    const environmentScores = sortedCompanies.map(c => c.Environment_Score);
    const socialScores = sortedCompanies.map(c => c.Social_Score);

    return {
      sector,
      count: companies.length,
      avgESG: mean(esgScores),
      avgEnvironment: mean(environmentScores),
      avgSocial: mean(socialScores),
      medianESG: median(esgScores),
      range: Math.max(...esgScores) - Math.min(...esgScores),
      bestCompany: sortedCompanies[0].Company,
      worstCompany: sortedCompanies[sortedCompanies.length - 1].Company,
      companyESGScores: esgScores
    };
  });

  return sectors.sort((a, b) => a.avgESG - b.avgESG).map((s, i) => ({
    ...s,
    rank: i + 1
  }));
}

function renderStats(sectors) {
  const grid = document.getElementById("sectorStatsGrid");
  if (!grid) return;

  const best = sectors[0];
  const worst = sectors[sectors.length - 1];
  const widest = [...sectors].sort((a, b) => b.range - a.range)[0];
  const tightest = [...sectors].sort((a, b) => a.range - b.range)[0];

  grid.innerHTML = `
    <div class="stat stat-best">
      <div class="stat-value">${best.sector}</div>
      <div class="stat-label">Best sector</div>
    </div>
    <div class="stat stat-worst">
      <div class="stat-value">${worst.sector}</div>
      <div class="stat-label">Worst sector</div>
    </div>
    <div class="stat">
      <div class="stat-value">${widest.sector}</div>
      <div class="stat-label">Widest spread</div>
    </div>
    <div class="stat">
      <div class="stat-value">${tightest.sector}</div>
      <div class="stat-label">Most consistent</div>
    </div>
  `;
}

function renderTable(sectors) {
  const tbody = document.getElementById("sectorTableBody");
  if (!tbody) return;

  tbody.innerHTML = sectors.map(sector => `
    <tr>
      <td class="num-cell">${sector.rank}</td>
      <td class="sector-name-cell">${sector.sector}</td>
      <td class="num-cell">${sector.count}</td>
      <td class="num-cell">${fmt(sector.avgESG)}</td>
      <td class="num-cell">${fmt(sector.avgEnvironment)}</td>
      <td class="num-cell">${fmt(sector.avgSocial)}</td>
      <td class="num-cell">${fmt(sector.medianESG)}</td>
      <td>${sector.bestCompany}</td>
      <td>${sector.worstCompany}</td>
      <td class="num-cell">${fmt(sector.range)}</td>
    </tr>
  `).join("");
}

function renderBarChart(sectors) {
  const barColors = sectors.map((_, index) => {
    const ratio = sectors.length <= 1 ? 0 : index / (sectors.length - 1);
    const hue = 130 - (ratio * 130);
    return `hsl(${hue}, 58%, 52%)`;
  });

  Plotly.newPlot("sectorBarChart", [
    {
      type: "bar",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgESG),
      text: sectors.map(s => fmt(s.avgESG)),
      textposition: "outside",
      cliponaxis: false,
      marker: {
        color: barColors
      },
      hovertemplate: "<b>%{x}</b><br>Average ESG exposure: %{y:.3f}<extra></extra>"
    }
  ], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 60, r: 24, t: 10, b: 20 },
    yaxis: { title: "Average ESG Exposure" },
    xaxis: {
      showticklabels: false,
      showgrid: false,
      zeroline: false
    }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

function renderPieChart(sectors) {
  const palette = [
    "#2f8b57",
    "#4867c9",
    "#6d4cc4",
    "#d95d5d",
    "#c6872f",
    "#2f6f8b",
    "#7a9e3d",
    "#b45f8a",
    "#5f6d82",
    "#4f78e3",
    "#9a6fd6",
    "#db7a45"
  ];

  Plotly.newPlot("sectorPieChart", [
    {
      type: "pie",
      labels: sectors.map((s) => s.sector),
      values: sectors.map((s) => s.count),
      domain: {
        x: [0.3, 1],
        y: [0, 1]
      },
      sort: false,
      direction: "clockwise",
      hole: 0.14,
      textinfo: "none",
      textposition: "none",
      automargin: false,
      marker: {
        colors: sectors.map((_, index) => palette[index % palette.length]),
        line: {
          color: "#ffffff",
          width: 2
        }
      },
      hovertemplate:
        "<b>%{label}</b><br>Companies: %{value}<br>Share of index: %{percent}<extra></extra>"
    }
  ], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 8, r: 8, t: 8, b: 8 },
    showlegend: true,
    legend: {
      orientation: "v",
      x: 0.01,
      xanchor: "left",
      y: 0.5,
      yanchor: "middle"
    }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

function renderBoxPlot(sectors) {
  const traces = sectors.map(s => ({
    type: "box",
    name: s.sector,
    y: s.companyESGScores,
    boxpoints: "outliers",
    hovertemplate: "<b>" + s.sector + "</b><br>ESG Exposure: %{y:.3f}<extra></extra>"
  }));

  Plotly.newPlot("sectorBoxPlot", traces, {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 60, r: 30, t: 10, b: 20 },
    yaxis: { title: "Company ESG Exposure" },
    xaxis: {
      showticklabels: false,
      showgrid: false,
      zeroline: false
    }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

function renderGroupedChart(sectors) {
  Plotly.newPlot("sectorGroupedChart", [
    {
      type: "bar",
      name: "Environment",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgEnvironment),
      marker: { color: "#4aa772" },
      hovertemplate: "<b>%{x}</b><br>Environment: %{y:.3f}<extra></extra>"
    },
    {
      type: "bar",
      name: "Social",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgSocial),
      marker: { color: "#4867c9" },
      hovertemplate: "<b>%{x}</b><br>Social: %{y:.3f}<extra></extra>"
    }
  ], {
    barmode: "group",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 60, r: 30, t: 10, b: 20 },
    yaxis: { title: "Average Domain Score" },
    xaxis: {
      showticklabels: false,
      showgrid: false,
      zeroline: false
    }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

function initSectorsPage() {
  if (!Array.isArray(cappedData)) {
    console.error("cappedData is not available.");
    return;
  }

  const sectors = buildSectorData(cappedData);
  renderStats(sectors);
  renderTable(sectors);
  renderBarChart(sectors);
  renderPieChart(sectors);
  renderBoxPlot(sectors);
  renderGroupedChart(sectors);
}

document.addEventListener("DOMContentLoaded", initSectorsPage);
