import React, { useEffect, useRef, useState } from 'react';
import './homePage.css';
import useFetchData from '../hooks/useFetchData';

export const HomePage = () => {
    const eduRefs = useRef([]);
    const expRefs = useRef([]);
    const eduTitleRef = useRef(null);
    const expTitleRef = useRef(null);
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

            if (eduTitleRef.current) observer.observe(eduTitleRef.current); // Education section title
            if (expTitleRef.current) observer.observe(expTitleRef.current); // Experience section title

            // Education section
            eduRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });

            // Experience section
            expRefs.current.forEach((ref) => {
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

    // Get data from db, else if takens too long or error, display static data
    const educationData = (useFallback || error)
        ? [
            { school: 'Columbia University', degree: 'MS in Computer Science', 
                image: "/assets/columbia.webp", link: "https://www.columbia.edu"},
            { school: 'George Washington University', degree: 'BS in Biomedical Engineering',
                image: "/assets/gw.png", link: "https://www.gwu.edu" }
        ] : userData.data.length > 0 
            ? [
                { school: userData.data[0].graduateSchool, degree: userData.data[0].graduateDegree, 
                    image: "/assets/columbia.webp", link: userData.data[0].graduateLink},
                { school: userData.data[0].undergraduateSchool, degree: userData.data[0].undergraduateDegree,
                    image: "/assets/gw.png", link: userData.data[0].undergraduateLink}
            ] : [];

    // Get experience data from db, otherwise static
    const experience = (useFallback || error) 
        ? [
            {
                title: "IDenTV",
                role: "Software Engineer",
                time: "2023 - Present", 
                image: "/assets/identv.png",
                link: "http://newsite.identv.com/index.html"
            },
            {
                title: "PRAISE Lab - Columbia Engineering",
                role: "Student Researcher",
                time: "2024 - Present", 
                image: "/assets/identv.png",
                link: "https://www.cs.columbia.edu/~ansaf/praise/index.html" 

            }
        ] : userData.data.length > 0 
            ? [
                { name: userData.data[4].name, role: userData.data[4].role, time: userData.data[4].time, 
                    image: userData.data[4].image, link: userData.data[4].link },
                { name: userData.data[5].name, role: userData.data[5].role, time: userData.data[5].time, 
                    image: userData.data[5].image, link: userData.data[5].link}
            ] : [];

    // Return component
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <h1 className="hero-design">
                    {'F A R R I S'.split('').map((letter, index) => (
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
                <h1 className="hero-design">
                    {'A L Q A L A M'.split('').map((letter, index) => (
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
                <div className="hero-about">Hi, I'm Farris Alqalam - a problem-solver, builder, and lifelong learner.</div>
            </section>

            {/* Parent Container */}
            <div className="blocks-container">
                {/* First Block */}
                <div className="block-homepage">
                    <section className="title fade-in-section" ref={eduTitleRef}>
                        <h1>Education</h1>
                    </section>
                    <section className="education">
                        {educationData.map((user, index) => (
                            <div key={index} className="edu-item fade-in-section" ref={(el) => (eduRefs.current[index] = el)}>
                                <a href={user.link} target="_blank" rel="noopener noreferrer" className="edu-link">
                                    <img href="www.google.com" src={user.image} alt={user.school} className="school-image"/>
                                </a>
                                <a href={user.link} target="_blank" rel="noopener noreferrer" className="edu-link">
                                    <div href="www.google.com" className="edu-title">{user.school}</div>
                                </a>
                                <div className="edu-degree">{user.degree}</div>
                            </div>
                        ))}
                    </section>
                </div>

                {/* Second Block */}
                <div className="block-homepage">
                    <section className="title fade-in-section" ref={expTitleRef}>
                        <h1>Experience</h1>
                    </section>
                    <section className="education">
                        {experience.map((user, index) => (
                            <div key={index} className="edu-item fade-in-section" ref={(el) => (expRefs.current[index] = el)}>
                                <a href={user.link} target="_blank" rel="noopener noreferrer" className="edu-link">
                                    <img src={user.image} alt={user.name} className="school-image"/>
                                </a>
                                <a href={user.link} target="_blank" rel="noopener noreferrer" className="edu-link">
                                    <div className="edu-title">{user.name}</div>
                                </a>
                                <div className="edu-degree">{user.role}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>

        </div>
    );
};
