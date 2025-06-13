"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landing-skeleton__title" />
          <Skeleton className="landing-skeleton__subtitle" />
          <Skeleton className="landing-skeleton__subtitle-secondary" />
          <Skeleton className="landing-skeleton__button" />
        </div>
        <Skeleton className="landing-skeleton__hero-image" />
      </div>

      <div className="landing-skeleton__featured">
        <Skeleton className="landing-skeleton__featured-title" />
        <Skeleton className="landing-skeleton__featured-description" />
        <div className="landing-skeleton__tags">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__tag" />
          ))}
        </div>
        <div className="landing-skeleton__courses">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__course-card" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Courses</h1>
          <p className="landing__description">
            Discover a wide range of courses designed to help you learn and
            grow. Whether you're looking to enhance your skills or explore new
            topics, we have something for everyone.
          </p>
          <div className="landing__cta">
            <Link href="/search">
              <div className="landing__cta-button">Search for Courses</div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Hero Banner ${index + 1}`}
              fill
              priority={index === currentImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`landing__hero-image ${
                index === currentImage ? "landing__hero-image--active" : ""
              }`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="landing__featured"
        viewport={{ amount: 0.3, once: true }}
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          Explore our featured courses that are popular among learners.
        </p>
        <div className="landing__tags">
          {[
            "Web Development",
            "Mobile Development",
            "Game Development",
            "DevOps",
            "Data Science",
            "Artificial Intelligence",
            "Machine Learning",
            "Cloud Computing",
            "Cybersecurity",
          ].map((tag, index) => (
            <span key={index} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="landing__courses">
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => {
                    handleCourseClick(course.courseId);
                  }}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
