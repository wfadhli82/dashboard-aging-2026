const taskforceData = [
    { name: 'Khairunnisak', completed: 28, pending: 70 },
    { name: 'Yasier', completed: 52, pending: 47 },
    { name: 'Aishah Albasri', completed: 44, pending: 55 },
    { name: "Mu'adz", completed: 61, pending: 38 },
    { name: 'Mislia', completed: 37, pending: 62 },
    { name: 'Najiha', completed: 48, pending: 51 },
    { name: 'Noorfirdaus', completed: 35, pending: 63 },
    { name: 'Ishak', completed: 70, pending: 29 },
    { name: 'Syafiq', completed: 58, pending: 41 },
    { name: 'Ali Hussini', completed: 43, pending: 55 },
    { name: 'Shahir', completed: 64, pending: 34 },
    { name: 'Faiz Ikmal', completed: 29, pending: 70 },
    { name: 'Safwan', completed: 76, pending: 23 },
    { name: 'Shahrul Zaman', completed: 51, pending: 47 },
    { name: 'Firdzuan', completed: 67, pending: 31 },
    { name: 'Faizal', completed: 55, pending: 44 },
    { name: 'Izham', completed: 40, pending: 58 }
];

const formatNumber = value => new Intl.NumberFormat('ms-MY').format(value);

function renderDashboard() {
    const chart = document.getElementById('taskforceChart');
    const totals = taskforceData.reduce((result, officer) => ({
        completed: result.completed + officer.completed,
        pending: result.pending + officer.pending
    }), { completed: 0, pending: 0 });
    const grandTotal = totals.completed + totals.pending;

    document.getElementById('grandTotal').textContent = formatNumber(grandTotal);
    document.getElementById('completedTotal').textContent = formatNumber(totals.completed);
    document.getElementById('pendingTotal').textContent = formatNumber(totals.pending);
    document.getElementById('completedPercent').textContent = `${Math.round(totals.completed / grandTotal * 100)}% daripada keseluruhan`;
    document.getElementById('pendingPercent').textContent = `${Math.round(totals.pending / grandTotal * 100)}% daripada keseluruhan`;

    chart.replaceChildren(...taskforceData.map(officer => {
        const total = officer.completed + officer.pending;
        const row = document.createElement('div');
        row.className = 'chart-row';
        row.setAttribute('role', 'listitem');
        row.setAttribute('aria-label', `${officer.name}: ${officer.completed} telah diperaku, ${officer.pending} belum diperaku`);

        const completedLabel = officer.completed >= 8 ? String(officer.completed) : '';
        const pendingLabel = officer.pending >= 8 ? String(officer.pending) : '';
        row.innerHTML = `
            <span class="officer-name" title="${officer.name}">${officer.name}</span>
            <span class="bar-track">
                <span class="bar-segment bar-completed" style="width:${officer.completed / total * 100}%">${completedLabel}</span>
                <span class="bar-segment bar-pending" style="width:${officer.pending / total * 100}%">${pendingLabel}</span>
            </span>
            <span class="row-total">${total}</span>`;
        return row;
    }));

    document.getElementById('renderedAt').textContent = `Paparan dijana: ${new Intl.DateTimeFormat('ms-MY', {
        dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kuala_Lumpur'
    }).format(new Date())}`;
}

renderDashboard();
