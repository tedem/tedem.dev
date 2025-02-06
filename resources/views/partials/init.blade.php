<script>
    try {
        document.documentElement.classList.toggle(
            "dark",
            localStorage.getItem("themeModePreference") === "dark" ||
            (!("themeModePreference" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    } catch (_) {}
</script>
