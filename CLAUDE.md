# CLAUDE.md — La Casa de Burger (lacasadeburger)

> Mis à jour : Session du 05/09/2026

---

## 🎯 PROJET

Site vitrine + commande en ligne pour le restaurant **La Casa de Burger** (burgers gourmet artisanaux), Torrevieja, Espagne. React + Vite, multilingue (13 langues).

**Domaine :** https://lacasadeburger.es
**Repo GitHub :** lacasadeburger/restaurant
**Adresse :** Av. Diego Ramírez Pastor, 142, 03181 Torrevieja (Centro)
**Téléphone / WhatsApp :** +34 602 597 210
**Horaires :** Lun-Sam 13h-23h, fermé dimanche

---

## 🏗️ DÉPLOIEMENT — ⚠️ NE PAS UTILISER `npm run ship` SANS VÉRIFIER

Le script `npm run ship` fait `git add . && git commit -m "<message codé en dur et périmé>" && git push origin main && npm run build && node deploy.js`.

- Il commite **tout** ce qui traîne dans le repo (`git add .`), pas seulement la tâche en cours.
- Le message de commit est figé dans package.json ("Performance: System Fonts, WebP flags and CNAME setup") — **faux** pour tout autre changement.
- **Toujours** scinder manuellement : `git add <fichiers précis>` → commit avec message correct → `git push` → `npm run build && node deploy.js` (déploiement OVH réel + purge cache Cloudflare).
- `npm run deploy` (gh-pages) et `npm run ovh-deploy` existent aussi mais **`node deploy.js` après build est le flux de déploiement réel utilisé** (upload OVH + purge Cloudflare).

---

## ✅ SESSION 05/09/2026 — Fait

- [x] Créé `public/llms.txt` (H1 + résumé + liens) — corrige l'avertissement "llms.txt ne suit pas les recommandations" d'un outil d'audit SEO/accessibilité
- [x] Déployé sur OVH + purge cache Cloudflare
- [x] Diagnostiqué 18 fichiers modifiés non commités : 17 étaient du bruit CRLF/LF pur (Windows), 1 (`.claude/settings.local.json`) avait un vrai contenu (permissions locales, sans risque)
- [x] Ajouté `.gitattributes` (`* text=auto eol=lf`) pour empêcher la récidive CRLF
- [x] Renormalisé les 17 fichiers en LF (commit séparé) + réécrit réellement les fichiers sur disque (git ne réécrit pas un fichier si son cache d'index le croit à jour — il a fallu `rm` + `git checkout HEAD --` fichier par fichier)

---

## 🐛 BUGS / POINTS EN ATTENTE

- `.claude/settings.local.json` reste modifié et non commité (accumulation de permissions locales Claude Code) — pas bloquant, à commiter quand pertinent
- Fichiers `src/Order copy.jsx` et `src/Order copy 2.jsx` : copies de travail présentes dans le repo — à vérifier si elles doivent être supprimées ou sont volontaires

---

## 🔮 PRIORITÉS PROCHAINE SESSION

1. Vérifier si `src/Order copy.jsx` / `src/Order copy 2.jsx` doivent être nettoyées du repo
2. Décider du sort de `.claude/settings.local.json` (commit ou laisser local)
3. Revenir sur l'audit SEO/accessibilité complet du site (au-delà de llms.txt) si d'autres avertissements existent
