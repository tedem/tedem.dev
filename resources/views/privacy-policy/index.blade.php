<x-layouts.app>
    <x-slot name="head">
        <x-meta :title="title('Privacy Policy')" :description="description(['Here you can learn more about my privacy policy.'])" />
    </x-slot>

    {{-- Header --}}
    <div class="relative space-y-4 p-8">
        {{-- Label --}}
        <x-vertical-label value="Privacy Policy" />

        {{-- Title --}}
        <h1 class="text-4xl font-medium tracking-tight text-gray-950 dark:text-gray-50" id="about-title">
            Privacy Policy
        </h1>

        {{-- Description --}}
        <p class="text-balance text-xl font-light text-gray-950 dark:text-gray-50" aria-labelledby="privacy-title">
            Here you can learn more about my privacy policy.
        </p>
    </div>

    {{-- Main --}}
    <div class="p-8" role="main" aria-labelledby="privacy-title" aria-describedby="privacy-description">
        <article class="prose dark:prose-invert">
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                1. Introduction
            </h2>
            <p>
                Welcome to tedem.dev ("Website"). Your privacy is important to us. This Privacy Policy explains how we
                collect, use, and protect your personal information when you use our Website.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                2. Information We Collect
            </h2>
            <p>
                We may collect the following types of information:
            </p>
            <h3 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                2.1 Personal Information
            </h3>
            <ul>
                <li>Name</li>
                <li>Email Address</li>
                <li>Any other information you provide via contact forms or registration.</li>
            </ul>
            <h3 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                2.2 Non-Personal Information
            </h3>
            <ul>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Pages visited and time spent on the Website</li>
                <li>Cookies and similar tracking technologies</li>
            </ul>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                3. How We Use Your Information
            </h2>
            <p>
                We use the information collected for the following purposes:
            </p>
            <ul>
                <li>To provide and improve our services.</li>
                <li>To communicate with you regarding inquiries or updates.</li>
                <li>To analyze Website performance and usage.</li>
                <li>To ensure the security and functionality of the Website.</li>
            </ul>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                4. Cookies and Tracking Technologies
            </h2>
            <p>
                We use cookies and similar technologies to enhance your browsing experience. You can control cookies
                through your browser settings. However, disabling cookies may affect the functionality of the Website.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                5. Sharing of Information
            </h2>
            <p>
                We do not sell, trade, or rent your personal information to third parties. However, we may share
                information with:
            </p>
            <ul>
                <li>Service providers who assist in operating our Website.</li>
                <li>Legal authorities, if required by law.</li>
            </ul>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                6. Data Security
            </h2>
            <p>
                We implement reasonable security measures to protect your information. However, no method of
                transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
                security.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                7. Third-Party Links
            </h2>
            <p>
                Our Website may contain links to third-party websites. We are not responsible for the privacy practices
                or content of these websites.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                8. Your Rights
            </h2>
            <p>
                You have the right to:
            </p>
            <ul>
                <li>Access the personal information we hold about you.</li>
                <li>Request corrections to your personal information.</li>
                <li>Request deletion of your personal information, subject to legal and contractual obligations.</li>
            </ul>
            <p>
                To exercise these rights, please contact us at the email address below.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                9. Changes to This Privacy Policy
            </h2>
            <p>
                We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page, and
                the "Effective Date" will be updated accordingly.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                10. Contact Information
            </h2>
            <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
                <a href="mailto:hello@tedem.dev">hello@tedem.dev</a>.
            </p>
        </article>
    </div>
    <div class="flex items-center gap-4 p-8">
        <p>
            <b>Effective Date:</b> 13.03.2025
        </p>
    </div>
</x-layouts.app>
