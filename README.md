# MyClaude Marketplace Registry

[![MyClaude](https://myclaude.sh/badge/available.svg)](https://myclaude.sh)

This repository serves as the **plugin marketplace catalog** for [MyClaude](https://myclaude.sh) — the curated marketplace for the Claude Code ecosystem.

## For Claude Code Users

Register MyClaude as a plugin marketplace:

```
/plugin marketplace add myclaude-sh/registry
```

Then browse and install products:

```
/plugin install strata@myclaude-sh
```

## For Vercel Skills Users

Browse individual product repos in this org and install via:

```bash
npx skills add myclaude-sh/<product-name>
```

## How It Works

- `marketplace.json` is automatically updated when creators publish products on [myclaude.sh](https://myclaude.sh)
- Each product is mirrored as a separate repo in this org with Agent Skills spec-compliant metadata
- Free products include full source; paid products include metadata only

## Links

- **Marketplace:** [myclaude.sh](https://myclaude.sh)
- **CLI:** `npm install -g @myclaude-cli/cli`
- **API Spec:** [myclaude.sh/specs/openapi.yaml](https://myclaude.sh/specs/openapi.yaml)
- **Agent Discovery:** [myclaude.sh/.well-known/agent-card.json](https://myclaude.sh/.well-known/agent-card.json)

---

*Automatically maintained by the MyClaude platform. To publish your own products, run `myclaude publish`.*
