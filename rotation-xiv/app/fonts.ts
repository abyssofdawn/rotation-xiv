import { Rubik, Merriweather } from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});
export const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-merriweather",
});
