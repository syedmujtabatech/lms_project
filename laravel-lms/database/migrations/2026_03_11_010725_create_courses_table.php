<?php

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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('category_id')->nullable();
            $table->foreignId('level_id')->nullable();
            $table->foreignId('language_id')->nullable();
            $table->decimal('sell_price', 10, 2)->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('cross_price', 10, 2)->nullable();
            $table->enum('is_featured', ['yes', 'no'])->nullable()->default('no');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->integer('status')->nullable()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
