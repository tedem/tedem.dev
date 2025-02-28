<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\GitHubService;

final class ProjectController extends Controller
{
    /**
     * ProjectController constructor.
     *
     * @param  GitHubService  $gitHubService  The GitHub service instance.
     */
    public function __construct(private readonly GitHubService $gitHubService) {}

    /**
     * Get the GitHub repositories.
     */
    public function getGithubRepos(): \Illuminate\Support\Collection
    {
        $username = config('services.github.username');
        $personalAccessToken = config('services.github.personal_access_token');

        if (empty($username) || empty($personalAccessToken)) {
            return collect([]);
        }

        $repos = $this->gitHubService->getRepos($username, $personalAccessToken);

        return collect($repos);
    }
}
