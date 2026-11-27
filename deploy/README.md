# Deploying tedem.dev

The site runs on a Google Cloud VM (Debian 13) with nginx, PHP 8.5-FPM, MariaDB and
Node.js for the asset build and server-side rendering. HTTPS comes from Let's Encrypt.

New versions go out from GitHub: push to `main`, then run `php artisan deploy:update` on
the server (see [Updating](#updating)). It:

1. fetches `main` from GitHub (the site stays up if this fails),
2. puts the site into maintenance mode (a static page, `resources/views/maintenance.blade.php`),
3. checks out the new commit,
4. runs `composer install`, `npm ci`, the client and SSR builds, migrations and `optimize`,
5. restarts the SSR server and brings the site back up.

If a step after 2 fails, the site stays in maintenance mode instead of serving half-updated
code. Fix the cause and run the command again; `php artisan up` brings the site back as it is.

Tests are not run on the server: the pre-push hook runs them on your machine before `main`
reaches GitHub.

Files in this folder:

| File                      | Goes to                                    |
| ------------------------- | ------------------------------------------ |
| `nginx.conf`              | `/etc/nginx/sites-available/tedem.dev`     |
| `php-fpm.conf`            | `/etc/php/8.5/fpm/pool.d/tedem.conf`       |
| `tedem-ssr.service`       | `/etc/systemd/system/tedem-ssr.service`    |
| `.env.production.example` | `/var/www/tedem.dev/.env` (then filled in) |

## First-time setup

Commands below run on the VM as your own sudo user unless the step says `deploy`.

### 1. Google Cloud and DNS

- Give the VM a static external IP (VPC network → IP addresses → Reserve).
- Allow HTTP and HTTPS traffic on the VM (Edit → Firewalls → both boxes).
- Point an `A` record for `tedem.dev` (and `www.tedem.dev`) at that IP.

### 2. Swap (small machines)

The asset build needs about 1 GB of memory. On an e2-micro or e2-small, add swap first:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 3. Packages

```bash
sudo apt update
sudo apt install -y ca-certificates curl git unzip nginx mariadb-server certbot

# PHP 8.5 (Debian 13 ships 8.4) from the sury.org repository.
sudo curl -fsSLo /usr/share/keyrings/deb.sury.org-php.gpg https://packages.sury.org/php/apt.gpg
echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php/ trixie main" \
  | sudo tee /etc/apt/sources.list.d/php.list
sudo apt update
sudo apt install -y php8.5-fpm php8.5-cli php8.5-mysql php8.5-mbstring php8.5-xml \
  php8.5-curl php8.5-zip php8.5-intl php8.5-bcmath

# Composer, checked against its published signature.
curl -fsSL https://getcomposer.org/installer -o /tmp/composer-setup.php
php -r "exit(hash_file('sha384', '/tmp/composer-setup.php') === trim(file_get_contents('https://composer.github.io/installer.sig')) ? 0 : 1);" \
  && sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
rm /tmp/composer-setup.php

# Node.js 24 LTS (Vite+ needs 22.18+ or 24.11+).
curl -fsSL https://deb.nodesource.com/setup_24.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh && sudo apt install -y nodejs
rm /tmp/nodesource_setup.sh
```

Debian's `mariadb-server` is its MySQL: the app connects with Laravel's `mysql` driver.

### 4. Database

```bash
DB_PASSWORD="$(openssl rand -base64 24)"; echo "$DB_PASSWORD"   # keep it for .env
sudo mariadb -e "CREATE DATABASE tedem CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER 'tedem'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
  GRANT ALL PRIVILEGES ON tedem.* TO 'tedem'@'localhost';"
```

### 5. The deploy user and the code

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG www-data deploy
sudo install -d -o deploy -g www-data -m 750 /var/www/tedem.dev
```

As `deploy` (`sudo -iu deploy`), give the server read access to the repository with a
deploy key:

```bash
ssh-keygen -t ed25519 -C "tedem.dev server" -f ~/.ssh/github -N ""
printf 'Host github.com\n  IdentityFile ~/.ssh/github\n  IdentitiesOnly yes\n' >> ~/.ssh/config
cat ~/.ssh/github.pub
```

Add that public key on GitHub: repository → Settings → Deploy keys → Add deploy key
(leave "Allow write access" off). Then, still as `deploy`:

```bash
git clone git@github.com:tedem/tedem.dev.git /var/www/tedem.dev   # accept GitHub's host key
cd /var/www/tedem.dev
cp deploy/.env.production.example .env
nano .env                                                       # DB_PASSWORD from step 4
composer install --no-dev --optimize-autoloader                 # Artisan needs vendor/ to start
php artisan deploy:install
```

Check GitHub's host key fingerprint against
[GitHub's published fingerprints](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)
when `git clone` asks.

### 6. PHP-FPM, SSR, HTTPS and nginx

```bash
cd /var/www/tedem.dev
sudo cp deploy/php-fpm.conf /etc/php/8.5/fpm/pool.d/tedem.conf
sudo systemctl reload php8.5-fpm

sudo cp deploy/tedem-ssr.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now tedem-ssr

# The default nginx site still serves /var/www/html on port 80, which certbot needs here.
sudo certbot certonly --webroot -w /var/www/html -d tedem.dev -d www.tedem.dev \
  --deploy-hook "systemctl reload nginx"

sudo cp deploy/nginx.conf /etc/nginx/sites-available/tedem.dev
sudo ln -s /etc/nginx/sites-available/tedem.dev /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Certificates renew on their own (certbot's systemd timer); `sudo certbot renew --dry-run`
checks it. Without a `www` DNS record, drop `-d www.tedem.dev` and the `www` server block.

The site is now live. Register at `/admin/register`, then make the account an admin:
`php artisan admin:grant you@example.com` (as `deploy`, in `/var/www/tedem.dev`).

## Updating

After pushing to `main`, on the server (as `deploy`, in `/var/www/tedem.dev`):

```bash
php artisan deploy:update
```

Or in one go from your own machine (`your-user` is your sudo account on the VM):

```bash
ssh your-user@tedem.dev 'sudo -iu deploy sh -c "cd /var/www/tedem.dev && php artisan deploy:update"'
```

`--branch=name` deploys another branch.

Logs: `storage/logs/` for the app, `journalctl -u tedem-ssr` for SSR,
`/var/log/nginx/error.log` for nginx.
