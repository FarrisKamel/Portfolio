import React, { useEffect, useRef, useState } from 'react';
import './homePage.css';
import useFetchData from '../hooks/useFetchData';

export const Projecthomepage = () => {
    const projRefs = useRef([]);
    const projTitleRef = useRef(null);
    const [useFallback, setUseFallback] = useState(false);

    // Fetch data, from hook
    const { data: userData, loading, error }  = useFetchData('/api', useFallback);
    //console.log(userData);

    // Timeout function, if db takes too long, use static data.
    useEffect(() => {
        const timer = setTimeout(() => {
            if(loading){
                console.log("Timeout reached: Switching to static data...");
                setUseFallback(true);
            }
        }, 2000);   // Two seconds 

        return () => clearTimeout(timer);
    }, [loading]);

    // Effects for animation
    useEffect(() => {
        if (!loading){
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            if (projTitleRef.current) observer.observe(projTitleRef.current);   // Project title section
            
            // Project section
            projRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });

            return () => observer.disconnect();
        }
    }, [loading]);


    // Loading page if loading, only appears if loading is under 2 seconds 
    if (loading) {
        return (
            <div className="loading-screen">
                Loading...
            </div>
        );
    }

    // Get project data from db, otherwise static
    const projects = (useFallback || error) 
        ? [
        {
            title: "ClearCapture",
            description: "An automated vision system capturing unobstructed product images on a conveyor belt.",
            image: "/assets/ClearCapture.png", 
            link: "https://github.com/FarrisKamel/hand_detection"
        },
        {
            title: "Munchies Menu",
            description: "An AI-powered virtual chef that creates personalized recipes.",
            image: "/assets/MunchiesMenu.png", 
            link: "https://www.google.com"
        },
        {
            title: "Pixel2ASCII",
            description: "A tool that transforms any image into a detailed ASCII representation.",
            image: "/assets/Pixel2ASCII.png",
            link: "https://github.com/FarrisKamel/image-to-ascii"
        }
        ] : userData.data.length > 0 
        ? [
            { title: userData.data[1].title, description: userData.data[1].description, 
                    image: userData.data[1].image, link: userData.data[1].link },
            { title: userData.data[2].title, description: userData.data[2].description, 
                    image: userData.data[2].image, link: userData.data[2].link },
            { title: userData.data[3].title, description: userData.data[3].description, 
                    image: userData.data[3].image, link: userData.data[3].link },
        ] : [];
    
    // Return component
    return (
        <div className="homepage">
            {/* Title Section */}
            <div className="blocks-container">
                <div className="block-homepage-2">
                    <section className="title fade_in_section" ref={projTitleRef}>
                        <h1>
                            Featured Projects
                        </h1>
                    </section>

                    {/* Projects Section */}
                    <section className="projects-section">
                        <div className="projects-container">
                            {projects.map((project, index) => (
                                <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                    <div key={index} className="project-card fade-in-section" ref={(el) => (projRefs.current[index] = el)}>
                                        <img src={project.image} alt={project.title} className="project-image" />
                                        <div className="edu-title-2">{project.title}</div>
                                        <div className="edu-degree-2">{project.description}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
};

