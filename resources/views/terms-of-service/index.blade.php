<x-layouts.app>
    <x-slot name="head">
        <x-meta :title="title('Terms of Service')" :description="description(['Here you can learn more about my terms of service.'])" />
    </x-slot>

    {{-- Header --}}
    <div class="relative space-y-4 p-8">
        {{-- Label --}}
        <x-vertical-label value="Terms of Service" />

        {{-- Title --}}
        <h1 class="text-4xl font-medium tracking-tight text-gray-950 dark:text-gray-50" id="terms-title">
            Terms of Service
        </h1>

        {{-- Description --}}
        <p class="text-balance text-xl font-light text-gray-950 dark:text-gray-50" aria-labelledby="terms-title">
            Here you can learn more about my terms of service.
        </p>
    </div>

    {{-- Main --}}
    <div class="p-8" role="main" aria-labelledby="terms-title" aria-describedby="terms-description">
        <article class="prose dark:prose-invert">
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                1. Acceptance of Terms
            </h2>
            <p>
                Welcome to tedem.dev ("Website"). By accessing or using this Website, you agree to comply with and be
                bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please refrain from using
                the Website.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                2. Modifications to the Terms
            </h2>
            <p>
                We reserve the right to update or modify these Terms at any time without prior notice. Any changes will
                be effective immediately upon posting on this page. Continued use of the Website constitutes your
                acceptance of such changes.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                3. Use of the Website
            </h2>
            <h3 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                3.1 Eligibility
            </h3>
            <p>
                To use this Website, you must be at least 18 years old or have the consent of a parent or guardian.
            </p>
            <h3 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                3.2 Permitted Use
            </h3>
            <p>
                You may use this Website only for lawful purposes and in accordance with these Terms. Prohibited
                activities include, but are not limited to:
            </p>
            <ul>
                <li>Unauthorized access to the Website or its associated systems.</li>
                <li>Disrupting the functionality of the Website.</li>
                <li>Using the Website to distribute harmful or illegal content.</li>
            </ul>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                4. Intellectual Property
            </h2>
            <p>
                All content on this Website, including but not limited to text, images, graphics, logos, and code, is
                the property of Website unless otherwise stated. Unauthorized reproduction, distribution, or
                modification of this content is prohibited.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                5. Disclaimer of Warranties
            </h2>
            <p>
                This Website is provided "as is" and "as available" without warranties of any kind, either express or
                implied. While we strive to keep the content accurate and up-to-date, we do not guarantee its accuracy,
                reliability, or completeness.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                6. Limitation of Liability
            </h2>
            <p>
                To the fullest extent permitted by law, Website shall not be liable for any direct, indirect,
                incidental, special, or consequential damages arising out of your use of or inability to use the
                Website.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                7. Third-Party Links
            </h2>
            <p>
                The Website may contain links to third-party websites. These links are provided for your convenience and
                do not imply endorsement. We are not responsible for the content or practices of third-party sites.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                8. Termination
            </h2>
            <p>
                We reserve the right to terminate or suspend access to the Website at our sole discretion, without prior
                notice, for conduct that we believe violates these Terms or is harmful to others.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                9. Governing Law
            </h2>
            <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Country/Region],
                without regard to its conflict of law principles.
            </p>
            <h2 class="flex items-center gap-3">
                <span class="select-none text-gray-600 dark:text-gray-400" aria-hidden="true">//</span>
                10. Contact Information
            </h2>
            <p>
                For any questions or concerns regarding these Terms, please contact us at:
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
