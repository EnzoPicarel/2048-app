#!/bin/bash

# Script d'intégration continue pour le projet 2048
# Étapes: dépendances, type-checking, analyse statique, construction, tests

set -e  # Arrêter si une commande échoue

echo "=== Étape 1: Récupération des dépendances ==="
pnpm install

echo ""
echo "=== Étape 2: Vérification du typage statique du code ==="
pnpm nuxt typecheck

echo ""
echo "=== Étape 3: Analyse statique (ESLint) ==="
pnpm lint

echo ""
echo "=== Étape 4: Construction du \"package\" à déployer ==="
pnpm build

echo ""
echo "=== Pipeline terminé avec succès ==="
