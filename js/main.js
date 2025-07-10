// Fonctions de connexion et authentification
let currentUser = null;
let isLoggedIn = false;

// Gestion de la connexion
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.querySelector('.login-btn');
    const btnText = document.querySelector('.btn-text');
    const btnIcon = document.querySelector('.btn-icon');
    
    // Simulation d'une connexion avec délai
    loginBtn.classList.add('loading');
    
    setTimeout(() => {
        // Vérification simple des identifiants (simulation)
        if ((username === 'admin' && password === 'admin') || 
            (username === 'user' && password === 'user') ||
            (username === 'demo' && password === 'demo')) {
            
            // Connexion réussie
            currentUser = {
                username: username,
                displayName: username === 'admin' ? 'Administrateur' : 
                           username === 'user' ? 'Utilisateur' : 'Démo',
                role: username === 'admin' ? 'Super Admin' : 'Utilisateur'
            };
            
            isLoggedIn = true;
            
            // Mettre à jour l'interface utilisateur
            document.getElementById('logged-user-name').textContent = currentUser.displayName;
            document.querySelector('.user-role').textContent = currentUser.role;
            
            // Masquer la page de login et afficher l'application
            showApplication();
            
            // Configurer l'application
            setupApplication();
            
            // Sauvegarder la session si demandé
            saveSession();
            
            // Notification de succès
            setTimeout(() => {
                showNotification(`Bienvenue ${currentUser.displayName} !`, 'success');
            }, 500);
            
        } else {
            // Connexion échouée
            loginBtn.classList.remove('loading');
            showLoginError('Nom d\'utilisateur ou mot de passe incorrect');
        }
    }, 1500); // Simulation d'un délai de connexion
}

// Afficher l'application après connexion
function showApplication() {
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    
    // Animation de transition
    loginPage.style.opacity = '0';
    loginPage.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        loginPage.style.display = 'none';
        mainApp.style.display = 'flex';
        mainApp.style.opacity = '0';
        
        // Fade in de l'application
        setTimeout(() => {
            mainApp.style.opacity = '1';
            mainApp.style.transition = 'opacity 0.5s ease-in-out';
        }, 50);
    }, 300);
}

// Gestion de la déconnexion
function handleLogout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        currentUser = null;
        isLoggedIn = false;
        
        // Animation de transition
        const mainApp = document.getElementById('main-app');
        const loginPage = document.getElementById('login-page');
        
        mainApp.style.opacity = '0';
        
        setTimeout(() => {
            mainApp.style.display = 'none';
            loginPage.style.display = 'flex';
            loginPage.style.opacity = '0';
            loginPage.style.transform = 'scale(0.95)';
            
            // Reset du formulaire
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.querySelector('.login-btn').classList.remove('loading');
            
            // Fade in de la page de login
            setTimeout(() => {
                loginPage.style.opacity = '1';
                loginPage.style.transform = 'scale(1)';
                loginPage.style.transition = 'all 0.3s ease-in-out';
            }, 50);
            
            showNotification('Vous avez été déconnecté avec succès', 'info');
        }, 300);
    }
}

// Afficher les erreurs de connexion
function showLoginError(message) {
    // Créer ou mettre à jour le message d'erreur
    let errorElement = document.querySelector('.login-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'login-error';
        document.querySelector('.login-form').insertBefore(errorElement, document.querySelector('.login-btn'));
    }
    
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    errorElement.style.display = 'flex';
    
    // Supprimer l'erreur après 5 secondes
    setTimeout(() => {
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }, 5000);
}

// Basculer la visibilité du mot de passe
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordEye = document.getElementById('password-eye');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordEye.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        passwordEye.className = 'fas fa-eye';
    }
}

// Vérifier la session au chargement
function checkSession() {
    // Dans une vraie application, on vérifierait ici un token ou une session
    const savedSession = localStorage.getItem('pxe_session');
    
    if (savedSession) {
        try {
            const sessionData = JSON.parse(savedSession);
            if (sessionData.username && sessionData.expiry > Date.now()) {
                // Session valide, connecter automatiquement
                currentUser = sessionData;
                isLoggedIn = true;
                document.getElementById('logged-user-name').textContent = currentUser.displayName;
                document.querySelector('.user-role').textContent = currentUser.role;
                showApplication();
                
                // Configurer l'application après l'affichage
                setTimeout(() => {
                    setupApplication();
                }, 100);
                
                return true;
            } else {
                // Session expirée
                localStorage.removeItem('pxe_session');
            }
        } catch (e) {
            localStorage.removeItem('pxe_session');
        }
    }
    
    return false;
}

