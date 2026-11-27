<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table): void {
            // The language the post is written in (App\Enums\Locale). Posts written before
            // this column are Turkish, the site's default language.
            $table->string('locale', 5)->default('tr')->index()->after('public_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table): void {
            $table->dropIndex(['locale']);
            $table->dropColumn('locale');
        });
    }
};
