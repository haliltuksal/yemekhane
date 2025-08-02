"use client";
import { useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  Home, 
  Users, 
  Award, 
  Utensils, 
  Mail, 
  Menu as MenuIcon,
  X,
  Instagram,
  MessageCircle
} from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Ana Sayfa", icon: Home, active: true },
  { href: "/hakkimizda", label: "Hakkımızda", icon: Users },
  { href: "/sertifikalar", label: "Sertifikalar", icon: Award },
  { href: "/menu", label: "Günün Menüsü", icon: Utensils },
  { href: "/iletisim", label: "İletişim", icon: Mail },
];

export default function Header() {
  return (
    <header className="border-b px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Sol taraf - Logo ve Mobil Menü */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex w-full flex-row items-center gap-2 py-1.5 font-medium group/item hover:text-primary"
                          >
                            <Icon
                              size={16}
                              className="text-muted-foreground/80 group-hover/item:text-primary"
                              aria-hidden="true"
                            />
                            <span>{link.label}</span>
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Yemekhane Logo"
                width={48}
                height={48}
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="text-xl font-bold tracking-tight text-primary">
              Yemekhane
            </div>
          </Link>
        </div>

        {/* Orta - Desktop Menü */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className="flex flex-row items-center gap-2 py-1.5 font-medium group/item hover:text-primary text-muted-foreground"
                    >
                      <Icon
                        size={16}
                        className="text-muted-foreground/80 group-hover/item:text-primary"
                        aria-hidden="true"
                      />
                      <span>{link.label}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Sağ taraf - Butonlar */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" size="icon">
            <Link
              href="https://www.instagram.com/YOUR_INSTAGRAM_HANDLE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon">
            <Link
              href="https://wa.me/YOUR_WHATSAPP_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 