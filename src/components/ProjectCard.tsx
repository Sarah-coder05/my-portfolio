// src/components/ProjectCard.tsx
"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ProjectCardProps {
  imageSrc?: string | StaticImageData;
  videoSrc?: string;
  title: string;
  description: string;
  liveUrl: string;
  skills: string[];
}

export default function ProjectCard({
  imageSrc,
  videoSrc,
  title,
  description,
  liveUrl,
  skills,
}: ProjectCardProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
        {/* Media: Image only (no video display) */}
        <div className="relative overflow-hidden">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={`Screenshot of ${title} project`}
              width={500}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          {/* Links */}
          <div className="flex justify-between space-x-4">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:bg-gray-50 hover:border p-1 rounded transition"
            >
              Live Site
            </a>
            {videoSrc && (
              <button
                onClick={openVideoModal}
                className="text-green-600 hover:text-green-800 hover:bg-gray-50 hover:border p-1 rounded transition"
              >
                View My Demo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={closeVideoModal} // Close when clicking backdrop
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition text-xl font-bold"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="p-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">
                {title} - Demo Video
              </h3>
            </div>

            {/* Video */}
            <div className="relative bg-black">
              {videoSrc ? (
                <video
                  className="w-full h-[500px] max-h-[900px]"
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  onError={(e) => {
                    console.error("Video failed to load:", videoSrc);
                    alert("Video failed to load. Please check the file path.");
                  }}
                />
              ) : (
                <div className="p-8 text-center text-gray-600">
                  No video available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
