export const site = {
  name: "Sena Donmez",
  shortName: "Sena",
  surname: "Donmez",
  role: "Software Engineer & 2D/3D Artist",
  email: "dnmz.sn@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-sena.vercel.app",
  copyrightYear: 2026,
  location: "Belgium",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/s3nnxrt" },
    {
      label: "LinkedIn",
      href: "https://be.linkedin.com/in/sena-d%C3%B6nmez-26327b26b",
    },
  ],
} as const;

export type Site = typeof site;
