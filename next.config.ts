import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Inline so the browser shows the PDF in the tab. The filename is what Save uses.
        source: "/Tanishq_Sharma_Product_Engineer.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="Tanishq_Sharma_Product_Engineer.pdf"',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
