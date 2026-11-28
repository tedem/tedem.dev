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
        Schema::create('comments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('post_id')->constrained()->cascadeOnDelete();
            // One level of replies: a reply points to a top-level comment, never to another reply.
            $table->foreignId('parent_id')->nullable()->constrained('comments')->cascadeOnDelete();
            // Set when the site owner writes the comment from the admin area.
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('author_name', 80);
            // Never shown on the site; only the admin sees it, to reply in private.
            $table->string('author_email');
            $table->text('body');
            // Null: waiting for moderation. Comments appear on the site once approved.
            $table->timestamp('approved_at')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
