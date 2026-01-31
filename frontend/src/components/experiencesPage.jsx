import React, { useEffect, useRef, useState } from 'react';
import './experiencesPage.css';
import useFetchData from '../hooks/useFetchData';

export const ExperiencePage = () => {
    const expRefs = useRef([]);
    const skillRefs = useRef([]);
    const expTitleRef = useRef(null);
    const skillTitleRef = useRef(null);
    const [useFallback, setUseFallback] = useState(false);

    // Fetch experience data
    const { data: userData, loading, error }  = useFetchData('/api/experience', useFallback);
    //console.log(userData);

    // Timeout function, if DB takes too long, use static data.
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                console.log("Timeout reached: Switching to static data...");
                setUseFallback(true);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [loading]);

    // Effects for animations
    useEffect(() => {
        if (!loading) {
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

            if (expTitleRef.current) observer.observe(expTitleRef.current); 
            if (skillTitleRef.current) observer.observe(skillTitleRef.current); 
            if (skillRefs.current) observer.observe(skillRefs.current); 

            expRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });

            return () => observer.disconnect();
        }
    }, [loading]);

    // Loading page if loading, only appears if loading is under 2 seconds
    if (loading) {
        return <div className="loading-screen">Loading...</div>;
    }

    // Experience data
    const experiences = (useFallback || error)
        ? [
            {
                title: "Investment Banking Analyst",
                company: "Clear Street",
                start: "Jun 2025",
                end: "Present",
                location: "New York, NY",
                bulletpoint1: "M&A.",
            },
            {
                title: "Software Engineer",
                company: "IDenTV",
                start: "Sep 2023",
                end: "Mar 2025",
                location: "McLean, VA (Remote)",
                bulletpoint1: "Developed AI-driven video analytics tools for real-time processing.",
                bulletpoint2: "Implemented machine learning pipelines for large-scale datasets.",
                bulletpoint3: "Enhanced backend system efficiency for optimized performance.",
            },
            {
                title: "Student Reseacher",
                company: "Columbia University PRAISE Lab",
                start: "Jun 2024",
                end: "Present",
                location: "New York, NY",
                bulletpoint1: "Assisting in AI research related to predictive modeling.",
                bulletpoint2: "Developing machine learning models for real-world applications.",
                bulletpoint3: "Collaborating with a team of researchers to enhance data efficiency.",
            },
            {
                title: "Software Engineer Intern",
                company: "IDenTV",
                start: "May 2023",
                end: "Aug 2023",
                location: "McLean, VA",
                bulletpoint1: "Introduced to machine learning frameworks including PyTorch, gaining foundational skills in model development.",
                bulletpoint2: "Processed 1000+ images to determine data points for a machine learning model under a U.S. government contract.",
                bulletpoint3: "Facilitated development of a predictive model used to enhance operational efficiencies for government applications."
            },
            {
                title: "Biomedical Engineer",
                company: "The McCaffrey Lab, GWU School of Medicine",
                start: "Jun 2022",
                end: "May 2023",
                location: "Washington, DC",
                bulletpoint1: "Led a project for building a functioning touchscreen operating in C++.",
                bulletpoint2: "Designed, manufactured, and tested 3 printed circuit boards using EAGLE.",
                bulletpoint3: "Built a model for final casing of the product utilizing SolidWorks and AutoCAD."
            }
        ]
        : userData.data.length > 0
            ? userData.data.map((experience) => ({
                title: experience.title,
                company: experience.company,
                start: experience.start,
                end: experience.end,
                location: experience.location,
                bulletpoint1: experience.bulletpoint1,
                bulletpoint2: experience.bulletpoint2,
                bulletpoint3: experience.bulletpoint3,
            }))
            : [];

    // Return component
    return (
        <div>
            {/* Title Section */}
            <section className="hero">
                <h1 className="hero-design">
                    {'Experience'.split('').map((letter, index) => (
                        letter === ' ' ? ' ' : (
                            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                {letter}
                            </span>
                        )
                    ))}
                </h1>
            </section>
            
            {/* Subtitle Section */}
            <div className="subtitle fade-in" ref={expTitleRef}>
                Professional Experience
            </div>

            {/* Timeline Section */}
            <section className="all">
                <div className="timeline">
                    <div className="timeline-line"></div> {/* Vertical timeline line */}
                    
                    {experiences.map((exp, index) => (
                        <div key={index} className="timeline-item fade-in" ref={(el) => (expRefs.current[index] = el)}>
                            <div className="timeline-dot"></div> {/* Dots on the timeline */}
                            <div className="timeline-content">
                                <div className="experience-title">{exp.title}</div>
                                <div className="experience-company">{exp.company}</div>
                                <div className="date-location">
                                    <span className="experience-date">{exp.start} - {exp.end}</span>
                                    <span className="experience-date">{exp.location}</span>
                                </div>
                                <ul className="experience-bullets">
                                    <li>{exp.bulletpoint1}</li>
                                    <li>{exp.bulletpoint2}</li>
                                    <li>{exp.bulletpoint3}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subtitle */}
            <div className="subtitle fade-in" ref={skillTitleRef}>
                Skills 
            </div>

            {/* Skills Container */}
            <div className="skills-container timeline-content fade-in" ref={skillRefs}>
                <div className="skills-category">
                    <div className="skills-title">Finance:</div>
                    <div className="skills-content">
                        Financial Modeling, Valuation, Bloomberg, FactSet, PitchBook, Excel, Powerpoint
                    </div>
                </div>
                <div className="skills-category">
                    <div className="skills-title">Programming Languages:</div>
                    <div className="skills-content">
                        Python, C, C++, Java, R, SQL, Matlab, HTML, CSS, JavaScript, Git
                    </div>
                </div>
                <div className="skills-category">
                    <div className="skills-title">Frameworks & Libraries:</div>
                    <div className="skills-content">
                        React, Node.js, Express.js, Flask, Pandas, JQuery, Bootstrap, OpenCV, PyTorch, TensorFlow, Scikit-learn, OpenAI, AI Agents, PostgreSQL, MongoDB
                    </div>
                </div>
                <div className="skills-category">
                    <div className="skills-title">Languages:</div>
                    <div className="skills-content">
                        Arabic and English
                    </div>
                </div>
            </div>
        </div>
    );
};

