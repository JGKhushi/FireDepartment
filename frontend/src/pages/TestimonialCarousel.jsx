import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TestimonialCarousel.css";

const testimonials = [
    {
        name: "Michael Brown",
        role: "Government Official",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Applying for an NOC has never been easier. SafeFlame ensures everything is well-organized and fast.",
    },
    {
        name: "Lisa Green",
        role: "Safety Consultant",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "The AI-based risk analysis feature is a life-saver. This platform is a must-have for safety compliance.",
    },
    {
        name: "David Johnson",
        role: "Fire Inspector",
        image: "https://randomuser.me/api/portraits/men/56.jpg",
        text: "From application to approval, SafeFlame streamlines the entire process seamlessly.",
    },
    {
        name: "Michael Brown",
        role: "Government Official",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Applying for an NOC has never been easier. SafeFlame ensures everything is well-organized and fast.",
    },
    {
        name: "Lisa Green",
        role: "Safety Consultant",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "The AI-based risk analysis feature is a life-saver. This platform is a must-have for safety compliance.",
    },
    {
        name: "David Johnson",
        role: "Fire Inspector",
        image: "https://randomuser.me/api/portraits/men/56.jpg",
        text: "From application to approval, SafeFlame streamlines the entire process seamlessly.",
    },
];

const TestimonialCarousel = () => {
    return (
        <section className="testimonial-section">
            <h2 className="testimonial-title">What People Are Saying</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="testimonial-swiper"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className="testimonial-card">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="testimonial-image"
                        />
                        <p className="testimonial-text">"{testimonial.text}"</p>
                        <h3 className="testimonial-name">{testimonial.name}</h3>
                        <p className="testimonial-role">{testimonial.role}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default TestimonialCarousel;
