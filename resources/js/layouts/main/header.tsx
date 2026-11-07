import Container from '@/components/main/container';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useId, useState } from 'react';
import { home, login } from '@/routes';

type NavigationItem = {
  label: string;
  code: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { label: 'Home', code: '~/ ', href: home().url },
  { label: 'About', code: '~/about', href: '/about' },
  { label: 'Posts', code: '~/posts', href: '/posts' },
  { label: 'Contact', code: '~/contact', href: '/contact' },
];

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-label={item.label}
          onClick={onNavigate}
          className="text-foreground hover:text-foreground/80 transition-colors"
        >
          <span className="font-mono">{item.code}</span>
        </Link>
      ))}
    </>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuId = useId();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="border-border bg-background/90 relative z-50 border-b backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <Link href={home().url} aria-label="tedem" className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="bg-accent-foreground text-accent flex size-9 items-center justify-center text-sm select-none"
                  aria-hidden="true"
                >
                  //.
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>tedem</p>
              </TooltipContent>
            </Tooltip>

            <span className="text-foreground hidden text-xl font-semibold tracking-wide max-md:inline lg:inline">
              tedem
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            <NavigationLinks />
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" asChild>
              <Link href={login().url}>Login</Link>
            </Button>

            <Button asChild className="hidden lg:flex">
              <Link href="mailto:hello@tedem.dev">
                Let's talk
                <ArrowRight />
              </Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls={mobileMenuId}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </Container>

      {/* Mobile navigation */}
      <nav
        id={mobileMenuId}
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="border-border bg-background border-t py-6 md:hidden"
      >
        <Container>
          <div className="flex flex-col gap-4">
            <NavigationLinks onNavigate={closeMenu} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button variant="outline" asChild>
              <Link href={login().url} onClick={closeMenu}>
                Login
              </Link>
            </Button>

            <Button asChild>
              <Link href="mailto:hello@tedem.dev" onClick={closeMenu}>
                Let's talk
              </Link>
            </Button>
          </div>
        </Container>
      </nav>
    </header>
  );
}
