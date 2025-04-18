/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
});

export default withFlowbiteReact(nextConfig);