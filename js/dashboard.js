document.addEventListener('DOMContentLoaded', () => {

    // Configuración global de Chart.js para que luzca bien en fondo oscuro
    Chart.defaults.color = '#e0e0e0';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // --- CHART 1: VENTAS/INGRESOS (LINE CHART) ---
    const ctxSales = document.getElementById('salesChart');
    if (ctxSales) {
        new Chart(ctxSales, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ingresos Mensuales (€)',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 15000, 35000, 40000, 45000, 50000],
                    backgroundColor: 'rgba(255, 209, 0, 0.2)', // Accent color transparente
                    borderColor: '#FFD100', // Accent color
                    borderWidth: 2,
                    tension: 0.4, // Curvas suaves
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Crecimiento de Ingresos 2024' },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: '#FFD100'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // --- CHART 2: NUEVOS USUARIOS (BAR CHART) ---
    const ctxUsers = document.getElementById('usersChart');
    if (ctxUsers) {
        new Chart(ctxUsers, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Nuevos Clientes',
                    data: [15, 25, 40, 65],
                    backgroundColor: [
                        'rgba(255, 209, 0, 0.6)',
                        'rgba(255, 209, 0, 0.7)',
                        'rgba(255, 209, 0, 0.8)',
                        'rgba(255, 209, 0, 1)'
                    ],
                    borderRadius: 5,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Adquisición de Clientes por Trimestre' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // --- CHART 3: DISTRIBUCIÓN DE PROYECTOS (DOUGHNUT CHART) ---
    const ctxProjects = document.getElementById('projectsChart');
    if (ctxProjects) {
        new Chart(ctxProjects, {
            type: 'doughnut',
            data: {
                labels: ['Desarrollo Web', 'Data Engineering', 'Business Intelligence', 'Consultoría'],
                datasets: [{
                    label: 'Distribución de Proyectos',
                    data: [30, 25, 35, 10],
                    backgroundColor: [
                        '#FFD100', // Amarillo
                        '#00A8E8', // Azul Cían
                        '#FF6B6B', // Rojo Pastel
                        '#4ECDC4'  // Verde Agua
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'right' },
                    title: { display: true, text: 'Tipos de Soluciones Entregadas' }
                }
            }
        });
    }
});
