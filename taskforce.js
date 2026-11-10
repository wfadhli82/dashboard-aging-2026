const taskforceData = [
    {
        "name": "Khairunnisak",
        "completed": 28,
        "pending": 70
    },
    {
        "name": "Yasier",
        "completed": 44,
        "pending": 55
    },
    {
        "name": "Aishah Albasri",
        "completed": 18,
        "pending": 81
    },
    {
        "name": "Mu'adz",
        "completed": 17,
        "pending": 82
    },
    {
        "name": "Mislia",
        "completed": 15,
        "pending": 84
    },
    {
        "name": "Najiha",
        "completed": 22,
        "pending": 77
    },
    {
        "name": "Noorfirdaus",
        "completed": 69,
        "pending": 29
    },
    {
        "name": "Ishak",
        "completed": 22,
        "pending": 77
    },
    {
        "name": "Syafiq",
        "completed": 33,
        "pending": 66
    },
    {
        "name": "Ali Hussini",
        "completed": 23,
        "pending": 75
    },
    {
        "name": "Shahir",
        "completed": 43,
        "pending": 55
    },
    {
        "name": "Faiz Ikmal",
        "completed": 13,
        "pending": 86
    },
    {
        "name": "Safwan",
        "completed": 45,
        "pending": 54
    },
    {
        "name": "Shahrul Zaman",
        "completed": 37,
        "pending": 61
    },
    {
        "name": "Firdzuan",
        "completed": 42,
        "pending": 56
    },
    {
        "name": "Faizal",
        "completed": 24,
        "pending": 75
    },
    {
        "name": "Izham",
        "completed": 31,
        "pending": 67
    }
];

const dataUpdatedAt = new Date('2026-11-10T23:45:51.993Z');

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
