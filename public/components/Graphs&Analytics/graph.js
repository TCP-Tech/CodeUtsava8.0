document.addEventListener("contentsLoaded", () => {
    const lineData = {
      labels: ['2016', '2018', '2020', '2022', '2022-23', '2023-24'],
      datasets: [{
        label: 'Total Number of Teams',
        data: [120, 200, 450, 570, 640, 800],
        borderColor: '#D4AC2B',
        backgroundColor: 'rgba(212, 172, 43, 0.5)',
        fill: true,
        tension: 0 
      }]
    };
  
    const barData = {
      labels: ['2016', '2018', '2020', '2022', '2022-23', '2023-24'],
      datasets: [{
        label: 'Total Participations',
        data: [500, 800, 1600, 1800, 2400, 3200],
        backgroundColor: 'rgba(212, 172, 43, 0.5)',
        borderColor: '#D4AC2B',
        borderWidth: 2,
        borderRadius: 10
      }]
    };
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white',
              font: {
                family: 'pixelled',
                size: 10,
                weight: 'bold'
              }
            },
            grid: {
              color: 'transparent'
            },
            title: {
              display: true,
              text: 'Years',
              color: '#D4AC2B',
              font: {
                family: 'pixelled',
                size: 12,
                weight: 'bold'
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
              font: {
                family: 'pixelled',
                size: 10,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            title: {
              display: true,
              text: 'Total Number Of Teams', 
              color: '#D4AC2B',
              font: {
                family: 'pixelled',
                size: 12,
                weight: 'bold'
              },
              padding: {
                // right: 100,
                // top:100 
                bottom:20
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
              font: {
                family: 'pixelled',
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            bodyFont: {
              family: 'pixelled',
              size: 12
            }
          },
         
        }
      };
  
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white',
              font: {
                family: 'pixelled',
                size: 10,
                weight: 'bold'
              }
            },
            grid: {
              color: 'transparent'
            },
            title: {
              display: true,
              text: 'Years',
              color: '#D4AC2B',
              font: {
                family: 'pixelled',
                size: 12,
                weight: 'bold'
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
              font: {
                family: 'pixelled',
                size: 10,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            title: {
              display: true,
              text: 'Total Participations', 
              color: '#D4AC2B',
              font: {
                family: 'pixelled',
                size: 12,
                weight: 'bold'
              },
              padding: {
                // right: 100,
                // top:100 
                bottom:20
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
              font: {
                family: 'pixelled',
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            bodyFont: {
              family: 'pixelled',
              size: 12
            }
          },
        //   title: {
        //     display: true,
        //     text: 'Bar Chart Title',
        //     color: 'white',
        //     font: {
        //       family: 'pixelled',
        //       size: 20,
        //       weight: 'bold'
        //     }
        //   }
        }
      };
      const applyResponsiveFontSizes = () => {
        const width = window.innerWidth;
        const isMobile = width <= 768;
    
        const scaleSize = isMobile ? 8 : 10;
        const axisTitleSize = isMobile ? 10 : 12;
    
        lineOptions.scales.y.ticks.font.size = scaleSize;
        lineOptions.scales.y.title.font.size = axisTitleSize;
        lineOptions.scales.x.ticks.font.size = scaleSize;
        lineOptions.scales.x.title.font.size = axisTitleSize;
        lineOptions.plugins.legend.labels.font.size = axisTitleSize;
        // lineOptions.plugins.tooltip.bodyFont.size = 5;
    
        barOptions.scales.x.ticks.font.size = scaleSize;
        barOptions.scales.x.title.font.size = axisTitleSize;
        barOptions.scales.y.ticks.font.size = scaleSize;
        barOptions.scales.y.title.font.size = axisTitleSize;
        barOptions.plugins.legend.labels.font.size = axisTitleSize;
        // barOptions.plugins.tooltip.bodyFont.size = 5;
    
        lineChart.update();
        barChart.update();
      };
    
      const lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: lineData,
        options: lineOptions
      });
    
      const barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: barData,
        options: barOptions
      });
    
      // Apply responsive font sizes on resize and initial load
      window.addEventListener('resize', applyResponsiveFontSizes);
      applyResponsiveFontSizes();
  });
  