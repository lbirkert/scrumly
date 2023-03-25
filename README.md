```
 ___  __    ________  _________  ___       __           _________  _______   ________  _____ ______   ________
|\  \|\  \ |\   __  \|\___   ___\\  \     |\  \        |\___   ___\\  ___ \ |\   __  \|\   _ \  _   \|\   ____\
\ \  \/  /|\ \  \|\  \|___ \  \_\ \  \    \ \  \       \|___ \  \_\ \   __/|\ \  \|\  \ \  \\\__\ \  \ \  \___|_
 \ \   ___  \ \  \\\  \   \ \  \ \ \  \  __\ \  \           \ \  \ \ \  \_|/_\ \   __  \ \  \\|__| \  \ \_____  \
  \ \  \\ \  \ \  \\\  \   \ \  \ \ \  \|\__\_\  \           \ \  \ \ \  \_|\ \ \  \ \  \ \  \    \ \  \|____|\  \
   \ \__\\ \__\ \_______\   \ \__\ \ \____________\           \ \__\ \ \_______\ \__\ \__\ \__\    \ \__\____\_\  \
    \|__| \|__|\|_______|    \|__|  \|____________|            \|__|  \|_______|\|__|\|__|\|__|     \|__|\_________\
                                                                                                        \|_________|
```

The simple teaming solution for [small teams](#usecases) written using [SvelteKit](https://kit.svelte.dev).

<hr>

## Usecases

_NOTE: Use github and others if you can_

1. You have got people who you rarely work with and do not have got a github account (or similar).
2. You need a simple selfhostable alternative to larger services.
3. You need single password authentification.

<hr>

## Requirements

1. git
2. nodejs
3. openssl

<hr>

## Hosting

### Docker

Soon &trade;

### Manually

1. Clone the repo: `git clone https://github.com/KekOnTheWorld/kotw-teams`
2. Install the dependencies: `npm install`
3. Copy `default.env` to `.env` and configure
4. Setup the SQLite database: `npx prisma db push`
5. Build: `npm run build`

You can now run kotw-teams using the `run.sh` file.

_Optional: Create systemd service_

/etc/systemd/system/kotw-teams.service

```ini
[Unit]
Description=KOTW Teams

[Service]
Type=simple
WorkingDirectory=/path/to/kotw-teams
ExecStart=/bin/bash /path/to/kotw-teams/run.sh

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl enable kotw-teams.servie
sudo systemctl start kotw-teams.servie
sudo systemctl status kotw-teams.servie
```

<hr>

## Contribution Guide

1. Clone the repo: `git clone https://github.com/KekOnTheWorld/kotw-teams`

_Instead of doing the following manually, you can run `setup.sh`_

2. Install the dependencies: `npm install`
3. Copy `default.env` to `.env`
4. Create `run/avatars` directory
5. Setup the SQLite database: `npx prisma db push`
6. Start the development server: `npm run dev`

7. Change some things.

8. Run the formatter: `npm run format`
9. Check your code doesn't contain linting errors/warnings: `npm run lint`
10. Commit & PR

<hr>

## License

KOTW Teams is licensed under [MIT](https://github.com/KekOnTheWorld/kotw-teams/blob/main/LICENSE)

<hr>

&copy; 2023 KekOnTheWorld & Contributors
