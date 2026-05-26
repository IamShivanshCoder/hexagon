<script lang="ts">
  import { Eye, EyeOff, Loader2 } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let mode = $state<'signin' | 'register'>('signin');

  let username = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let showPassword = $state(false);
  let showConfirm = $state(false);
  let loading = $state(false);
  let submitted = $state(false);

  function switchMode(m: 'signin' | 'register') {
    mode = m;
    username = '';
    email = '';
    password = '';
    confirmPassword = '';
    showPassword = false;
    showConfirm = false;
    submitted = false;
  }

  let errors = $derived(
    mode === 'signin'
      ? {
          username: submitted && !username.trim() ? 'Username or email is required' : '',
          password: submitted && !password ? 'Password is required' : '',
        }
      : {
          username:
            submitted && !username.trim()
              ? 'Username is required'
              : submitted && username.trim().length < 3
                ? 'Username must be at least 3 characters'
                : '',
          email:
            submitted && !email.trim()
              ? 'Email is required'
              : submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ? 'Enter a valid email address'
                : '',
          password:
            submitted && !password
              ? 'Password is required'
              : submitted && password.length < 8
                ? 'Password must be at least 8 characters'
                : '',
          confirm:
            submitted && !confirmPassword
              ? 'Please confirm your password'
              : submitted && confirmPassword !== password
                ? 'Passwords do not match'
                : '',
        }
  );

  let valid = $derived(
    mode === 'signin'
      ? !errors.username && !errors.password
      : !errors.username && !errors.email && !errors.password && !errors.confirm
  );

  function calcStrength(pw: string): 'none' | 'weak' | 'medium' | 'strong' {
    if (!pw) return 'none';
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    if (score <= 1) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
  }

  let passwordStrength = $derived(calcStrength(password));
  let strengthLabel = $derived(passwordStrength === 'none' ? '' : passwordStrength === 'weak' ? 'Weak' : passwordStrength === 'medium' ? 'Medium' : 'Strong');
  let strengthBar = $derived(passwordStrength === 'weak' ? 'bg-red-400 w-[33%]' : passwordStrength === 'medium' ? 'bg-amber-400 w-[66%]' : passwordStrength === 'strong' ? 'bg-cta-green w-full' : 'w-0');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
    if (!valid) return;
    loading = true;
    await new Promise((r) => setTimeout(r, 1000));
    loading = false;
    goto('/explore');
  }
</script>

<svelte:head>
  <title>{mode === 'signin' ? 'Sign In' : 'Join'} — Hexagon</title>
</svelte:head>

