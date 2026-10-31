# Mona's Bookmark Manager Roadmap

This roadmap outlines proposed improvements to make saving, organizing, and maintaining bookmarks easier. Priorities are indicative and can be revisited as the app evolves.

| Area | Item | Type | Priority |
|---|---|---|---|
| Discovery | Search and filter bookmarks | Feature | P1 |
| Maintenance | Edit saved bookmarks | Feature | P1 |
| Organization | Tags and folders | Feature | P2 |
| Portability | Import and export bookmarks | Feature | P2 |
| Reliability | Duplicate slugs | Risk | P1 |
| Reliability | Empty URL validation | Risk | P1 |
| Data safety | Data loss when localStorage is cleared | Risk | P1 |

## 🚀 Planned features

- 🔎 **Search and filter bookmarks** — quickly find saved links by title, URL, or other available details. `[P1]`
- ✏️ **Edit saved bookmarks** — update bookmark details after they have been saved. `[P1]`
- 🏷️ **Tags and folders** — organize bookmarks into flexible topics and collections. `[P2]`
- 📦 **Import and export bookmarks** — move bookmark collections into or out of the app. `[P2]`

## 🐞 Known bugs & risks

- ⚠️ **Duplicate slugs** — duplicate identifiers may cause bookmarks to be confused or overwritten. `[P1]`
- 🔗 **Empty URL validation** — a bookmark may be saved without a usable destination. `[P1]`
- 💾 **Data loss when localStorage is cleared** — browser storage can be removed, leaving saved bookmarks unavailable. `[P1]`
