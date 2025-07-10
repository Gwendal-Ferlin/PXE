# PXE Manager - Interface de Gestion Multi-Proxmox

Une interface web moderne et responsive pour gérer plusieurs serveurs Proxmox, similaire aux interfaces de gestion cloud comme OVH.

## 🚀 Fonctionnalités

### Dashboard Principal
- Vue d'ensemble des serveurs Proxmox
- Statistiques en temps réel (serveurs, VMs, containers, alertes)
- Activité récente du système
- Métriques de performance en temps réel

### Gestion des Serveurs
- Liste de tous les serveurs Proxmox
- Statut en temps réel (en ligne, hors ligne, attention)
- Métriques de performance (CPU, RAM, stockage)
- Actions de gestion (redémarrage, arrêt, console, backup)

### Machines Virtuelles (VMs)
- Vue d'ensemble de toutes les VMs
- Démarrage/arrêt des VMs
- Informations détaillées (OS, ressources allouées)
- Gestion par serveur

### Containers LXC
- Gestion des containers Linux
- Contrôle d'état (démarrage/arrêt)
- Templates et configuration
- Monitoring des ressources

### Stockage
- Vue d'ensemble de l'utilisation du stockage
- Métriques par serveur
- Barres de progression visuelles

### Réseau
- Topologie réseau (à développer)
- Configuration des interfaces

### Monitoring
- Graphiques de performance (à développer)
- Métriques historiques
- Alertes système

### Paramètres
- Configuration de l'interface
- Préférences utilisateur
- Thèmes et langue

## 🎨 Interface Utilisateur

### Design Moderne
- Interface inspirée des plateformes cloud modernes
- Design responsive (desktop, tablette, mobile)
- Thème professionnel avec dégradés et ombres
- Animations fluides et transitions

### Fonctionnalités UX
- Navigation par sidebar avec icônes
- Modal pour les détails et actions
- Notifications toast en temps réel
- Barres de progression animées
- Indicateurs de statut colorés

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec variables CSS, Grid, Flexbox
- **JavaScript ES6+** : Interactivité et gestion des données
- **Font Awesome** : Icônes professionnelles
- **Google Fonts (Inter)** : Typographie moderne

## 📁 Structure du Projet

```
PXE/
├── index.html              # Page principale
├── styles/
│   └── main.css           # Styles CSS principaux
├── js/
│   └── main.js            # JavaScript principal
└── README.md              # Documentation
```

## 🚀 Installation et Utilisation

### Prérequis
- Serveur web (Apache, Nginx, ou serveur de développement)
- Navigateur web moderne

### Installation
1. Clonez ou téléchargez le projet dans votre dossier web
2. Ouvrez `index.html` dans votre navigateur
3. L'interface est prête à utiliser !

### Utilisation
- **Navigation** : Utilisez le menu latéral pour naviguer entre les sections
- **Serveurs** : Cliquez sur "Détails" pour voir les informations d'un serveur
- **VMs/Containers** : Utilisez les boutons play/stop pour contrôler l'état
- **Responsive** : L'interface s'adapte automatiquement aux différentes tailles d'écran

## 📊 Données Simulées

L'interface utilise actuellement des données simulées pour la démonstration :

### Serveurs
- 5 serveurs Proxmox avec différents statuts
- Métriques de performance (CPU, RAM, stockage)
- Informations de cluster et version

### VMs et Containers
- Machines virtuelles avec différents OS
- Containers LXC avec templates variés
- États réalistes (en cours, arrêté)

## 🔧 Personnalisation

### Thème et Couleurs
Modifiez les variables CSS dans `styles/main.css` :
```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    /* ... autres variables */
}
```

### Données
Modifiez les arrays de données dans `js/main.js` :
- `serversData` : Configuration des serveurs
- `vmsData` : Liste des machines virtuelles
- `containersData` : Liste des containers

## 🚧 Fonctionnalités Futures

### Backend Integration
- Connexion à l'API Proxmox réelle
- Authentification utilisateur
- Actions temps réel sur les serveurs

### Fonctionnalités Avancées
- Graphiques de monitoring (Chart.js/D3.js)
- Topologie réseau interactive
- Système d'alertes avancé
- Gestion des backups
- Console web intégrée

### Améliorations UI/UX
- Mode sombre/clair
- Personnalisation du dashboard
- Raccourcis clavier
- Drag & drop pour l'organisation

## 📱 Compatibilité

### Navigateurs Supportés
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Résolutions
- Desktop : 1920x1080 et plus
- Tablette : 768x1024
- Mobile : 375x667 et plus

## 🤝 Contribution

Ce projet est une interface frontend uniquement. Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Testez sur différents navigateurs
4. Soumettez une pull request

## 📝 Notes Techniques

### Performance
- Mise à jour automatique des métriques toutes les 30 secondes
- Animations CSS optimisées avec `transform` et `opacity`
- Lazy loading des sections pour de meilleures performances

### Accessibilité
- Utilisation de balises sémantiques HTML5
- Contrastes de couleurs conformes WCAG
- Navigation au clavier supportée
- Attributs ARIA pour les lecteurs d'écran

## 📄 Licence

Ce projet est fourni à titre éducatif et de démonstration. Libre d'utilisation et de modification.

## 🆘 Support

Pour toute question ou suggestion :
- Consultez les issues du projet
- Proposez des améliorations
- Documentez les bugs rencontrés

---

**Note** : Cette interface est actuellement une démonstration frontend. Pour une utilisation en production, une intégration backend avec l'API Proxmox serait nécessaire. 