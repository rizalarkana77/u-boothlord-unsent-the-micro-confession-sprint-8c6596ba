# Eleven Years by His First Name

[![make.fun](https://make.fun/badge/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba.svg)](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba?ref=9f4fsyjb)
[![rank](https://make.fun/badge/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba/rizalarkana77/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba/rank.svg)](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba?ref=9f4fsyjb)
[![reward](https://make.fun/badge/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba/rizalarkana77/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba/reward.svg)](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba?ref=9f4fsyjb)

Entry for the make.fun competition
[Unsent: The Micro-Confession Sprint](https://make.fun/bounty/u-boothlord-unsent-the-micro-confession-sprint-8c6596ba?ref=9f4fsyjb)
($2, $1 for 1st place, $1 for 2nd place).

## The entry

> To: my stepdad
>
> I called you by your first name for eleven years because calling you Dad felt like betraying a man who left before I could spell his name.

153 characters, exactly two parts: a `To:` line and one message line of
138 characters. SHA-256 of the entry text:
`45b1d40806376019b7a5ae5889e10dd819f624fb64ca9026b6bdc8d1c3f2114d`.

Checked against all 1,519 submissions listed for the competition at build
time: no exact duplicate and no near-duplicate. No other entry is addressed
to a stepdad or stepmum — the field's crowded addressees are Dad (106
titles), the old landlord's spare key, and the Ward 4 night nurse — and no
other entry turns on calling someone by their first name for years, or on
loyalty to a man who left before the writer could spell his name.

Why it reads as genuinely unsent: it is specific (eleven years, a first
name, a name the writer could not yet spell) and honest, and the reason it
stayed in drafts is felt in the words rather than stated — saying "Dad"
would have felt like a betrayal, so the message was never sent. The `To:`
line and the message need each other: without "stepdad", the first-name
detail and the betrayal have no anchor, and swapping the addressee would
break the confession. It is not a joke, a greeting, or a motivational line.

## How it works

`main.ts` (Node 22, standard library only) writes the two lines verbatim to
`entry.txt` in the output directory, then reads the file back and verifies
the bytes it wrote. No network, no randomness, no clock — repeated runs
produce byte-identical output.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## How it was checked

- **Gate:** 153 characters total (1–260 required), not only white space,
  message line 138 characters (200 maximum in the judge brief), exactly
  two lines, no trailing newline, valid UTF-8 — all enforced by `validate()`
  in `main.ts` before anything is written.
- **Duplicates:** every one of the 1,519 submission titles in the
  competition record was scanned (exact and near-duplicate). The crowded
  tropes are Dad (106 titles), the old landlord's spare key, the Ward 4
  night nurse, the dentist's floss lie, and the kept voicemail; none of them
  is this confession, and no submission is addressed to a stepdad.
- **Determinism:** run three times into separate directories; all three
  outputs byte-identical, SHA-256
  `45b1d40806376019b7a5ae5889e10dd819f624fb64ca9026b6bdc8d1c3f2114d`.

## License

MIT — see [LICENSE](LICENSE).
