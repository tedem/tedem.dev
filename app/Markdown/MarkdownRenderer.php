<?php

declare(strict_types=1);

namespace App\Markdown;

use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\Footnote\FootnoteExtension;
use League\CommonMark\Extension\GithubFlavoredMarkdownExtension;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use League\CommonMark\MarkdownConverter;
use Phiki\Adapters\CommonMark\PhikiExtension;
use Phiki\Theme\Theme;

/**
 * Turns a post's Markdown into HTML, close to what GitHub renders for a .md file:
 * GitHub Flavored Markdown (tables, task lists, strikethrough, autolinks), footnotes,
 * linkable headings and highlighted code blocks.
 *
 * Raw HTML is allowed, because only admins (users with `is_admin`) can write posts;
 * `javascript:` and similar links are still dropped.
 */
final class MarkdownRenderer
{
    private ?MarkdownConverter $converter = null;

    public function render(string $markdown): string
    {
        return $this->converter()->convert($markdown)->getContent();
    }

    private function converter(): MarkdownConverter
    {
        if ($this->converter instanceof MarkdownConverter) {
            return $this->converter;
        }

        $environment = new Environment([
            'html_input' => 'allow',
            'allow_unsafe_links' => false,
            'heading_permalink' => [
                'html_class' => 'heading-permalink',
                'id_prefix' => '',
                'fragment_prefix' => '',
                'insert' => 'after',
                'symbol' => '#',
                'title' => 'Link to this section',
                'min_heading_level' => 2,
            ],
        ]);

        $environment->addExtension(new CommonMarkCoreExtension);
        $environment->addExtension(new GithubFlavoredMarkdownExtension);
        $environment->addExtension(new FootnoteExtension);
        $environment->addExtension(new HeadingPermalinkExtension);
        // Light colours inline, dark colours as --phiki-dark-* variables that app.css switches to.
        $environment->addExtension(new PhikiExtension(['light' => Theme::GithubLight, 'dark' => Theme::GithubDark]));

        return $this->converter = new MarkdownConverter($environment);
    }
}
