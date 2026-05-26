<script lang="ts">
  const linkGroups = [
    {
      heading: 'Platform',
      links: [
        { label: 'About', href: '/about' },
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Encryption', href: '/encryption' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Safety', href: '/safety' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Support Center', href: '/support' },
        { label: 'Community', href: '/community' },
      ],
    },
  ] as const;
</script>

<footer class="border-t border-hex-green/10 bg-white/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
      <div class="sm:col-span-2 lg:col-span-1">
        <a href="/" class="flex items-center gap-2.5 mb-4">
          <div class="w-8 h-8 bg-hex-green rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg leading-none">⬡</span>
          </div>
          <span class="text-xl font-bold text-near-black tracking-tight">hexagon</span>
        </a>
        <p class="text-sm text-muted/70 leading-relaxed max-w-xs">
          Encrypted. Open. Yours. The privacy-first community platform for everyone.
        </p>
        <p class="text-xs text-muted/50 mt-6">&copy; {new Date().getFullYear()} Hexagon. All rights reserved.</p>
      </div>

      {#each linkGroups as group}
        <div>
          <h4 class="text-sm font-semibold text-near-black mb-4">{group.heading}</h4>
          <ul class="space-y-3">
            {#each group.links as link}
              <li>
                <a
                  href={link.href}
                  class="text-sm text-muted/70 hover:text-hex-green transition-colors"
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</footer>
