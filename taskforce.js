const taskforceData = [
    { name: 'Khairunnisak', completed: 0, pending: 98 },
    { name: 'Yasier', completed: 0, pending: 99 },
    { name: 'Aishah Albasri', completed: 0, pending: 99 },
    { name: "Mu'adz", completed: 0, pending: 99 },
    { name: 'Mislia', completed: 0, pending: 99 },
    { name: 'Najiha', completed: 0, pending: 99 },
    { name: 'Noorfirdaus', completed: 0, pending: 98 },
    { name: 'Ishak', completed: 0, pending: 99 },
    { name: 'Syafiq', completed: 0, pending: 99 },
    { name: 'Ali Hussini', completed: 0, pending: 98 },
    { name: 'Shahir', completed: 0, pending: 98 },
    { name: 'Faiz Ikmal', completed: 0, pending: 99 },
    { name: 'Safwan', completed: 0, pending: 99 },
    { name: 'Shahrul Zaman', completed: 0, pending: 98 },
    { name: 'Firdzuan', completed: 0, pending: 98 },
    { name: 'Faizal', completed: 0, pending: 99 },
    { name: 'Izham', completed: 0, pending: 98 }
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
