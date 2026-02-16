# Sistema de Stages et Formations

## Esquema de Datos

### Stage (Modelo Principal)
Campos para crear un nuevo stage desde el dashboard:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **title** | String | ✅ | Título del stage/formation |
| **date** | String | ✅ | Fecha del stage (formato: YYYY-MM-DD) |
| **location** | String | ✅ | Lieu du stage (Paris, France, etc) |
| **description** | String | ✅ | Description détaillée du stage |
| **email** | String | ✅ | Email de contact principal |
| **phone** | String | ✅ | Téléphone de contact |
| **formatrice** | String | ❌ | Nom de la formatrice |
| **country** | String | ❌ | Pays du stage |
| **contact.name** | String | ❌ | Nom du contact (optionnel) |
| **status** | Enum | Auto | published, draft, archived |
| **createdAt** | Date | Auto | Created timestamp |
| **updatedAt** | Date | Auto | Updated timestamp |

### StageRegistration (Inscriptions)
Généré automatiquement lors d'une inscription:

| Campo | Tipo | Description |
|-------|------|-------------|
| **stageId** | ObjectId | Reference au Stage |
| **stageTitle** | String | Titre du stage (copié) |
| **stageDate** | String | Date du stage (copiée) |
| **name** | String | Nom de la personne inscrite |
| **email** | String | Email de l'inscrit |
| **phone** | String | Téléphone de l'inscrit |
| **status** | Enum | pending, confirmed, cancelled |
| **createdAt** | Date | Created timestamp |
| **updatedAt** | Date | Updated timestamp |

## Flux de Utilisation

### 1. Dashboard - Créer un Stage
1. Aller à **Tableau de Bord**
2. Cliquer sur **"+ Nouveau Stage"**
3. Remplir les champs obligatoires (*)
4. Cliquer sur **"Créer le stage"**
5. Le stage apparaît dans la liste

### 2. Dashboard - Modifier un Stage
1. Dans la liste des stages, cliquer sur **"✏️ Modifier"**
2. Les champs se pré-remplissent
3. Modifier les informations
4. Cliquer sur **"Mettre à jour"**

### 3. Dashboard - Voir les Inscriptions
1. Aller à **"Inscriptions à Stages et Formations"**
2. Voir tous les inscrits au stage
3. Gérer le statut: En attente → Confirmé → Annulé
4. Supprimer une inscription si nécessaire

### 4. Page Publique - S'inscrire
1. Accéder à `/stages-et-formations-dynanique` (ou autre URL)
2. Voir les cards avec les infos du stage
3. Cliquer sur **"S'inscrire au stage"**
4. Remplir: Nom, Email, Téléphone
5. Confirmer l'inscription → email reçu

## Routes API

### Stages
- **GET** `/api/stages` - Récupérer tous les stages
- **GET** `/api/stages?status=published` - Filtrer par statut
- **POST** `/api/stages` - Créer un stage
- **PUT** `/api/stages` - Modifier un stage
- **DELETE** `/api/stages?id=...` - Supprimer un stage

### Inscriptions
- **GET** `/api/stage-registrations` - Toutes les inscriptions
- **GET** `/api/stage-registrations?stageId=...` - Inscriptions d'un stage
- **POST** `/api/stage-registrations` - Créer une inscription
- **PUT** `/api/stage-registrations` - Modifier le statut
- **DELETE** `/api/stage-registrations?id=...` - Supprimer

## Composants Frontend

### StageCard.jsx
Affiche une carte stage avec:
- Titre, date, lieu, formatrice
- Description du stage
- Coordonnées de contact
- **Bouton "S'inscrire au stage"**

### StageRegistrationModal.jsx
Formulaire modal d'inscription avec:
- Champ Nom *
- Champ Email *
- Champ Téléphone *
- Validation automatique
- Message succes/erreur

## Fonctionnalités Principales

✅ **Dashboard Admin**
- Créer, modifier, supprimer stages
- Voir et gérer inscriptions
- Changer le statut des inscrits

✅ **Page Publique**
- Voir les stages disponibles
- S'inscrire à un stage
- Validation des données

✅ **Base de Données**
- MongoDB avec Mongoose
- Indexation pour performances
- Validation des emails et téléphones

## Prochaines Étapes (Optionnel)

- [ ] Emails de confirmation automatiques
- [ ] Limite de places par stage
- [ ] Calendrier interactif
- [ ] Export des inscrits en CSV
- [ ] Notifications admin par email
- [ ] Annulation d'inscription par l'utilisateur
