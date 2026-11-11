const taskforceData = [
    {
        "name": "Khairunnisak",
        "completed": 40,
        "pending": 58
    },
    {
        "name": "Yasier",
        "completed": 78,
        "pending": 21
    },
    {
        "name": "Aishah Albasri",
        "completed": 32,
        "pending": 67
    },
    {
        "name": "Mu'adz",
        "completed": 29,
        "pending": 70
    },
    {
        "name": "Mislia",
        "completed": 29,
        "pending": 70
    },
    {
        "name": "Najiha",
        "completed": 43,
        "pending": 56
    },
    {
        "name": "Noorfirdaus",
        "completed": 85,
        "pending": 13
    },
    {
        "name": "Ishak",
        "completed": 58,
        "pending": 41
    },
    {
        "name": "Syafiq",
        "completed": 65,
        "pending": 34
    },
    {
        "name": "Ali Hussini",
        "completed": 26,
        "pending": 72
    },
    {
        "name": "Shahir",
        "completed": 68,
        "pending": 30
    },
    {
        "name": "Faiz Ikmal",
        "completed": 15,
        "pending": 84
    },
    {
        "name": "Safwan",
        "completed": 53,
        "pending": 46
    },
    {
        "name": "Shahrul Zaman",
        "completed": 52,
        "pending": 46
    },
    {
        "name": "Firdzuan",
        "completed": 73,
        "pending": 25
    },
    {
        "name": "Faizal",
        "completed": 34,
        "pending": 65
    },
    {
        "name": "Izham",
        "completed": 48,
        "pending": 50
    }
];

const dataUpdatedAt = new Date('2026-11-11T23:37:58.168Z');

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
