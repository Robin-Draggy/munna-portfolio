import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";

const title = `${portfolio.name} | ${portfolio.role}`;

export const siteMetadata: Metadata = {
  title: { default: title, template: `%s | ${portfolio.name}` },
  description: portfolio.description,
  openGraph: {
    type: "website",
    title,
    description: portfolio.description,
  },
};
