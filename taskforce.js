const taskforceData = [
    {
        "name": "Khairunnisak",
        "completed": 59,
        "pending": 39
    },
    {
        "name": "Yasier",
        "completed": 78,
        "pending": 21
    },
    {
        "name": "Aishah Albasri",
        "completed": 55,
        "pending": 44
    },
    {
        "name": "Mu'adz",
        "completed": 31,
        "pending": 68
    },
    {
        "name": "Mislia",
        "completed": 38,
        "pending": 61
    },
    {
        "name": "Najiha",
        "completed": 47,
        "pending": 52
    },
    {
        "name": "Noorfirdaus",
        "completed": 98,
        "pending": 0
    },
    {
        "name": "Ishak",
        "completed": 63,
        "pending": 36
    },
    {
        "name": "Syafiq",
        "completed": 71,
        "pending": 28
    },
    {
        "name": "Ali Hussini",
        "completed": 42,
        "pending": 56
    },
    {
        "name": "Shahir",
        "completed": 84,
        "pending": 14
    },
    {
        "name": "Faiz Ikmal",
        "completed": 29,
        "pending": 70
    },
    {
        "name": "Safwan",
        "completed": 53,
        "pending": 46
    },
    {
        "name": "Shahrul Zaman",
        "completed": 66,
        "pending": 32
    },
    {
        "name": "Firdzuan",
        "completed": 77,
        "pending": 21
    },
    {
        "name": "Faizal",
        "completed": 49,
        "pending": 50
    },
    {
        "name": "Izham",
        "completed": 69,
        "pending": 29
    }
];

const dataUpdatedAt = new Date('2026-11-12T14:30:36.356Z');

const formatNumber = value => new Intl.NumberFormat('ms-MY').format(value);

const rankOfficers = officers => officers
    .map((officer, originalIndex) => ({ ...officer, originalIndex }))
    .sort((first, second) => second.completed - first.completed
        || first.originalIndex - second.originalIndex);

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

    chart.replaceChildren(...rankOfficers(taskforceData).map(officer => {
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

    document.getElementById('renderedAt').textContent = `Data dikemas kini: ${new Intl.DateTimeFormat('ms-MY', {
        dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kuala_Lumpur'
    }).format(dataUpdatedAt)}`;
}

renderDashboard();
