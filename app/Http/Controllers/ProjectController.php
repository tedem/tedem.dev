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
     * Retrieve GitHub repositories for the configured username.
     *
     * This method uses the GitHub service to fetch repositories for the username
     * specified in the environment variable 'GITHUB_USERNAME' and returns them
     * as a collection.
     *
     * @return \Illuminate\Support\Collection A collection of GitHub repositories.
     */
    public function getGithubRepos(): \Illuminate\Support\Collection
    {
        return collect($this->gitHubService->getRepos(env('GITHUB_USERNAME')));
    }
}
