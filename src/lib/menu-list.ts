import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  PieChartIcon,
  Home,
  LayoutGridIcon,
  FileCheck,
  TrendingUpIcon,
  CloudUploadIcon,
  BookText,
  BrainCircuit,
  UserRoundPlus,
  FileCog,
  Save
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon | React.ComponentType | string;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// import DonutIcon from "../../public/donut.svg";
import GemIcon from "../../public/gem.svg";

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: Home,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/brand-book",
          label: "Brand Book",
          icon: PieChartIcon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/brand-ebook",
          label: "Brand E-Book",
          icon: BookText,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/brand-deck",
          label: "Brand Deck",
          icon: LayoutGridIcon,
          submenus: []
        }
      ]
    },

    {
      groupLabel: "",
      menus: [
        {
          href: "/one-pager",
          label: "One Pager",
          icon: FileCheck,
          submenus: []
        }
      ]
    },

    {
      groupLabel: "",
      menus: [
        {
          href: "/infographics",
          label: "Infographics",
          icon: TrendingUpIcon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/ai-logo-generation",
          label: "AI Logo Generator",
          icon: BrainCircuit,
          submenus: []
        }
      ]
    },

    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts"
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       icon: Bookmark
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       icon: Tag
    //     }
    //   ]
    // },

    {
      groupLabel: "",
      menus: [
        {
          href: "/file-content",
          label: "File Content",
          icon: CloudUploadIcon
        }
      ]
    },
    
    {
      groupLabel: "",
      menus: [
        {
          href: "/save-brand-info",
          label: "Save Brand Details",
          icon: Save
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/subscription",
          label: "Subscription",
          icon: GemIcon
        }
      ]
    },

    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/users",
          label: "Admin User Controller",
          icon: UserRoundPlus
        },
        
        
      ]
    },
    
  ];
}