<section class="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
  <div class="w-full max-w-[420px]" transition:fade={{ duration: 300 }}>
    <div class="bg-card rounded-2xl shadow-sm p-6 sm:p-8">
      <div class="text-center mb-6">
        <div class="w-10 h-10 bg-hex-green rounded-xl flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-xl leading-none">⬡</span>
        </div>

        <div class="inline-flex bg-hex-green/8 rounded-xl p-1 mb-5">
          <button
            onclick={() => switchMode('signin')}
            class="px-4 py-1.5 text-sm font-medium rounded-lg transition-all {mode === 'signin'
              ? 'bg-white text-near-black shadow-sm'
              : 'text-muted/70 hover:text-near-black'}"
          >
            Sign In
          </button>
          <button
            onclick={() => switchMode('register')}
            class="px-4 py-1.5 text-sm font-medium rounded-lg transition-all {mode === 'register'
              ? 'bg-white text-near-black shadow-sm'
              : 'text-muted/70 hover:text-near-black'}"
          >
            Register
          </button>
        </div>

        {#if mode === 'signin'}
          <h1 class="text-2xl font-bold text-near-black tracking-tight">Welcome back</h1>
          <p class="text-sm text-muted/70 mt-1.5">Sign in to your account to continue</p>
        {:else}
          <h1 class="text-2xl font-bold text-near-black tracking-tight">Join Hexagon</h1>
          <p class="text-sm text-muted/70 mt-1.5">Find your people. Join the room.</p>
        {/if}
      </div>

      <form onsubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="username" class="text-sm font-medium text-near-black block mb-1.5">
            {mode === 'signin' ? 'Username or Email' : 'Username'}
          </label>
          <input
            id="username"
            type="text"
            bind:value={username}
            class="w-full px-4 py-2.5 rounded-xl border text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:ring-2 transition-all {errors.username
              ? 'border-red-400 focus:ring-red-200 bg-red-50'
              : 'border-hex-green/15 focus:border-hex-green/30 focus:ring-hex-green/8 bg-cream'}"
            placeholder={mode === 'signin' ? 'Enter your username or email' : 'Choose a username'}
          />
          {#if errors.username}
            <p class="text-xs text-red-500 mt-1.5">{errors.username}</p>
          {/if}
        </div>

        {#if mode === 'register'}
          <div>
            <label for="email" class="text-sm font-medium text-near-black block mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              bind:value={email}
              class="w-full px-4 py-2.5 rounded-xl border text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:ring-2 transition-all {errors.email
                ? 'border-red-400 focus:ring-red-200 bg-red-50'
                : 'border-hex-green/15 focus:border-hex-green/30 focus:ring-hex-green/8 bg-cream'}"
              placeholder="Enter your email"
            />
            {#if errors.email}
              <p class="text-xs text-red-500 mt-1.5">{errors.email}</p>
            {/if}
          </div>
        {/if}

        <div>
          <label for="password" class="text-sm font-medium text-near-black block mb-1.5">Password</label>
          <div class="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              bind:value={password}
              class="w-full px-4 py-2.5 rounded-xl border text-sm text-near-black placeholder:text-muted/50 pr-11 focus:outline-none focus:ring-2 transition-all {errors.password
                ? 'border-red-400 focus:ring-red-200 bg-red-50'
                : 'border-hex-green/15 focus:border-hex-green/30 focus:ring-hex-green/8 bg-cream'}"
              placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
            />
            <button
              type="button"
              onclick={() => showPassword = !showPassword}
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/50 hover:text-muted transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {#if showPassword}
                <EyeOff class="w-4 h-4" />
              {:else}
                <Eye class="w-4 h-4" />
              {/if}
            </button>
          </div>
          {#if errors.password}
            <p class="text-xs text-red-500 mt-1.5">{errors.password}</p>
          {/if}

          {#if mode === 'register'}
            <div class="mt-2.5 space-y-1">
              <div class="h-1.5 rounded-full bg-hex-green/8 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-300 {strengthBar}"></div>
              </div>
              {#if passwordStrength !== 'none'}
                <p class="text-xs text-muted/60">{strengthLabel}</p>
              {/if}
            </div>
          {/if}
        </div>

        {#if mode === 'register'}
          <div>
            <label for="confirm" class="text-sm font-medium text-near-black block mb-1.5">Confirm Password</label>
            <div class="relative">
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                bind:value={confirmPassword}
                class="w-full px-4 py-2.5 rounded-xl border text-sm text-near-black placeholder:text-muted/50 pr-11 focus:outline-none focus:ring-2 transition-all {errors.confirm
                  ? 'border-red-400 focus:ring-red-200 bg-red-50'
                  : 'border-hex-green/15 focus:border-hex-green/30 focus:ring-hex-green/8 bg-cream'}"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onclick={() => showConfirm = !showConfirm}
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/50 hover:text-muted transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {#if showConfirm}
                  <EyeOff class="w-4 h-4" />
                {:else}
                  <Eye class="w-4 h-4" />
                {/if}
              </button>
            </div>
            {#if errors.confirm}
              <p class="text-xs text-red-500 mt-1.5">{errors.confirm}</p>
            {/if}
          </div>
        {/if}

        <button
          type="submit"
          disabled={loading}
          class="w-full flex items-center justify-center gap-2 bg-hex-green hover:bg-hex-green-light text-white font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {#if loading}
            <Loader2 class="w-4 h-4 animate-spin" />
            {mode === 'signin' ? 'Signing in…' : 'Creating account…'}
          {:else}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          {/if}
        </button>

        {#if mode === 'signin'}
          <a href="/forgot-password" class="block text-center text-xs text-muted/60 hover:text-hex-green transition-colors">
            Forgot password?
          </a>
        {:else}
          <p class="text-xs text-muted/50 text-center leading-relaxed">
            By creating an account you agree to our
            <a href="/terms" class="text-hex-green hover:underline">Terms</a>
            and
            <a href="/privacy" class="text-hex-green hover:underline">Privacy Policy</a>
          </p>
        {/if}
      </form>

      <div class="flex items-center gap-3 my-5">
        <div class="flex-1 h-px bg-hex-green/10"></div>
        <span class="text-xs text-muted/50 flex-shrink-0">or</span>
        <div class="flex-1 h-px bg-hex-green/10"></div>
      </div>

      <button class="w-full flex items-center justify-center gap-2.5 border-2 border-hex-green/15 text-near-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-hex-green/5 hover:border-hex-green/30 transition-all active:scale-[0.98]">
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      <p class="text-center text-xs text-muted/60 mt-6">
        {#if mode === 'signin'}
          Don't have an account?
          <button type="button" onclick={() => switchMode('register')} class="text-hex-green font-semibold hover:underline">Create one</button>
        {:else}
          Already have an account?
          <button type="button" onclick={() => switchMode('signin')} class="text-hex-green font-semibold hover:underline">Sign in</button>
        {/if}
      </p>
    </div>
  </div>
</section>
