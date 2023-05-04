import { useSession } from '@supabase/auth-helpers-react';
import { FC } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"
import Link from 'next/link';

type ProfileMenuProps = {};

const ProfileMenu: FC<ProfileMenuProps> = () => {
  const session = useSession();
  const user = useUser();
  const supabaseClient = useSupabaseClient()
  const signOut = () => supabaseClient.auth.signOut();

  const items = [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Billing',
      href: '/billing',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
  ];

  const profilepicture = user?.user_metadata?.avatar_url;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {profilepicture ? (
          <div className="flex items-center justify-center w-9 h-19 rounded-full border-[1.5px] border-color transition-all overflow-hidden">
            <Image
              src={profilepicture}
              alt="Profile picture"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-9 h-9 text-neutral-500 border-neutral-400 dark:border-neutral-600 rounded-lg border-[1.5px] hover:ring-2 ring-neutral-300 dark:ring-neutral-700 transition-all">
            <Icons.user className="w-4 h-4" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white dark:bg-neutral-900 dark:border-neutral-700"
      >
        <DropdownMenuLabel
          className="font-sans"
        >
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="hover:cursor-pointer"
          >
            <DropdownMenuItem
              className="hover:cursor-pointer"
            >
              {item.label}
            </DropdownMenuItem>
          </Link>
        ))
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => signOut()}
          className="hover:cursor-pointer"
        >
          Sign out
          <Icons.arrowRight
            className="w-4 h-4 ml-1"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;