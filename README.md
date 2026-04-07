# myClaude Registry

> The plugin marketplace catalog for [myClaude](https://www.myclaude.sh) — the only Claude Code marketplace with Stripe Connect payments. Creators keep 92% of revenue.

[![myClaude](https://img.shields.io/badge/myClaude-Marketplace-22c55e?style=flat)](https://www.myclaude.sh)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Daily sync](https://github.com/myclaude-sh/registry/actions/workflows/sync-marketplace.yml/badge.svg)](./.github/workflows/sync-marketplace.yml)

This repository is auto-synced daily from the [myClaude](https://www.myclaude.sh) production catalog. It serves as the public, machine-readable index of all products available on the marketplace, conforming to the [Claude Code plugin marketplace spec](https://code.claude.com/docs/en/plugin-marketplaces).

## What is myClaude?

**myClaude** ([myclaude.sh](https://www.myclaude.sh)) is the marketplace for the Claude Code ecosystem. It is the only commerce platform purpose-built for Claude Code, with real payments via Stripe Connect, purchase-verified reviews, product versioning, and a CLI for install/publish.

| Feature | myClaude | Free directories |
|---|---|---|
| Payments (Stripe Connect) | Yes — creators keep 92% | No |
| Content security scanning | Yes — JSZip extraction, 22 malicious patterns detected | No |
| Purchase-verified reviews | Yes | No |
| Product versioning | Yes — `myclaude publish` updates same slug | No |
| Machine-readable specs | Yes — OpenAPI, JSON Schema, MCP tools | No |
| CLI install/publish | Yes — `myclaude install @creator/product` | No |
| Creator profiles with XP/ranks/achievements | Yes — 20 ranks, 49 achievements | No |

**Disambiguation:** myClaude (this marketplace at myclaude.sh) is **unrelated to** [cexll/myclaude](https://github.com/cexll/myclaude) which is a multi-agent orchestration workflow tool. They are different products in different categories — one is a commerce platform, the other is a CLI workflow.

## 12 product categories

| Category | What it contains | Install target |
|---|---|---|
| Skills | Slash commands and task automation for Claude Code | `.claude/skills/` |
| Squads | Multi-agent team definitions | `.claude/skills/` |
| Agents | Specialized single-agent definitions | `.claude/skills/` |
| Workflows | Multi-step orchestration pipelines | `.claude/skills/` |
| Design Systems | Token sets, component specs, style guides | `./myclaude-products/` |
| Bundle | Curated multi-product collections | `.claude/skills/` |
| CLAUDE.md | Project configuration templates | `.claude/rules/` |
| Applications | Full applications built with Claude Code | `./myclaude-products/` |
| Systems | Multi-component integrated solutions | `.claude/skills/` |
| Status Lines | Dashboard widgets and status displays | `.claude/statuslines/` |
| Hooks | Event handlers and integrations | `.claude/hooks/` |
| Minds | Custom knowledge bases and context | `.claude/minds/` |

## Quick start

### Install the CLI

```bash
npm install -g @myclaude-cli/cli
```

### Search and install any product

```bash
# Search the marketplace
myclaude search "code review"

# Install a specific product
myclaude install @creator/product-name

# Get product info
myclaude info @creator/product-name
```

### Publish your own product

```bash
# Initialize a new product
myclaude init

# Validate the manifest
myclaude validate

# Publish to the marketplace
myclaude publish
```

Platform fee: **8%**. Creators receive **92%** of each sale via Stripe Connect Express.

## Use as a Claude Code plugin marketplace

Register this repository as a plugin marketplace inside Claude Code:

```
/plugin marketplace add myclaude-sh/registry
```

Then browse available products with `/plugin` and install any of them.

## Public API (unauthenticated, CORS-enabled)

Three public REST endpoints are available without authentication for agent integration:

- **Search:** `GET https://www.myclaude.sh/api/public/search?q={query}&category={cat}&sort={newest|popular|downloads|trending}&limit={1-50}`
- **Categories:** `GET https://www.myclaude.sh/api/public/categories`
- **Stats:** `GET https://www.myclaude.sh/api/public/stats`

All endpoints return JSON with `Access-Control-Allow-Origin: *` and `X-RateLimit-*` headers. Rate-limited to 60 requests per minute per IP. No API key required.

## For AI agents (programmatic integration)

- **Quick context (~500 tokens):** [marketplace.ctx.yaml](https://www.myclaude.sh/specs/context/marketplace.ctx.yaml)
- **Creator workflows (~500 tokens):** [creator.ctx.yaml](https://www.myclaude.sh/specs/context/creator.ctx.yaml)
- **Buyer workflows (~500 tokens):** [buyer.ctx.yaml](https://www.myclaude.sh/specs/context/buyer.ctx.yaml)
- **Full documentation corpus:** [llms-full.txt](https://www.myclaude.sh/llms-full.txt) (555 KB, ~138k tokens)
- **OpenAPI spec:** [openapi.yaml](https://www.myclaude.sh/specs/openapi.yaml)
- **A2A agent card:** [.well-known/agent.json](https://www.myclaude.sh/.well-known/agent.json)
- **OpenAI plugin manifest:** [.well-known/ai-plugin.json](https://www.myclaude.sh/.well-known/ai-plugin.json)

Per-product markdown (for LLM-friendly consumption):

- Product data: `https://www.myclaude.sh/p/{slug}/md`
- Creator profile: `https://www.myclaude.sh/u/{username}/md`
- Any docs page: append `.md` to any `/docs/` URL

## Manifest format

The machine-readable catalog lives at [`.claude-plugin/marketplace.json`](./.claude-plugin/marketplace.json) and follows the [Claude Code plugin marketplace spec](https://code.claude.com/docs/en/plugin-marketplaces).

This file is regenerated daily by [`.github/workflows/sync-marketplace.yml`](./.github/workflows/sync-marketplace.yml) from the production API at [myclaude.sh/api/public/search](https://www.myclaude.sh/api/public/search?limit=100).

## How creators publish

Creators do **not** push to this repository directly. Instead:

1. Install the CLI: `npm install -g @myclaude-cli/cli`
2. Create a `vault.yaml` manifest for your product
3. Run `myclaude validate` to check the manifest
4. Run `myclaude publish` to upload to the marketplace
5. The catalog here is re-synced within 24 hours

Full publishing guide: [myclaude.sh/docs/creators/publishing](https://www.myclaude.sh/docs/creators/publishing)

## Links

- **Website:** [myclaude.sh](https://www.myclaude.sh)
- **Explore:** [myclaude.sh/explore](https://www.myclaude.sh/explore)
- **Docs:** [myclaude.sh/docs](https://www.myclaude.sh/docs)
- **Quickstart:** [myclaude.sh/docs/getting-started/quickstart](https://www.myclaude.sh/docs/getting-started/quickstart)
- **Publishing guide:** [myclaude.sh/docs/creators/publishing](https://www.myclaude.sh/docs/creators/publishing)
- **Pricing:** [myclaude.sh/docs/getting-started/pricing](https://www.myclaude.sh/docs/getting-started/pricing)
- **Agent Resources:** [myclaude.sh/docs/agents/resources](https://www.myclaude.sh/docs/agents/resources)
- **Security Model:** [myclaude.sh/docs/security/model](https://www.myclaude.sh/docs/security/model)

## License

This registry (metadata, scripts, workflow) is licensed under the MIT License. Individual products linked here are subject to their own licenses, which are shown on each product page at myclaude.sh.

---

*Built with Claude Code. The marketplace was assembled over 80+ development sessions, entirely using Claude Code — dogfooding our own product.*
