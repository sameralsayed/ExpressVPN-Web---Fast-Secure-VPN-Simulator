// script.js
let isConnected = false;
let currentServer = { name: "United States", city: "New York", flag: "🇺🇸", ping: 42 };

const servers = [
    { name: "United States", city: "New York", flag: "🇺🇸", ping: 42 },
    { name: "United Kingdom", city: "London", flag: "🇬🇧", ping: 68 },
    { name: "Japan", city: "Tokyo", flag: "🇯🇵", ping: 112 },
    { name: "Germany", city: "Frankfurt", flag: "🇩🇪", ping: 33 },
    { name: "Singapore", city: "Singapore", flag: "🇸🇬", ping: 89 },
    { name: "Australia", city: "Sydney", flag: "🇦🇺", ping: 145 },
    { name: "Brazil", city: "São Paulo", flag: "🇧🇷", ping: 178 },
    { name: "India", city: "Mumbai", flag: "🇮🇳", ping: 95 }
];

function renderServers() {
    const container = document.getElementById('serverList');
    container.innerHTML = servers.map((server, index) => `
        <div class="col-6 col-md-4 col-lg-3">
            <div onclick="selectServer(${index})" class="server-item d-flex align-items-center gap-3 p-3 bg-white bg-opacity-10 rounded-3 text-white cursor-pointer">
                <span class="fs-3">${server.flag}</span>
                <div class="flex-grow-1">
                    <h6 class="mb-0">${server.name}</h6>
                    <small class="opacity-75">${server.city}</small>
                </div>
                <div class="text-end">
                    <small class="text-muted">${server.ping}ms</small>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleConnection() {
    isConnected = !isConnected;
    const hero = document.querySelector('#connect');
    const statusEl = document.getElementById('connectionStatus');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const globe = document.getElementById('globeIcon');
    const vpnCard = document.querySelector('.vpn-card');

    if (isConnected) {
        hero.classList.add('connected');
        statusEl.textContent = 'CONNECTED';
        statusEl.parentElement.classList.remove('bg-success', 'bg-opacity-25');
        statusEl.parentElement.classList.add('bg-primary', 'bg-opacity-25', 'text-primary');
        btnText.textContent = 'DISCONNECT';
        btnIcon.className = 'fas fa-power-off me-2 text-white';
        btnIcon.style.transform = 'rotate(45deg)';
        globe.className = 'fas fa-globe fa-7x text-primary';
        vpnCard.classList.add('border-primary');
        
        // Fake IP change
        document.getElementById('currentIP').innerHTML = `45.12.87.${Math.floor(Math.random()*200)} • <span class="text-success">12ms</span>`;
    } else {
        hero.classList.remove('connected');
        statusEl.textContent = 'DISCONNECTED';
        statusEl.parentElement.classList.add('bg-success', 'bg-opacity-25');
        statusEl.parentElement.classList.remove('bg-primary', 'bg-opacity-25', 'text-primary');
        btnText.textContent = 'CONNECT NOW';
        btnIcon.className = 'fas fa-power-off me-2';
        btnIcon.style.transform = '';
        globe.className = 'fas fa-globe fa-7x text-muted';
        document.getElementById('currentIP').innerHTML = '192.168.1.1 • 105ms';
        vpnCard.classList.remove('border-primary');
    }
}

function selectServer(index) {
    currentServer = servers[index];
    document.getElementById('currentLocation').innerHTML = `${currentServer.flag} ${currentServer.name} • ${currentServer.city}`;
    
    // Auto-connect if not connected
    if (!isConnected) {
        toggleConnection();
    }
    
    // Scroll back to connect section
    document.getElementById('connect').scrollIntoView({ behavior: 'smooth' });
}

function runSpeedTest() {
    const btn = document.querySelector('button[onclick="runSpeedTest()"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> TESTING...`;
    btn.disabled = true;
    
    setTimeout(() => {
        const speed = Math.floor(Math.random() * 380) + 120;
        document.getElementById('speedText').innerHTML = `${speed} Mbps <span class="text-success">↑</span>`;
        
        // Show toast
        const toastHTML = `
            <div class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert">
                <div class="d-flex">
                    <div class="toast-body">🚀 Speed test complete!<br>Download: ${speed} Mbps • Upload: ${Math.floor(speed * 0.7)} Mbps</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>`;
        const temp = document.createElement('div');
        temp.innerHTML = toastHTML;
        document.body.appendChild(temp.firstElementChild);
        new bootstrap.Toast(document.querySelector('.toast')).show();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1200);
    }, 2100);
}

// Initialize everything
window.onload = function() {
    renderServers();
    
    console.log('%c🚀 ExpressVPN Web loaded – full secure VPN simulation ready!', 'color:#10b981; font-size:14px; font-weight:bold;');
    
    // Keyboard shortcut hint
    console.log('💡 Press "C" anywhere to quick connect');
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' || e.key === 'C') toggleConnection();
    });
};
