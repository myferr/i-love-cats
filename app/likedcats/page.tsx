"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BiDislike } from "react-icons/bi";

export default function LikedCats() {
  const [likedCats, setLikedCats] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("likedCats");
    setLikedCats(stored ? JSON.parse(stored) : []);
  }, []);

  const handleDislike = (index: number) => {
    const updated = likedCats.filter((_, i) => i !== index);
    setLikedCats(updated);
    localStorage.setItem("likedCats", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-base-200 px-4">
      <h1 className="text-5xl font-bold mb-4">Liked Cats</h1>
      <a href="/">Go back</a>
      <p className="text-lg mb-6">Here are the cats you liked! 🐱</p>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="p-4 grid grid-cols-5 gap-4">
          {likedCats.length > 0 ? (
            likedCats.map((catUrl: string, index: number) => (
              <div
                key={index}
                className="relative mb-4 group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="tooltip">
                  <Image
                    src={catUrl}
                    alt={`Liked Cat ${index + 1}`}
                    className="rounded shadow-2xl w-full hover:brightness-85"
                    width={300}
                    height={300}
                  />
                  <div className="tooltip-content">
                    <p>Remove cat</p>
                    <button
                      onClick={() => handleDislike(index)}
                      className="btn btn-soft btn-primary"
                      aria-label="Remove cat"
                    >
                      <BiDislike />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No liked cats yet!</p>
          )}
        </div>
      </div>
    </main>
  );
}
