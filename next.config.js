/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: false,
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CURRENCY_KEY: process.env.CURRENCY_KEY,
    BOT_TOKEN: process.env.BOT_TOKEN,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/invite",
          has: [
            {
              type: "header",
              key: "User-Agent",
              value: "^((?!Discordbot).)*$",
            },
          ],
          destination: "https://discord.gg/bNqsZPWhRK",
        },
      ],
      fallback: [
        {
          source: "/api/:path*",
          destination: "http://localhost:443/:path*",
        },
      ],
    };
  },
};
