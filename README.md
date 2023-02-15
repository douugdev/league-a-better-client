# ABC - A Better Client (a mod for League of Legends'client)

Enhance your LoL experience by customizing your client with useful features,

## Installation

1. Download one of the releases [from here](https://github.com/douugdev/league-a-better-client/releases).
2. Then extract the zip file to any folder.
3. Open `LeagueLoader.exe`
4. Select your League of Legends path (where `LeagueClient.exe` is located, usually `C:\Program Files (x86)\Riot Games\League of Legends`)
5. Hit "Install".

That's it! You can close League Loader and everytime you open your client, the extension will appear. Just remember to not delete the folder where you extracted ABC.

## Roadmap

| Features                                                                      | Nightly | Production |
| ----------------------------------------------------------------------------- | ------- | ---------- |
| Auto Ready                                                                    | ✅      | ❌         |
| Auto Champion Select                                                          | ✅      | ❌         |
| Dodge Button                                                                  | ✅      | ❌         |
| Custom themes (using presets)                                                 | 🆕      | ❌         |
| Auto honor friend                                                             | 🔜      | ❌         |
| Auto skin/chroma select                                                       | 🔜      | ❌         |
| Champion presets<br/>(Auto spells, runes, skins based on champion)            | 🔜      | ❌         |
| Auto ban champion<br/>(multiple for clash)                                    | 🔜      | ❌         |
| Auto boost<br/>(for ARAM)                                                     | 🔜      | ❌         |
| Auto dodge on champion ban                                                    | 🔜      | ❌         |
| Dynamic themes                                                                | 🔜      | ❌         |
| External messaging<br/>(receive WhatsApp messages directly on your LoL inbox) | 🔜      | ❌         |

Learn more about each feature [in the docs' feature showcase](https://douugdev.github.io/league-a-better-client/).

## How it works

ABC is a league-loader plugin and a client extension framework , we use Preact+TypeScript+SCSS as a basis for developing it, then webpack bundles all that code into a single `abc.js` file, and we use [league-loader](https://github.com/nomi-san/league-loader) to inject the bundled javascript into the client.

## For Developers

ABC's initial objective was to serve as an example on how to develop league-loader plugins with React+TypeScript+SCSS (and demonstrate it's possible to use any JS frameworks like Vue, Svelte, Angular, etc) but due to the increase in demand by our friends, we are bundling everything as a single tool so people without developing experience can use it.

Read the [contribution notes](CONTRIBUTING.md) to learn the contribution rules and how to setup your environment.

### Disclaimers

ABC isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc. ABC was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.
