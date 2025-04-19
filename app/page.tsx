"use client";

import React, { useEffect } from "react";
import Book from "./Book";
import { axiosInstance } from "./utils";

export default function Home() {
  const getSessionId = async () => {
    try {
      await axiosInstance.get(`booking2.php`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSessionId();
  }, []);
  return <Book />;
}
