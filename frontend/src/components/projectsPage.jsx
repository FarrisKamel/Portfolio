import React, { useEffect, useRef, useState } from 'react';
import './projectsPage.css';
import useFetchData from '../hooks/useFetchData';
import project_data from '../data/project_data';

export const ProjectsPage = () => {
    const projRefs = useRef([]);
    const projTitleRef = useRef(null);
    const [useFallback, setUseFallback] = useState(false);

    // Fetch data, from hook
    const { data: userData, loading, error }  = useFetchData('/api/projects', useFallback);
    //console.log(userData);
    //console.log(userData.data[0].title);

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
        ? project_data
        : userData.data.length > 0
            ? userData.data.map((project) => ({
            title: project.title,
            description: project.description,
            image: project.image,
            link: project.link
        }))
        : [];
    
    // Return component
    return (
        <div>
            {/* Opener Section */}
            <section className="hero">
                <h1 className="hero-design">
                    {'Projects'.split('').map((letter, index) => (
                        letter === ' ' ? ' ' : (
                            <span 
                                key={index} 
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {letter}
                            </span>
                        )
                    ))}
                </h1>
            </section> 
            

            {/* Projects Section */}
            <div className="projects-wrapper">
                {projects.map((project, index) => (
                    <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        <div key={index} className={`project-item ${index % 2 === 0 ? "left" : "right"} fade-in` } ref={(el) => (projRefs.current[index] = el)}>
                            <div className="project-image-container">
                                <img src={project.image} alt={project.title} className="project-image" />
                            </div>
                            <div className="project-info">
                                <div className="project-title">{project.title}</div>
                                <div className="project-description">{project.description}</div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};


