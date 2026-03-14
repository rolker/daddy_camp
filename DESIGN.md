# Daddy Camp — Design Document

## Origin

Daddy Camp is a co-op game inspired by the summer Roland spent at home with his daughter
Isabelle after she'd been at day camps earlier in the season. They did activities together —
taking the train to Portland to visit the children's museum, kayaking, bike rides, mini golf —
and called it Daddy Camp. The game recreates that feeling.

## Vision

A casual co-op game for families. Players start at home each morning, wander and do things
around the house, then head out into the world for the day's activity. The world expands
gradually — from home to neighborhood, to Portland, to Boston — as players explore and get
bored of what they've already done. Designed to be played across devices — a parent on a
laptop or Steam Deck, a child on a tablet — or side by side in the same room.

## Players

- **Core:** Roland + Isabelle
- **Extended:** Mom, or Isabelle's friend + her dad
- **Player count:** 1–4
- **No player roles** — no permanent parent/child distinction in the game; all players are equal

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
- Display name defaults to Google profile name but can be customized in-game
- Progress, character appearance, currency, and unlocked activities are tied to the account
  and follow the player across devices
- No device binding — Isabelle can start on the tablet, Roland joins from the Steam Deck

## Multiplayer

- Online co-op via **Firebase Realtime Database**
- One player creates a session and shares a room code; others join by entering it
- All game state (current activity, player positions, inventory, currency) lives in Firebase
  and syncs in real time

## Character Creator

The paper doll character customizer. Players dress their character each morning before
heading out for the day. The character creator is part of the home hub, not a separate menu.

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

## Day Structure

Each in-game day follows a rhythm:

1. **Morning — Home**
   Players start at home. Get dressed (character creator), make breakfast, tend the lemonade
   stand, wander around the house and yard. No pressure to leave immediately.

2. **Heading out — The Map**
   The camp counselor NPC asks: *"Good morning! What's the plan for today?"*
   The screen opens into an illustrated map showing available activities as locations.
   All players tap a destination to vote. Once everyone agrees, the day's activity begins.
   If players disagree, the counselor reacts until they sync up.

3. **The activity**
   Players do the chosen activity together (interactive scene or mini-game).
   Activities can earn currency.

4. **Afternoon — Shop & Restaurant**
   Players can make one purchase each at the clothing shop and restaurant before the day ends.

## The Map & World Progression

The world expands as players explore and unlock new areas. Locked locations are visible
on the map but greyed out, building anticipation. The map grows in stages:

| Stage | Area | Activities |
|-------|------|------------|
| Early | Home & neighborhood | Lemonade stand, mini golf, bicycle ride |
| Mid | Portland, ME | Train trip, Children's Museum, kayaking |
| Late | Boston, MA | TBD — open-ended for now |

- Portland appears on the map after enough neighborhood adventures
- Boston is barely visible at first — maybe just a skyline on the horizon — and becomes
  reachable after the Portland milestone is reached
- A mystery "???" location gradually appears on the map as a hint that something new
  is about to unlock

**Rainy days:** Some days weather keeps players at home, making home activities matter
more and adding variety to the rhythm.

## Activity Unlocking — "I'm Bored"

Activities unlock through the **"Those are all boring!"** mechanic:

- After an activity has been played enough times, a mystery location appears on the map
- All players can vote for it on the map alongside the regular activities
- If everyone votes for the mystery location, a new activity unlocks with fanfare
- An activity must be played a minimum number of times before the "boring" vote becomes
  available — prevents immediately skipping everything on day one

This mirrors real life: you do something until it stops being exciting, then you're ready
for something new.

## Economy

- **Earn:** Players earn currency through activities. The primary early source is the
  **lemonade stand** in the front yard at home. Other activities can also pay out
  (tips, prizes, etc.)
- **Spend:** Currency is spent at two shops, each allowing one purchase per day:
  - **Clothing shop** — new items for the character creator
  - **Restaurant** — meals (effect TBD, possibly energy/mood or purely flavor)
- **Open question:** Is currency shared across co-op players (family wallet) or per-player?

## The Camp Counselor

A neutral NPC who gives the game a voice without being tied to any player's role.
Appears each morning to prompt the day's plan, reacts to player choices, and delivers
story beats like activity unlocks. Name and design TBD.

## Activities

Each activity is an **interactive scene** — players are in a place, tap things, simple
cause-and-effect, no fail state. More engaging than a static illustration, simpler to
build than a full mini-game. Some activities may graduate to mini-game format if it
fits naturally.

**Planned activities:**

| Activity | Location | Notes |
|----------|----------|-------|
| Lemonade stand | Home | Primary currency earner; lives at home, always available |
| Mini golf | Neighborhood | Early unlock |
| Bicycle ride | Neighborhood | Early unlock |
| Kayaking | Portland area | Mid-game |
| Train to Portland | Neighborhood → Portland | The journey is part of the activity |
| Children's Museum | Portland | Mid-game destination |
| Boston trip | Boston | Late game; details TBD |

## Phases

### Phase 1 — Character Creator (in progress)
- [x] PWA setup (manifest, service worker)
- [x] Layered SVG character with customization controls
- [x] Firebase Hosting deployment
- [ ] Save character appearance to Firebase profile
- [ ] Google Sign-in

### Phase 2 — Home & Core Loop
- [ ] Google Sign-in with Family Link support
- [ ] Home hub — explorable space with basic interactions
- [ ] Lemonade stand at home
- [ ] Camp counselor NPC
- [ ] Illustrated map with neighborhood locations
- [ ] First activity (mini golf or bicycle ride)
- [ ] Basic currency earn/spend loop
- [ ] Clothing shop
- [ ] Restaurant

### Phase 3 — Multiplayer & World Expansion
- [ ] Session creation and room codes
- [ ] Online multiplayer via Firebase Realtime Database
- [ ] Voting mechanic on the map
- [ ] "I'm bored" unlock mechanic
- [ ] Portland area + train trip activity
- [ ] Rainy day mechanic

### Phase 4 — Polish & Expansion
- [ ] Boston destination
- [ ] Gamepad support (Steam Deck / Switch Pro Controller)
- [ ] Additional character creator layers (shoes, accessories)
- [ ] Remaining activities

## Open Questions

1. **Currency** — shared family wallet or per-player balance?
2. **Lemonade stand mechanic** — how does it work as an interactive scene? Mixing, pricing, serving customers?
3. **Unlock thresholds** — how many plays before an activity can be voted "boring"?
4. **Restaurant effect** — does food do anything mechanically, or is it purely flavor?
5. **Camp counselor** — name, appearance, personality?
6. **Boston activities** — what real trips or experiences should Boston include?
7. **Rainy day activities** — what can players do at home on a rainy day?
8. **Family Link compatibility** — needs early testing with Isabelle's account to confirm
   Google Sign-in works within Family Link restrictions
