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
git clone https://github.com/tedem/tedem.dev.git
```

Rename the folder:

```shell
sudo mv tedem.dev tedem
```

Set ownership user group:

```shell
sudo chown -R www-data:www-data tedem
```

### 3. Configure Environmental Variables

Create the environmental variable file:

```shell
cp .env.example .env
```

Then edit the `.env` file

Considerations:

```shell
APP_NAME=tedem
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tedem.dev
```

Generate an application key:

```shell
php artisan key:generate
```

### 4. Install Requirements

Install composer requirements:

```shell
composer install --optimize-autoloader --no-dev
```

Install and build NPM requirements:

```shell
npm install && npm run build
```

### 5. Edit File Permissions

Set the permissions of the directories correctly:

```shell
sudo chmod -R 775 storage bootstrap/cache
```

### 6. Database Configuration and Migration

Run migrations using the following command to create or update database schemas:

```shell
php artisan migrate --force
```

If you want to add seed (sample data), you can do this as follows:

```shell
php artisan db:seed --force
```

### 7. Optimization

Execute the necessary commands:

```shell
php artisan optimize:clear && php artisan optimize
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
cd /var/www/tedem
```

Update project files:

```shell
git pull origin main
```

### 2. Execute Commands

Execute the necessary commands:

```shell
composer install --no-dev --optimize-autoloader && npm install && npm run build && php artisan migrate --force && php artisan optimize:clear && php artisan optimize
```

Enjoy!
