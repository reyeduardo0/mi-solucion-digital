document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN GLOBAL CHART.JS ---
    Chart.defaults.color = '#888';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.02)';

    // Colores Neon
    const NEON_CYAN = '#00f0ff';
    const NEON_BLUE = '#0050ff';
    const NEON_PURPLE = '#bf00ff';
    const NEON_GREEN = '#00ff9d';

    // --- 1. GRÁFICO PRINCIPAL DE ÁREA (PROYECCIÓN) ---
    const ctxMain = document.getElementById('mainAreaChart');
    let mainChart;
    if (ctxMain) {
        const gradientMain = ctxMain.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradientMain.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
        gradientMain.addColorStop(1, 'rgba(0, 240, 255, 0)');

        const gradientSecond = ctxMain.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradientSecond.addColorStop(0, 'rgba(0, 80, 255, 0.3)');
        gradientSecond.addColorStop(1, 'rgba(0, 80, 255, 0)');

        mainChart = new Chart(ctxMain, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    {
                        label: 'Proyección A',
                        data: [10, 45, 30, 60, 50],
                        borderColor: NEON_CYAN,
                        backgroundColor: gradientMain,
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#000',
                        pointBorderColor: NEON_CYAN,
                        pointRadius: 4
                    },
                    {
                        label: 'Proyección B',
                        data: [5, 20, 15, 40, 35],
                        borderColor: NEON_BLUE,
                        backgroundColor: gradientSecond,
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }, // Ocultar leyenda para look minimalista
                scales: {
                    x: { grid: { display: true, color: 'rgba(255,255,255,0.05)' } },
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } }
                },
                animation: { duration: 2000, easing: 'easeOutQuart' }
            }
        });
    }

    // --- 2. WAVE CHART (PEQUEÑO) ---
    const ctxWave = document.getElementById('waveChart');
    let waveChart;
    if (ctxWave) {
        // Datos iniciales para la onda
        const waveData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 50) + 50);
        const waveLabels = Array(20).fill('');

        const gradientWave = ctxWave.getContext('2d').createLinearGradient(0, 0, 0, 100);
        gradientWave.addColorStop(0, '#0050ff');
        gradientWave.addColorStop(1, 'transparent');

        waveChart = new Chart(ctxWave, {
            type: 'line',
            data: {
                labels: waveLabels,
                datasets: [{
                    data: waveData,
                    borderColor: '#0070f3',
                    backgroundColor: gradientWave,
                    borderWidth: 2,
                    tension: 0.5, // Muy suave
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Permitir stretch
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, min: 0, max: 120 }
                },
                animation: false // Desactivar animación por defecto para updates rápidos manuales
            }
        });
    }

    // --- 3. HISTROGRAMA (SOUND BAR STYLE) ---
    const ctxHist = document.getElementById('histogramChart');
    let histChart;
    if (ctxHist) {
        const histData = Array.from({ length: 40 }, () => Math.random() * 100);

        histChart = new Chart(ctxHist, {
            type: 'bar',
            data: {
                labels: Array(40).fill(''),
                datasets: [{
                    data: histData,
                    backgroundColor: (context) => {
                        const val = context.raw;
                        // Color dinámico según altura
                        if (val > 80) return NEON_CYAN;
                        return '#004080';
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 1.0,
                    borderRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, beginAtZero: true }
                },
                animation: { duration: 0 } // Live update manual
            }
        });
    }

    // --- 4. MAP REPLACEMENT (HORIZONTAL BAR) ---
    const ctxMap = document.getElementById('mapReplacementChart');
    let mapChart;
    if (ctxMap) {
        mapChart = new Chart(ctxMap, {
            type: 'bar', // indexAxis: 'y' para horizontal
            data: {
                labels: ['USA', 'España', 'Brasil', 'Japón', 'Alemania'],
                datasets: [{
                    label: 'Usuarios Activos',
                    data: [65, 59, 80, 81, 56],
                    backgroundColor: [NEON_BLUE, NEON_CYAN, '#2ecc71', '#e74c3c', NEON_PURPLE],
                    barThickness: 8,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#fff', font: { size: 10 } }
                    }
                }
            }
        });
    }

    // --- 5, 6, 7. GAUGES (DONUTS) ---
    const createGauge = (id, color, value) => {
        const ctx = document.getElementById(id);
        if (!ctx) return null;
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Val', 'Rest'],
                datasets: [{
                    data: [value, 100 - value],
                    backgroundColor: [color, 'rgba(255,255,255,0.05)'],
                    borderWidth: 0,
                    cutout: '85%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                rotation: -90,
                circumference: 360,
                animation: { animateRotate: true, duration: 1500 }
            }
        });
    };

    const gauge1 = createGauge('gauge1', NEON_BLUE, 75);
    const gauge2 = createGauge('gauge2', NEON_CYAN, 50);
    const gauge3 = createGauge('gauge3', NEON_PURPLE, 85);


    // --- 8. VERTICAL BARS (BOTTOM) ---
    const ctxVert = document.getElementById('verticalBarsChart');
    let vertChart;
    if (ctxVert) {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
        const dataVals = labels.map(() => Math.floor(Math.random() * 80) + 20);

        vertChart = new Chart(ctxVert, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: dataVals,
                    backgroundColor: '#00f0ff',
                    hoverBackgroundColor: '#fff',
                    borderRadius: 4,
                    barThickness: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#666', font: { size: 10 } } },
                    y: { display: false, beginAtZero: true }
                }
            }
        });
    }


    // --- MOCK DATA SIMULATION ENGINE ---
    // Simular datos en tiempo real
    setInterval(() => {
        // 1. Update Wave Chart
        if (waveChart) {
            const newData = Math.floor(Math.random() * 40) + 60; // Random entre 60 y 100
            const dataset = waveChart.data.datasets[0];

            // Remove first, add last
            dataset.data.shift();
            dataset.data.push(newData);

            waveChart.update('none'); // Update sin animación global para rendimiento

            // Update counter text
            const el = document.getElementById('live-counter-1');
            if (el) el.innerText = Math.floor(1000 + Math.random() * 100);
        }

        // 2. Update Histogram (Equalizer effect)
        if (histChart && Math.random() > 0.3) { // No actualizar todos los frames
            const dataset = histChart.data.datasets[0];
            // Modificar aleatoriamente algunas barras
            dataset.data = dataset.data.map(val => {
                let change = (Math.random() - 0.5) * 20;
                let newVal = val + change;
                if (newVal < 0) newVal = 5;
                if (newVal > 100) newVal = 95;
                return newVal;
            });
            histChart.update('none');
        }

        // 3. Update Vertical Bars (Random growth)
        if (vertChart && Math.random() > 0.8) { // Menos frecuente
            const dataset = vertChart.data.datasets[0];
            const idx = Math.floor(Math.random() * dataset.data.length);
            dataset.data[idx] = Math.floor(Math.random() * 80) + 20;
            vertChart.update();

            const el = document.getElementById('live-counter-2');
            if (el) el.innerText = Math.floor(1000 + Math.random() * 50);
        }

    }, 800); // 800ms refresh rate

});