// Sauvegarder la session
function saveSession() {
    if (currentUser && document.getElementById('remember').checked) {
        const sessionData = {
            ...currentUser,
            expiry: Date.now() + (8 * 60 * 60 * 1000) // 8 heures
        };
        localStorage.setItem('pxe_session', JSON.stringify(sessionData));
    }
}

// Données simulées pour les serveurs Proxmox
const serversData = [
    {
        id: 'pve-01',
        name: 'PVE-01 (Production)',
        ip: '192.168.1.10',
        status: 'online',
        cpu: 65,
        memory: 78,
        storage: 45,
        vms: 23,
        containers: 12,
        uptime: '45 jours, 12h',
        version: '8.1.4',
        cluster: 'Cluster-Prod'
    },
    {
        id: 'pve-02',
        name: 'PVE-02 (Production)',
        ip: '192.168.1.11',
        status: 'online',
        cpu: 42,
        memory: 56,
        storage: 67,
        vms: 18,
        containers: 8,
        uptime: '32 jours, 8h',
        version: '8.1.4',
        cluster: 'Cluster-Prod'
    },
    {
        id: 'pve-03',
        name: 'PVE-03 (Test)',
        ip: '192.168.1.20',
        status: 'online',
        cpu: 25,
        memory: 34,
        storage: 23,
        vms: 8,
        containers: 15,
        uptime: '12 jours, 3h',
        version: '8.1.3',
        cluster: 'Cluster-Test'
    },
    {
        id: 'pve-04',
        name: 'PVE-04 (Backup)',
        ip: '192.168.1.30',
        status: 'warning',
        cpu: 15,
        memory: 89,
        storage: 92,
        vms: 3,
        containers: 2,
        uptime: '89 jours, 15h',
        version: '8.0.9',
        cluster: 'Standalone'
    },
    {
        id: 'pve-05',
        name: 'PVE-05 (Dev)',
        ip: '192.168.1.40',
        status: 'offline',
        cpu: 0,
        memory: 0,
        storage: 12,
        vms: 0,
        containers: 0,
        uptime: 'Hors ligne',
        version: '8.1.2',
        cluster: 'Standalone'
    }
];

// Données simulées pour les VMs
const vmsData = [
    { id: 'vm-100', name: 'WEB-01', server: 'PVE-01', status: 'running', cpu: 45, memory: 4096, os: 'Ubuntu 22.04' },
    { id: 'vm-101', name: 'DB-01', server: 'PVE-01', status: 'running', cpu: 78, memory: 8192, os: 'Ubuntu 20.04' },
    { id: 'vm-102', name: 'APP-01', server: 'PVE-02', status: 'running', cpu: 23, memory: 2048, os: 'Debian 11' },
    { id: 'vm-103', name: 'DEV-01', server: 'PVE-03', status: 'stopped', cpu: 0, memory: 1024, os: 'CentOS 8' },
    { id: 'vm-104', name: 'TEST-01', server: 'PVE-03', status: 'running', cpu: 12, memory: 2048, os: 'Ubuntu 22.04' }
];

// Données simulées pour les containers
const containersData = [
    { id: 'ct-200', name: 'NGINX-01', server: 'PVE-01', status: 'running', cpu: 12, memory: 512, template: 'debian-11' },
    { id: 'ct-201', name: 'REDIS-01', server: 'PVE-01', status: 'running', cpu: 8, memory: 256, template: 'ubuntu-22.04' },
    { id: 'ct-202', name: 'MONITOR-01', server: 'PVE-02', status: 'running', cpu: 15, memory: 1024, template: 'debian-11' },
    { id: 'ct-203', name: 'BACKUP-01', server: 'PVE-04', status: 'stopped', cpu: 0, memory: 512, template: 'ubuntu-20.04' }
];

// Variables globales
let currentPage = 'dashboard';
let isSidebarOpen = false;

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Vérifier d'abord si une session existe
    if (!checkSession()) {
        // Aucune session, afficher la page de login
        console.log('Aucune session trouvée, affichage de la page de login');
    }
    // Si checkSession() retourne true, setupApplication() sera appelé automatiquement
}

