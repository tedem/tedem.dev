<?php

declare(strict_types=1);

if (! function_exists('title')) {
    /**
     * Generate a formatted title string.
     *
     * This function generates a title string with an optional suffix. If the current
     * route is 'home', the suffix will be 'Developer'. Otherwise, the suffix will be
     * the application name from the configuration.
     *
     * @param  string  $title  The main title string.
     * @param  bool  $name  Optional. Whether to append the suffix to the title. Default is true.
     * @return string The formatted title string.
     */
    function title(string $title, bool $name = true): string
    {
        $suffix = config('app.name');

        if (request()->routeIs('home')) {
            $suffix = 'Developer';
        }

        return $name
            ? $title.' — '.$suffix
            : $title;
    }
}

if (! function_exists('description')) {
    /**
     * Generates a description string from an array or string input.
     *
     * If the input is an array, it will concatenate the array elements into a single string,
     * separating them with a space, and filtering out any empty elements.
     *
     * @param  array|string  $description  The input description, either as an array or a string.
     * @return string The concatenated description string.
     */
    function description(array|string $description): string
    {
        if (is_array($description)) {
            return implode(' ', array_filter($description));
        }

        return $description;
    }
}
