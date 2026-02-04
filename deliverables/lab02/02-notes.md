## Objectif

Mettre en place un script CI pour automatiser : dépendances, type-check, lint, build et tests.

## Réalisé (essentiel)

- `pipelines/pipelines.sh` : pnpm install → typecheck → lint → build → test.
- ESLint configuré pour Vue+TS ; ajout d’un ignore pour `.output` (évite erreurs sur artefacts).
- Vitest ajouté (`vite.config.ts`, `tests/`) + tests unitaires pour `Tile`.
- Smoke-test : `pnpm build && pnpm preview` + `curl` sur la racine.

## Commandes clés

- pnpm install
- pnpm nuxt typecheck
- pnpm lint / pnpm lint:fix
- pnpm build && pnpm preview
- pnpm test

## Problèmes notables

- ESLint analysait `.output` → ajouter `.output/**` aux ignores.
- ESLint v9 (flat config) oblige parfois à adapter la config (`eslint.config.cjs`).
- Vitest nécessite `@vitejs/plugin-vue` et `jsdom` + `tests/setup.ts` pour les matchers.
- `<script setup>` ne permet pas les `export` : tester via le DOM ou extraire la config.

## Apprentissage

- Exclure les artefacts de build des outils statiques évite beaucoup de faux positifs.
- La migration vers ESLint v9 (flat config) demande d'adapter la manière d'écrire la config; avec `type: "module"` privilégier `.cjs` pour les fichiers CommonJS.
- Pour tester des composants Vue : configurer `@vitejs/plugin-vue`, `jsdom` et un `tests/setup.ts` pour matchers, et préférer les tests DOM quand `<script setup>` empêche d'exporter.
- Ajouter un smoke-test (build → preview → `curl` → stop) apporte une vérification rapide en CI.
