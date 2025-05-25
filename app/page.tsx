"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiDislike, BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";

export default function Home() {
  const [liked, setLiked] = useState(false);
  const [catImage, setCatImage] = useState(
    "https://cataas.com/cat?type=square"
  );

  const saveLikedCatToLocalStorage = (catUrl: string) => {
    const likedCats = JSON.parse(localStorage.getItem("likedCats") || "[]");
    likedCats.push(catUrl);
    localStorage.setItem("likedCats", JSON.stringify(likedCats));
  };

  const getCat = () => {
    const json = "https://cataas.com/cat?json=true&type=square";
    fetch(json)
      .then((response) => response.json())
      .then((data) => {
        setCatImage(data.url);
      })
      .catch((error) => {
        console.error("Error fetching cat image:", error);
      });
  };

  const like = () => {
    if (!liked) {
      saveLikedCatToLocalStorage(catImage);
    }
    setLiked(!liked);
    if (!liked) {
      (document.getElementById("modal") as HTMLDialogElement)!.showModal();
    }
    getCat();
    setLiked(false);
  };

  const generateNewCat = () => {
    setLiked(false);
    getCat();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-base-200 px-4">
      <h1 className="text-5xl font-bold mb-4">I Love Cats</h1>
      <Link href={"/likedcats"}>See your liked cats</Link>
      <p className="text-lg mb-6">Click the heart if you like this cat! 🐱</p>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="avatar">
          <div className="scale-90 w-[300px] rounded-[30px] hover:ring hover:ring-accent duration-300 hover:scale-95 hover:cursor-pointer ring-offset-base-100 ring-offset-2">
            <Image
              alt="Cat"
              src={catImage}
              width={300}
              height={300}
              className="rounded shadow-2xl"
              title="Cat"
            />
          </div>
        </div>
        <div className="card-actions justify-center mb-4">
          <button
            className="btn btn-soft btn-secondary btn-circle"
            onClick={like}
          >
            {!liked ? <BiHeart /> : <FaHeart />}
          </button>
          <dialog id="modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Liked!</h3>
              <p className="py-4">Wow, you really love cats! I do too! 🐱</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <button
            className="btn btn-soft btn-primary btn-circle"
            onClick={generateNewCat}
          >
            <BiDislike />
          </button>
        </div>
      </div>
    </main>
  );
}
