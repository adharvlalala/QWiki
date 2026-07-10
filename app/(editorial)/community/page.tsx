import Navbar from "@/components/Navbar";

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 px-8 max-w-[1280px] mx-auto bg-white">
        <h1 className="text-4xl font-bold mb-4 text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Community</h1>
        <p className="text-[#5e5e5e]" style={{ fontFamily: "'Inter', sans-serif" }}>Join our community! Information coming soon.</p>
      </main>
    </>
  );
}
