<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table): void {
            // The random code at the end of a post's URL (/posts/{slug}/{public_id}).
            $table->string('public_id', 16)->nullable()->unique()->after('id');
        });

        // Give posts written before this column their own code. Generated here rather than
        // through the Post model, so this migration keeps working whatever the model becomes.
        DB::table('posts')->whereNull('public_id')->pluck('id')->each(function (int $id): void {
            do {
                $code = Str::random(6);
            } while (DB::table('posts')->where('public_id', $code)->exists());

            DB::table('posts')->where('id', $id)->update(['public_id' => $code]);
        });

        Schema::table('posts', function (Blueprint $table): void {
            $table->string('public_id', 16)->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table): void {
            $table->dropUnique(['public_id']);
            $table->dropColumn('public_id');
        });
    }
};
