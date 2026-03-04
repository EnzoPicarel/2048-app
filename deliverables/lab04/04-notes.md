## Apprentissage

- Configuration des triggers GitHub Actions : `push`, `pull_request`, `workflow_dispatch` avec `paths-ignore` pour exclure certains dossiers
- Utilisation de conditions (`if`) pour différencier le comportement selon le type d'événement (commit sur `main` vs Pull Request)
- Parallélisation des jobs avec `needs` pour optimiser le temps d'exécution du pipeline
- Mise en place du cache pnpm avec `actions/cache` pour accélérer l'installation des dépendances entre jobs
- Gestion des artifacts avec `actions/upload-artifact` et configuration de la rétention (`retention-days`) selon le contexte
- Utilisation des inputs `workflow_dispatch` (boolean, choice) pour paramétrer l'exécution manuelle
- Variables d'environnement au niveau workflow pour centraliser les configurations (ex: `NODE_VERSION`)

## Difficultés rencontrées

- Syntaxe des conditions GitHub Actions avec les contextes `github.event_name` et `github.ref`
  - Résolu en consultant la documentation sur les expressions conditionnelles
- Configuration du cache pnpm nécessitant de spécifier le bon chemin du lock file
  - Résolu avec `key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}`
- Rétention conditionnelle des artifacts selon la branche
  - Résolu avec une expression ternaire : `retention-days: ${{ github.ref == 'refs/heads/main' && 7 || 1 }}`
