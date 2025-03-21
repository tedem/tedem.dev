{{-- Main --}}
<title>{{ $title }}</title>
<meta name="description" content="{{ $description }}">

{{-- Favicon --}}
<link rel="icon" type="image/png" href="{{ asset('favicon-96x96.png') }}" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}" />
<link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />

{{-- URL --}}
<link rel="canonical" href="{{ url()->current() }}">
<link rel="alternate" hreflang="x-default" href="{{ url()->current() }}">

{{-- Dublin Core --}}
<meta name="dc.title" content="{{ $title }}">
<meta name="dc.description" content="{{ $description }}">
<meta name="dc.creator" content="{{ $author }}">
<meta name="dc.date" content="{{ $date }}">
<meta name="dc.language" content="{{ $language }}">

{{-- Open Graph --}}
<meta property="og:title" content="{{ $title }}">
<meta property="og:description" content="{{ $description }}">
<meta property="og:type" content="website">
<meta property="og:url" content="{{ url()->current() }}">
<meta property="og:site_name" content="{{ $title }}">
<meta property="og:image" content="{{ $openGraphImage }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

{{-- Twitter --}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $title }}">
<meta name="twitter:description" content="{{ $description }}">
<meta name="twitter:image" content="{{ $twitterImage }}">
<meta name="twitter:image:alt" content="{{ $title }}">

{{-- Robots --}}
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
<meta name="bingbot" content="index, follow">
<meta name="yandex" content="index, follow">

{{-- Security --}}
@if (app()->environment('production'))
    <meta name="referrer" content="no-referrer-when-downgrade">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
@endif

{{-- Web Application Manifest --}}
<link rel="manifest" href="{{ asset('manifest.json') }}" crossorigin="use-credentials">

<!-- Add to homescreen for Safari on iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="#101828">
<meta name="apple-mobile-web-app-title" content="{{ config('app.name') }}">
<link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">

<!-- Add to homescreen for Chrome on Android -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="{{ config('app.name') }}">
<link rel="icon" sizes="192x192" href="{{ asset('web-app-manifest-192x192.png') }}">

{{-- Theme Color --}}
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#101828">

{{-- Miscellaneous --}}
<link rel="author" href="{{ asset('humans.txt') }}">
<meta name="mobile-web-app-capable" content="yes">
<meta name="generator" content="Laravel">
<meta name="rating" content="general">
