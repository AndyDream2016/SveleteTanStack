<script>
  import Frontend from "$lib/theme/layout/Frontend.svelte";
  import { page } from "$app/stores";
</script>

<Frontend>
  <div class="flex flex-col items-center justify-center h-[calc(100%-151px)]">
    <h1 class="text-8xl">{$page.status}</h1>
    <div class="text-3xl text-primary font-bold">
      {$page.error.message}
    </div>
  </div>
</Frontend>
