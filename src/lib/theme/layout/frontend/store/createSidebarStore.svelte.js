import { spring } from "svelte/motion";
import { updateCookie } from "$lib/utils/storage";
import { onMount } from "svelte";

export function createSidebarStore(initialExpanded, isMobileSSR) {
  console.log(isMobileSSR);
  // Initialize the sidebarExpanded state with the initial value
  let sidebarExpanded = $state(initialExpanded);
  let isMobile = $state(false); // Initially set to false to avoid SSR issues

  // Constants for expanded and collapsed widths
  let expandedWidth = $state(isMobileSSR ? 0 : 256);
  let collapsedWidth = $state(isMobileSSR ? 0 : 69);
  const mobileWidth = 0;

  // Variable to store the previous width before mobile view
  let previousWidth = $state(sidebarExpanded ? expandedWidth : collapsedWidth);

  // Initialize reactive spring for sidebarWidth
  let sidebarWidth = spring(
    initialExpanded ? expandedWidth : collapsedWidth, // Use non-mobile width initially
    {
      stiffness: 0.09,
      damping: 0.35,
    }
  );

  // Function to update the sidebar width based on screen size
  function updateSidebarWidth() {
    isMobile = window.innerWidth < 1024;
    collapsedWidth = 69;
    expandedWidth = 256;
    if (isMobile) {
      // Save the current sidebar width before switching to mobile
      previousWidth = sidebarExpanded ? expandedWidth : collapsedWidth;
      sidebarWidth.set(mobileWidth); // When mobile, set the width to mobileWidth (0)
    }
  }

  // Initial check on mount
  onMount(() => {
    updateSidebarWidth(); // Update the width on initial mount

    function onResize() {
      updateSidebarWidth(); // Update the width on resize
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  // Function to toggle the sidebar and update both state and storage
  function toggleSidebar() {
    sidebarExpanded = !sidebarExpanded;

    updateCookie("sidebarCollapse", sidebarExpanded); // Update the cookie when state changes

    // Update the sidebar width based on the new state
    if (!isMobile) {
      // Update previousWidth when not in mobile
      previousWidth = sidebarExpanded ? expandedWidth : collapsedWidth;
      sidebarWidth.set(previousWidth);
    } else {
      sidebarWidth.set(mobileWidth); // Keep it mobileWidth when in mobile view
    }
  }

  $effect(() => {
    if (!isMobile) {
      sidebarWidth.set(sidebarExpanded ? expandedWidth : collapsedWidth);
    } else {
      sidebarWidth.set(mobileWidth);
    }
  });

  return {
    get sidebarExpanded() {
      return sidebarExpanded;
    },
    get sidebarWidth() {
      return sidebarWidth;
    },
    toggleSidebar,
  };
}
