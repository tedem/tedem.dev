<?php

declare(strict_types=1);

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class GitHubService
{
    /**
     * @var string The base URL for GitHub API requests.
     */
    private string $baseUrl = 'https://api.github.com/users/';

    /**
     * @var int The duration (in seconds) for which the cache is valid.
     */
    private int $cacheDuration = 3600 * 24;

    /**
     * Fetches the repositories of a given GitHub user.
     *
     * @param  string  $username  The GitHub username.
     * @return array The list of repositories or an empty array if an error occurs.
     *
     * This method performs the following steps:
     * 1. Validates the provided username.
     * 2. Checks if the repositories are cached and returns them if available.
     * 3. Makes an HTTP request to the GitHub API to fetch the repositories.
     * 4. Caches the fetched repositories for future requests.
     * 5. Logs errors if the request fails or if an exception is thrown.
     *
     * @throws Exception If an error occurs during the HTTP request.
     */
    public function getRepos(string $username)
    {
        if (! env('GITHUB_USERNAME') && ! env('GITHUB_PERSONAL_ACCESS_TOKEN')) {
            return [];
        }

        if ($username === '' || $username === '0') {
            Log::error('Invalid username provided');

            return [];
        }

        $cacheKey = "github.user.repos.{$username}";
        $cachedRepos = Cache::get($cacheKey);

        if ($cachedRepos) {
            return $cachedRepos;
        }

        try {
            $token = env('GITHUB_PERSONAL_ACCESS_TOKEN');

            $response = Http::withHeaders([
                'Accept' => 'application/vnd.github.v3+json',
                'Authorization' => "token {$token}",
            ])->get($this->baseUrl.$username.'/repos');

            if ($response->successful()) {
                $repos = $response->json();

                Cache::put($cacheKey, $repos, $this->cacheDuration);

                return $repos;
            }

            Log::error('Failed to fetch GitHub repos', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return [];
        } catch (Exception $e) {
            Log::error('Failed to fetch GitHub repos', [
                'message' => $e->getMessage(),
            ]);

            return [];
        }
    }
}
