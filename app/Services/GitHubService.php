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
     * This method attempts to retrieve the repositories from the cache first.
     * If the repositories are not cached, it fetches them from the GitHub API,
     * caches the result, and then returns the repositories.
     *
     * @param  string  $username  The GitHub username.
     * @param  string  $personalAccessToken  The personal access token for GitHub API authentication.
     * @return array The list of repositories.
     *
     * @throws Exception If there is an error during the API request.
     */
    public function getRepos(string $username, string $personalAccessToken): array
    {
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
