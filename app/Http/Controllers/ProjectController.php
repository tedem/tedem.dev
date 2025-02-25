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
     * Retrieve GitHub repositories for the configured user.
     *
     * This method fetches the GitHub repositories for the user specified in the
     * environment variables `GITHUB_USERNAME` and `GITHUB_PERSONAL_ACCESS_TOKEN`.
     * If either of these environment variables is not set, an empty collection
     * is returned.
     *
     * @return \Illuminate\Support\Collection A collection of GitHub repositories.
     */
    public function getGithubRepos(): \Illuminate\Support\Collection
    {
        $username = env('GITHUB_USERNAME');
        $personalAccessToken = env('GITHUB_PERSONAL_ACCESS_TOKEN');

        if (empty($username) || empty($personalAccessToken)) {
            return collect([]);
        }

        $repos = $this->gitHubService->getRepos();

        return collect($repos);
    }
}
