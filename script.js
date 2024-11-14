document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { показатель: 'Выручка, руб', текущийДень: 500521, вчера: 480521, вЭтотДеньНедели: 4805121 },
        { показатель: 'Наличные', текущийДень: 300000, вчера: 300000, вЭтотДеньНедели: 300000 },
        { показатель: 'Безналичный расчет', текущийДень: 100000, вчера: 100000, вЭтотДеньНедели: 100000 },
        { показатель: 'Кредитные карты', текущийДень: 100521, вчера: 100521, вЭтотДеньНедели: 100521 },
        { показатель: 'Средний чек, руб', текущийДень: 1300, вчера: 900, вЭтотДеньНедели: 900 },
        { показатель: 'Средний гость, руб', текущийДень: 1200, вчера: 800, вЭтотДеньНедели: 800 },
        { показатель: 'Удаление из чека (после оплаты), руб', текущийДень: 1000, вчера: 1100, вЭтотДеньНедели: 900 },
        { показатель: 'Удаление из чека (до оплаты), руб', текущийДень: 1300, вчера: 1300, вЭтотДеньНедели: 900 },
        { показатель: 'Количество чеков', текущийДень: 34, вчера: 36, вЭтотДеньНедели: 34 },
        { показатель: 'Количество гостей', текущийДень: 34, вчера: 36, вЭтотДеньНедели: 32 },
    ];

    const tableBody = document.querySelector('#dataTable tbody');

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        const percentChange = ((item.текущийДень - item.вчера) / item.вчера * 100);
        const percentChangeText = percentChange === 0 ? `${percentChange.toFixed(0)}%` : `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(0)}%`;
        const yesterdayCellClass = percentChange === 0 ? '' : (percentChange > 0 ? 'green' : 'red');
        const yesterdayCell = `
            <td class="th_three ${yesterdayCellClass}">
                <span class="yesterday-value">${item.вчера.toLocaleString('ru-RU')}</span>
                <span class="percent-change">${percentChangeText}</span>
            </td>
        `;

        // Определяем класс для ячейки "В этот день недели"
        const thisWeekCellClass = getThisWeekCellClass(index);
        const thisWeekCell = `
            <td class="th_four ${thisWeekCellClass}">${item.вЭтотДеньНедели.toLocaleString('ru-RU')}</td>
        `;

        row.innerHTML = `
            <td class="td_one">${item.показатель}</td>
            <td class="th_two">${item.текущийДень.toLocaleString('ru-RU')}</td>
            ${yesterdayCell}
            ${thisWeekCell}
        `;

        const chartContainer = document.createElement('tr');
        chartContainer.style.display = 'none';
        chartContainer.innerHTML = `
            <td colspan="4">
                <div id="chartContainer${index}" style="height: 300px;"></div>
            </td>
        `;

        row.addEventListener('click', () => toggleChart(index, chartContainer));
        tableBody.appendChild(row);
        tableBody.appendChild(chartContainer);
    });

    // Функция для отображения/скрытия графика
    function toggleChart(index, container) {
        const item = data[index];
        const chartContainer = document.getElementById(`chartContainer${index}`);

        if (container.style.display === 'none') {
            const allCharts = document.querySelectorAll('.chart-container');
            allCharts.forEach(chart => chart.style.display = 'none');
            container.style.display = 'table-row';

            Highcharts.chart(chartContainer, {
                chart: {
                    type: 'line'
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: null,
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false 
                    },
                },
                yAxis: {
                    labels: {
                        enabled: false // Скрываем значения на оси Y
                    },
                    title: {
                        text: '' // Скрываем заголовок оси Y
                    },
                    gridLineWidth: 0
                },
                legend: {
                    enabled: false // Скрываем легенду
                },
                series: [{
                    data: [item.текущийДень, item.вчера, item.вЭтотДеньНедели]
                }]
            });
        } else {
            container.style.display = 'none';
        }
    }

    // Функция для определения класса ячейки "В этот день недели"
    function getThisWeekCellClass(index) {
        if (index === 0) return 'red';
        if (index >= 4 && index <= 7) return 'green';
        if (index === 9) return 'green';
        return '';
    }
});