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
     * Fetches the repositories of a GitHub user.
     *
     * This method retrieves the repositories of a GitHub user using the GitHub API.
     * It first checks for cached data and returns it if available. If not, it makes
     * an HTTP request to the GitHub API to fetch the repositories. The results are
     * then cached for future use.
     *
     * @return array The list of repositories for the GitHub user.
     *
     * @throws Exception If there is an error during the HTTP request.
     */
    public function getRepos(): array
    {
        $username = env('GITHUB_USERNAME');
        $personalAccessToken = env('GITHUB_PERSONAL_ACCESS_TOKEN');

        if (empty($username) || empty($personalAccessToken)) {
            Log::error('[GitHubService] GitHub credentials not set');

            return [];
        }

        if ($username === '' || $username === '0') {
            Log::error('[GitHubService] Invalid username provided');

            return [];
        }

        $cacheKey = "github.user.repos.{$username}";
        $cachedRepos = Cache::get($cacheKey);

        if ($cachedRepos) {
            return $cachedRepos;
        }

        try {
            $response = Http::withHeaders([
                'Accept' => 'application/vnd.github.v3+json',
                'Authorization' => "token {$personalAccessToken}",
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
            Log::error('[GitHubService] Failed to fetch GitHub repos', [
                'message' => $e->getMessage(),
            ]);

            return [];
        }
    }
}
