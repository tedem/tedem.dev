<?php

declare(strict_types=1);

namespace App\Http\Controllers;

final class HomeController extends Controller
{
    /**
     * HomeController constructor.
     *
     * @param  ProjectController  $project  An instance of ProjectController.
     */
    public function __construct(private readonly ProjectController $project) {}

    /**
     * Display the home page.
     *
     * This method returns the view for the home page, passing the GitHub repositories
     * retrieved by the getGithubRepos method to the view.
     *
     * @return \Illuminate\View\View The view for the home page.
     */
    public function index(): \Illuminate\View\View
    {
        return view('home', [
            'githubRepos' => $this->getGithubRepos(),
        ]);
    }

    /**
     * Retrieve GitHub repositories.
     *
     * This method fetches the GitHub repositories associated with the project.
     *
     * @return \Illuminate\Support\Collection A collection of GitHub repositories.
     */
    public function getGithubRepos(): \Illuminate\Support\Collection
    {
        return $this->project->getGithubRepos();
    }
}
