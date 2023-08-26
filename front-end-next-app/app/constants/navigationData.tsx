interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Get Unicorn", href: "/get-unicorn", current: false },
  { name: "Games", href: "/games", current: false },
];

export { navigation };
export type { NavigationItem };
