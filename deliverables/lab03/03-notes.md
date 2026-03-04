## Apprentissage

- Découverte de GitHub Actions et de la syntaxe YAML pour les workflows
- Utilisation des actions prédéfinies (`actions/checkout`, `actions/setup-node`, `pnpm/action-setup`, `actions/upload-artifact`)
- Mise en place de triggers: `workflow_dispatch` (manuel) et `push` (automatique sur branches)
- Utilisation du cache pnpm pour optimiser les temps d'exécution
- Publication d'artifacts pour conserver les builds
- Installation de l'extension VS Code GitHub Actions

## Difficultés rencontrées

- Configuration de pnpm dans GitHub Actions
  - Résolu en utilisant `pnpm/action-setup@v2` avec `version: latest` et `cache: "pnpm"` dans setup-node
- Vérification du fonctionnement du package build
  - Résolu en lançant `pnpm nuxt preview` en arrière-plan, testant avec curl, puis tuant le processus
- Gestion du bon chemin d'artifact
  - Résolu en uploadant le dossier `output` avec `if: success()`
