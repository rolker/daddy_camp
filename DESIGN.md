# Daddy Camp — Design Document

## Origin

Daddy Camp is a co-op game inspired by the summer Roland spent at home with his daughter
Isabelle after she'd been at day camps earlier in the season. They did activities together —
taking the train to Portland to visit the children's museum, kayaking, bike rides, mini golf —
and called it Daddy Camp. The game recreates that feeling.

## Vision

A casual co-op game for families. Players customize their characters, choose daily activities,
earn and spend currency, and unlock new experiences together. Designed to be played across
devices — a parent on a laptop or Steam Deck, a child on a tablet — or side by side in the
same room.

## Players

- **Core:** Roland + Isabelle
- **Extended:** Mom, or Isabelle's friend + her dad
- **Player count:** 1–4

## Platforms

| Device | Input |
|--------|-------|
| Android tablet | Touchscreen |
| Laptop | Keyboard + mouse |
| Steam Deck | Gamepad |

The game must handle all three input methods. Since this is a casual co-op game rather than
a twitch game, supporting multiple input types is manageable.

## Accounts & Profiles

- Sign-in via **Google Authentication** (Firebase Auth)
- Compatible with **Google Family Link** child accounts — Isabelle signs in with her own
  Google account managed by Roland via Family Link
- Each Google account = one player profile
- Progress, character appearance, currency, and unlocked activities are tied to the account
  and follow the player across devices
- No device binding — Isabelle can start on the tablet, Roland joins from the Steam Deck

## Multiplayer

- Online co-op via **Firebase Realtime Database**
- One player creates a session and shares a room code; others join by entering it
- All game state (current activity, player positions, inventory, currency) lives in Firebase
  and syncs in real time
- Players are in the same activity together (same-screen co-op model)

## Character Creator (Phase 1 — current)

The paper doll character customizer. Players dress their character before heading out for
the day.

**Customizable layers:**
- Body base (boy / girl)
- Face
- Hair style
- Hair color
- Shirt
- Pants

**Future layers to add:**
- Shoes
- Accessories
- Outerwear (for weather-appropriate dressing)

Character appearance is saved to the player's profile.

## Economy

- Players earn currency through a **sell box** mechanic (details TBD — likely selling items
  collected or crafted during activities, inspired by Stardew Valley)
- Currency is spent at two shops, each allowing **one purchase per day:**
  - **Clothing shop** — new items for the character creator
  - **Restaurant** — meals (effect TBD, possibly buffs or flavor)
- Open question: is currency shared across co-op players (family wallet) or per-player?

## Activities

Activities are the heart of the game — each one is a scene or mini-game based on a real
Daddy Camp outing. They unlock progressively as Isabelle gets bored of earlier ones, mirroring
how real activities naturally give way to new ones.

**Planned activities (in rough unlock order):**

| Activity | Based on |
|----------|----------|
| Mini golf | Local mini golf outings |
| Bicycle ride | Neighborhood bike rides |
| Kayaking | Kayaking trips |
| Train to Portland | Train ride to Portland, ME |
| Children's Museum | Visit to Portland Children's Museum |

**Unlock mechanic:** Playing an activity a certain number of times (or earning enough from it)
unlocks the next one. Open question: exact unlock thresholds.

**Activity format:** Each activity is either:
- A **mini-game** (something you actively play) — more replayable, more work to build
- An **illustrated scene** (a place you visit) — simpler, picture-book feel

The right format may vary per activity. TBD per activity during Phase 2 design.

## Phases

### Phase 1 — Character Creator (in progress)
- [x] PWA setup (manifest, service worker)
- [x] Layered SVG character with customization controls
- [x] Firebase Hosting deployment
- [ ] Save character appearance to Firebase profile
- [ ] Google Sign-in

### Phase 2 — Core Game Loop
- [ ] Session creation and room codes
- [ ] Online multiplayer via Firebase Realtime Database
- [ ] First activity (mini golf or bike ride)
- [ ] Basic currency earn/spend loop
- [ ] Clothing shop
- [ ] Restaurant

### Phase 3 — Expansion
- [ ] Remaining activities
- [ ] Unlock progression
- [ ] Gamepad support (Steam Deck / Switch Pro Controller)
- [ ] Additional character creator layers (shoes, accessories)

## Open Questions

1. **Sell box** — what exactly do players sell, and how do they acquire sellable items?
2. **Currency** — shared family wallet or per-player balance?
3. **Activity format** — mini-game vs. illustrated scene, decided per activity
4. **Unlock thresholds** — how many plays or how much currency to unlock the next activity?
5. **Restaurant effect** — does food do anything mechanically, or is it purely flavor?
6. **Family Link compatibility** — needs early testing with Isabelle's account to confirm
   Google Sign-in works within Family Link restrictions
