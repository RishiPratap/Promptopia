"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, getProviders } from "next-auth/react";
export default function Feed() {
  const { data: session } = useSession();
  console.log(session);
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(true);
  useEffect(() => {
    const getProvidersData = async () => {
      const providersData = await getProviders();
      setProviders(providersData);
      console.log(providersData);
    };
    getProvidersData();
  }, []);
  
  return (
    <div>
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
            </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}

                onClick={() => {
                  try {
                    signIn();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="black_btn"
              >

                Sign in
              </button>
            ))}
        </>
      )}
    </div>
  )
}