function setupApplication() {
    // Gestionnaires d'événements pour la navigation
    setupNavigation();
    
    // Gestionnaires d'événements pour la sidebar
    setupSidebar();
    
    // Gestionnaires d'événements pour les modals
    setupModals();
    
    // Charger les données initiales
    loadDashboardData();
    loadServersData();
    loadVMsData();
    loadContainersData();
    
    // Démarrer les mises à jour automatiques
    startAutoRefresh();
}

// Configuration de la navigation
function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });
}

// Changement de page
function switchPage(pageName) {
    // Retirer la classe active de tous les éléments de menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Ajouter la classe active au menu sélectionné
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    // Cacher toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page sélectionnée
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Mettre à jour le titre de la page
    updatePageTitle(pageName);
    
    // Charger les données spécifiques à la page
    loadPageData(pageName);
    
    currentPage = pageName;
}

// Mise à jour du titre de la page
function updatePageTitle(pageName) {
    const titleElement = document.querySelector('.page-title');
    const titles = {
        'dashboard': 'Dashboard',
        'servers': 'Serveurs Proxmox',
        'vms': 'Machines Virtuelles',
        'containers': 'Containers LXC',
        'storage': 'Stockage',
        'network': 'Réseau',
        'monitoring': 'Monitoring',
        'settings': 'Paramètres'
    };
    
    if (titleElement && titles[pageName]) {
        titleElement.textContent = titles[pageName];
    }
}

// Configuration de la sidebar
function setupSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            toggleSidebar();
        });
    }
    
    // Fermer la sidebar en cliquant à l'extérieur sur mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) && 
            isSidebarOpen) {
            toggleSidebar();
        }
    });
}

// Basculer la sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
    isSidebarOpen = !isSidebarOpen;
}

// Configuration des modals
function setupModals() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Fermer modal avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Ouvrir un modal
function openModal(title, content) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalContent) modalContent.innerHTML = content;
    if (modalOverlay) modalOverlay.classList.add('active');
    
    document.body.style.overflow = 'hidden';
}

// Fermer le modal
function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// Charger les données du dashboard
function loadDashboardData() {
    loadServersGrid();
}

// Charger la grille des serveurs sur le dashboard
function loadServersGrid() {
    const serversGrid = document.getElementById('servers-grid');
    if (!serversGrid) return;
    
    serversGrid.innerHTML = '';
    
    serversData.slice(0, 4).forEach(server => {
        const serverCard = createServerCard(server, true);
        serversGrid.appendChild(serverCard);
    });
}

// Créer une carte de serveur
function createServerCard(server, compact = false) {
    const card = document.createElement('div');
    card.className = 'server-card';
    card.setAttribute('data-server-id', server.id);
    
    const statusClass = server.status === 'online' ? 'online' : 
                       server.status === 'warning' ? 'warning' : 'offline';
    
    card.innerHTML = `
        <div class="server-header">
            <div>
                <div class="server-name">${server.name}</div>
                <div class="server-ip">${server.ip}</div>
            </div>
            <span class="server-status ${statusClass}">
                <span class="status-dot ${statusClass}"></span>
                ${server.status === 'online' ? 'En ligne' : 
                  server.status === 'warning' ? 'Attention' : 'Hors ligne'}
            </span>
        </div>
        
        <div class="server-metrics">
            <div class="metric">
                <div class="metric-value">${server.cpu}%</div>
                <div class="metric-label">CPU</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${server.cpu}%"></div>
                </div>
            </div>
            <div class="metric">
                <div class="metric-value">${server.memory}%</div>
                <div class="metric-label">RAM</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${server.memory}%"></div>
                </div>
            </div>
            <div class="metric">
                <div class="metric-value">${server.storage}%</div>
                <div class="metric-label">Stockage</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${server.storage}%"></div>
                </div>
            </div>
        </div>
        
        ${compact ? '' : `
        <div class="server-details">
            <div class="detail-row">
                <span>VMs: ${server.vms}</span>
                <span>Containers: ${server.containers}</span>
            </div>
            <div class="detail-row">
                <span>Uptime: ${server.uptime}</span>
                <span>Version: ${server.version}</span>
            </div>
        </div>
        `}
        
        <div class="server-actions">
            <button class="btn-secondary" onclick="viewServerDetails('${server.id}')">
                <i class="fas fa-eye"></i>
                Détails
            </button>
            ${compact ? '' : `
            <button class="btn-secondary" onclick="manageServer('${server.id}')">
                <i class="fas fa-cog"></i>
                Gérer
            </button>
            `}
        </div>
    `;
    
    return card;
}

