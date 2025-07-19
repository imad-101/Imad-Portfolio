import { Laptop } from "lucide-react"
import { Inter } from "next/font/google" // Import the font directly

const inter = Inter({ subsets: ["latin"] }) // Initialize the font

export default function ComingSoonPage() {
  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden ${inter.className}`}
    >
      {/* Subtle radial gradient for depth - now inline Tailwind arbitrary value */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: "linear-gradient(to bottom right, #1a202c, #000000, #0a0a0a)", // Darker base gradient
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%, rgba(0, 0, 0, 1) 100%)",
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
        <Laptop className="h-20 w-20 text-blue-400 animate-pulse mb-4" /> {/* Changed icon color for better contrast */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">Coming Soon!</h1>
        <p className="text-2xl md:text-3xl font-medium text-gray-300">Site Under Maintenance</p>
        <p className="text-xl md:text-2xl text-gray-400 mt-8">Imad Uddin Portfolio</p>
      </div>
    </div>
  )
}
