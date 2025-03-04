# tedem.dev - Documents

All documents related to the project.

## Deployment

Follow these guidelines:

### 1. Requirements

- PHP 8.2 or higher
- Web server (Nginx or Apache)
- Database management system (PostgreSQL, MySQL, etc.)
- Composer
- NPM

### 2. Upload Project to Server

Connect to the server via ssh:

```shell
ssh [username]@[your_server_ip]
```

Navigate to the directory where you want to upload the project:

```shell
cd /var/www
```

Upload the project to the server:

```shell
sudo git clone https://github.com/tedem/tedem.dev.git
```

Set ownership user group:

```shell
sudo chown -R www-data:www-data tedem.dev
```

Navigate to the project directory:

```shell
cd tedem.dev
```

Disable file mode changes in Git:

```shell
sudo git config core.fileMode false
```

Set the permissions of the directories correctly:

```shell
sudo chmod -R 775 storage bootstrap/cache
```

### 3. Configure Environmental Variables

Create the environmental variable file:

```shell
sudo cp .env.example .env
```

Then edit the `.env` file:

```shell
sudo nano .env
```

Considerations:

```text
APP_NAME=tedem
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tedem.dev
```

Save and close the file.

Generate an application key:

```shell
sudo php artisan key:generate
```

### 4. Install Requirements

Install composer requirements:

```shell
sudo composer install --optimize-autoloader --no-dev
```

Install and build NPM requirements:

```shell
sudo npm install && sudo npm run build
```

### 6. Database Configuration and Migration

Run migrations using the following command to create or update database schemas:

```shell
sudo php artisan migrate --force
```

If you want to add seed (sample data), you can do this as follows:

```shell
php artisan db:seed --force
```

### 7. Optimization

Execute the necessary commands:

```shell
sudo php artisan optimize:clear && sudo php artisan optimize
```

### 8. Log Check

Complete the deployment by checking the log:

```shell
tail -f storage/logs/laravel.log
```

## Update

To update the project, follow these steps:

### 1. Update Project on Server

Connect to the server via ssh:

```shell
ssh [username]@[your_server_ip]
```

Navigate to the directory where the project is located:

```shell
cd /var/www/tedem.dev
```

Execute the necessary commands:

```shell
sudo php artisan optimize:clear && sudo git pull origin main && sudo COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader && sudo npm install && sudo npm run build && sudo php artisan migrate --force && sudo php artisan optimize
```