// Charger les données des serveurs
function loadServersData() {
    const serversList = document.getElementById('servers-list');
    if (!serversList) return;
    
    serversList.innerHTML = '';
    
    serversData.forEach(server => {
        const serverCard = createServerCard(server, false);
        serversList.appendChild(serverCard);
    });
}

// Charger les données des VMs
function loadVMsData() {
    const vmsGrid = document.getElementById('vms-grid');
    if (!vmsGrid) return;
    
    vmsGrid.innerHTML = '';
    
    vmsData.forEach(vm => {
        const vmCard = createVMCard(vm);
        vmsGrid.appendChild(vmCard);
    });
}

// Créer une carte de VM
function createVMCard(vm) {
    const card = document.createElement('div');
    card.className = 'vm-card';
    
    const statusClass = vm.status === 'running' ? 'online' : 'offline';
    
    card.innerHTML = `
        <div class="vm-header">
            <div class="vm-name">${vm.name}</div>
            <span class="vm-status ${statusClass}">
                <span class="status-dot ${statusClass}"></span>
                ${vm.status === 'running' ? 'En cours' : 'Arrêtée'}
            </span>
        </div>
        
        <div class="vm-details">
            <div class="detail-item">
                <span class="detail-label">Serveur:</span>
                <span class="detail-value">${vm.server}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">OS:</span>
                <span class="detail-value">${vm.os}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">CPU:</span>
                <span class="detail-value">${vm.cpu}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">RAM:</span>
                <span class="detail-value">${vm.memory} MB</span>
            </div>
        </div>
        
        <div class="vm-actions">
            <button class="btn-success" onclick="startVM('${vm.id}')" ${vm.status === 'running' ? 'disabled' : ''}>
                <i class="fas fa-play"></i>
            </button>
            <button class="btn-warning" onclick="stopVM('${vm.id}')" ${vm.status === 'stopped' ? 'disabled' : ''}>
                <i class="fas fa-stop"></i>
            </button>
            <button class="btn-secondary" onclick="viewVMDetails('${vm.id}')">
                <i class="fas fa-eye"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Charger les données des containers
function loadContainersData() {
    const containersGrid = document.getElementById('containers-grid');
    if (!containersGrid) return;
    
    containersGrid.innerHTML = '';
    
    containersData.forEach(container => {
        const containerCard = createContainerCard(container);
        containersGrid.appendChild(containerCard);
    });
}

// Créer une carte de container
function createContainerCard(container) {
    const card = document.createElement('div');
    card.className = 'container-card';
    
    const statusClass = container.status === 'running' ? 'online' : 'offline';
    
    card.innerHTML = `
        <div class="container-header">
            <div class="container-name">${container.name}</div>
            <span class="container-status ${statusClass}">
                <span class="status-dot ${statusClass}"></span>
                ${container.status === 'running' ? 'En cours' : 'Arrêté'}
            </span>
        </div>
        
        <div class="container-details">
            <div class="detail-item">
                <span class="detail-label">Serveur:</span>
                <span class="detail-value">${container.server}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Template:</span>
                <span class="detail-value">${container.template}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">CPU:</span>
                <span class="detail-value">${container.cpu}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">RAM:</span>
                <span class="detail-value">${container.memory} MB</span>
            </div>
        </div>
        
        <div class="container-actions">
            <button class="btn-success" onclick="startContainer('${container.id}')" ${container.status === 'running' ? 'disabled' : ''}>
                <i class="fas fa-play"></i>
            </button>
            <button class="btn-warning" onclick="stopContainer('${container.id}')" ${container.status === 'stopped' ? 'disabled' : ''}>
                <i class="fas fa-stop"></i>
            </button>
            <button class="btn-secondary" onclick="viewContainerDetails('${container.id}')">
                <i class="fas fa-eye"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Charger les données spécifiques à une page
function loadPageData(pageName) {
    switch(pageName) {
        case 'servers':
            loadServersData();
            break;
        case 'vms':
            loadVMsData();
            break;
        case 'containers':
            loadContainersData();
            break;
        case 'storage':
            loadStorageData();
            break;
        case 'network':
            loadNetworkData();
            break;
        case 'monitoring':
            loadMonitoringData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

// Fonctions pour les actions sur les serveurs
function viewServerDetails(serverId) {
    const server = serversData.find(s => s.id === serverId);
    if (!server) return;
    
    const content = `
        <div class="server-details-modal">
            <h3>${server.name}</h3>
            <div class="details-grid">
                <div class="detail-item">
                    <strong>Adresse IP:</strong> ${server.ip}
                </div>
                <div class="detail-item">
                    <strong>Status:</strong> 
                    <span class="status ${server.status}">${server.status}</span>
                </div>
                <div class="detail-item">
                    <strong>Version:</strong> ${server.version}
                </div>
                <div class="detail-item">
                    <strong>Cluster:</strong> ${server.cluster}
                </div>
                <div class="detail-item">
                    <strong>Uptime:</strong> ${server.uptime}
                </div>
                <div class="detail-item">
                    <strong>VMs:</strong> ${server.vms}
                </div>
                <div class="detail-item">
                    <strong>Containers:</strong> ${server.containers}
                </div>
            </div>
            
            <div class="resource-usage">
                <h4>Utilisation des ressources</h4>
                <div class="resource-item">
                    <span>CPU: ${server.cpu}%</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${server.cpu}%"></div>
                    </div>
                </div>
                <div class="resource-item">
                    <span>RAM: ${server.memory}%</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${server.memory}%"></div>
                    </div>
                </div>
                <div class="resource-item">
                    <span>Stockage: ${server.storage}%</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${server.storage}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    openModal(`Détails - ${server.name}`, content);
}

function manageServer(serverId) {
    const server = serversData.find(s => s.id === serverId);
    if (!server) return;
    
    const content = `
        <div class="server-management">
            <h3>Gestion de ${server.name}</h3>
            <div class="management-actions">
                <button class="btn-primary">
                    <i class="fas fa-power-off"></i>
                    Redémarrer
                </button>
                <button class="btn-warning">
                    <i class="fas fa-pause"></i>
                    Arrêter
                </button>
                <button class="btn-secondary">
                    <i class="fas fa-terminal"></i>
                    Console
                </button>
                <button class="btn-secondary">
                    <i class="fas fa-download"></i>
                    Backup
                </button>
            </div>
        </div>
    `;
    
    openModal(`Gestion - ${server.name}`, content);
}

// Fonctions pour les actions sur les VMs
function startVM(vmId) {
    console.log(`Démarrage de la VM ${vmId}`);
    // Simuler le démarrage
    const vm = vmsData.find(v => v.id === vmId);
    if (vm) {
        vm.status = 'running';
        vm.cpu = Math.floor(Math.random() * 50) + 10;
        loadVMsData();
        showNotification('VM démarrée avec succès', 'success');
    }
}

function stopVM(vmId) {
    console.log(`Arrêt de la VM ${vmId}`);
    // Simuler l'arrêt
    const vm = vmsData.find(v => v.id === vmId);
    if (vm) {
        vm.status = 'stopped';
        vm.cpu = 0;
        loadVMsData();
        showNotification('VM arrêtée avec succès', 'success');
    }
}

function viewVMDetails(vmId) {
    const vm = vmsData.find(v => v.id === vmId);
    if (!vm) return;
    
    const content = `
        <div class="vm-details-modal">
            <h3>${vm.name}</h3>
            <div class="details-grid">
                <div class="detail-item">
                    <strong>ID:</strong> ${vm.id}
                </div>
                <div class="detail-item">
                    <strong>Serveur:</strong> ${vm.server}
                </div>
                <div class="detail-item">
                    <strong>OS:</strong> ${vm.os}
                </div>
                <div class="detail-item">
                    <strong>Status:</strong> ${vm.status}
                </div>
                <div class="detail-item">
                    <strong>CPU:</strong> ${vm.cpu}%
                </div>
                <div class="detail-item">
                    <strong>RAM:</strong> ${vm.memory} MB
                </div>
            </div>
        </div>
    `;
    
    openModal(`Détails VM - ${vm.name}`, content);
}

// Fonctions pour les actions sur les containers
function startContainer(containerId) {
    console.log(`Démarrage du container ${containerId}`);
    const container = containersData.find(c => c.id === containerId);
    if (container) {
        container.status = 'running';
        container.cpu = Math.floor(Math.random() * 30) + 5;
        loadContainersData();
        showNotification('Container démarré avec succès', 'success');
    }
}

function stopContainer(containerId) {
    console.log(`Arrêt du container ${containerId}`);
    const container = containersData.find(c => c.id === containerId);
    if (container) {
        container.status = 'stopped';
        container.cpu = 0;
        loadContainersData();
        showNotification('Container arrêté avec succès', 'success');
    }
}

function viewContainerDetails(containerId) {
    const container = containersData.find(c => c.id === containerId);
    if (!container) return;
    
    const content = `
        <div class="container-details-modal">
            <h3>${container.name}</h3>
            <div class="details-grid">
                <div class="detail-item">
                    <strong>ID:</strong> ${container.id}
                </div>
                <div class="detail-item">
                    <strong>Serveur:</strong> ${container.server}
                </div>
                <div class="detail-item">
                    <strong>Template:</strong> ${container.template}
                </div>
                <div class="detail-item">
                    <strong>Status:</strong> ${container.status}
                </div>
                <div class="detail-item">
                    <strong>CPU:</strong> ${container.cpu}%
                </div>
                <div class="detail-item">
                    <strong>RAM:</strong> ${container.memory} MB
                </div>
            </div>
        </div>
    `;
    
    openModal(`Détails Container - ${container.name}`, content);
}

// Fonctions de chargement des autres pages
function loadStorageData() {
    const storageOverview = document.querySelector('.storage-overview');
    if (!storageOverview) return;
    
    storageOverview.innerHTML = `
        <div class="storage-section">
            <h3>Stockage par serveur</h3>
            <div class="storage-grid">
                ${serversData.map(server => `
                    <div class="storage-card">
                        <h4>${server.name}</h4>
                        <div class="storage-usage">
                            <span>Utilisation: ${server.storage}%</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${server.storage}%"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function loadNetworkData() {
    const networkTopology = document.querySelector('.network-topology');
    if (!networkTopology) return;
    
    networkTopology.innerHTML = `
        <div class="network-section">
            <h3>Topologie Réseau</h3>
            <div class="network-diagram">
                <p>Diagramme de réseau à implémenter</p>
            </div>
        </div>
    `;
}

function loadMonitoringData() {
    const monitoringDashboard = document.querySelector('.monitoring-dashboard');
    if (!monitoringDashboard) return;
    
    monitoringDashboard.innerHTML = `
        <div class="monitoring-section">
            <h3>Métriques de Performance</h3>
            <div class="charts-grid">
                <div class="chart-placeholder">
                    <h4>Utilisation CPU</h4>
                    <p>Graphique à implémenter</p>
                </div>
                <div class="chart-placeholder">
                    <h4>Utilisation RAM</h4>
                    <p>Graphique à implémenter</p>
                </div>
            </div>
        </div>
    `;
}

function loadSettingsData() {
    const settingsSections = document.querySelector('.settings-sections');
    if (!settingsSections) return;
    
    settingsSections.innerHTML = `
        <div class="settings-section">
            <h3>Configuration Générale</h3>
            <div class="settings-form">
                <div class="form-group">
                    <label>Thème:</label>
                    <select>
                        <option>Clair</option>
                        <option>Sombre</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Langue:</label>
                    <select>
                        <option>Français</option>
                        <option>English</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

// Système de notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-supprimer après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Mise à jour automatique des données
function startAutoRefresh() {
    setInterval(() => {
        // Simuler la mise à jour des métriques
        serversData.forEach(server => {
            if (server.status === 'online') {
                server.cpu = Math.max(10, Math.min(90, server.cpu + (Math.random() - 0.5) * 10));
                server.memory = Math.max(20, Math.min(95, server.memory + (Math.random() - 0.5) * 5));
            }
        });
        
        // Recharger les données de la page actuelle
        if (currentPage === 'dashboard') {
            loadServersGrid();
        } else {
            loadPageData(currentPage);
        }
    }, 30000); // Mise à jour toutes les 30 secondes
}

// Fonction de recherche
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // Implémenter la logique de recherche ici
            console.log('Recherche:', query);
        });
    }
}

// Gestionnaire de redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isSidebarOpen) {
        toggleSidebar();
    }
}); 