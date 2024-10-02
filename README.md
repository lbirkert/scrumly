<img src="https://raw.githubusercontent.com/lbirkert/scrumly/main/brand/logo_light.svg#gh-dark-mode-only" alt="Scrumly" width="400px"/>
<img src="https://raw.githubusercontent.com/lbirkert/scrumly/main/brand/logo_dart.svg#gh-light-mode-only" alt="Scrumly" width="400px"/>


Collaborate using SCRUM effectively!

<hr>

## Usecases

_NOTE: Use github and others if you can_

1. You have got people who you rarely work with and do not have got a github account (or similar).
2. You need a simple selfhostable alternative to larger services.
3. You need single password authentification.
4. You need a scrum system.

## Requirements

1. git
2. nodejs
3. openssl
4. 
## Hosting

### Docker

Soon &trade;

### Manually

1. Clone the repo: `git clone https://github.com/lbirkert/scrumly`
2. Install the dependencies: `npm install`
3. Copy `default.env` to `.env` and configure
4. Setup the SQLite database: `npx prisma db push`
5. Build: `npm run build`

You can now run `scrumly` using the `run.sh` file.

_Optional: Create systemd service_

/etc/systemd/system/scrumly.service

```ini
[Unit]
Description=Scrumly Selfhosted

[Service]
Type=simple
WorkingDirectory=/path/to/scrumly
ExecStart=/bin/bash /path/to/scrumly/run.sh

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl enable scrumly.service
sudo systemctl start scrumly.service
sudo systemctl status scrumly.service
```

## Contribution Guide

1. Clone the repo: `git clone https://github.com/lbirkert/scrumly`

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

## License

`scrumly` is licensed under the [MIT License](https://github.com/lbirkert/scrumly/blob/main/LICENSE)

<hr>

&copy; 2024 Lucas Birkert - All Rights Reserved
