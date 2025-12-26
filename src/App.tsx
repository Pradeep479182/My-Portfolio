import React from "react";
import Background from "./components/Background";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import WaterLiquidBackground from "./components/WaterLiquidBackground";
import BubbleAnimation from "./components/BubbleAnimation";
import Projects from "./components/Projects/Projects";
import ContactForm from "./components/ContactForm";



function App() {
  return (
    <>
      <Background>
        <WaterLiquidBackground />
        <BubbleAnimation />

        <Hero />

        <Section title="About Me">
          <p>
            I am a passionate frontend developer dedicated to crafting visually appealing and highly functional web interfaces. My work focuses on creating clean, modern, and intuitive UI designs that enhance the user experience. I specialize in implementing smooth animations and interactive elements that make applications more engaging and user-friendly. By combining strong design principles with efficient coding practices, I ensure that every project I build is not only aesthetically pleasing but also responsive, accessible, and optimized for performance.
          </p>
        </Section>

        <Skills />

        {/* Projects Section */}
        <Projects />
        {/* 🔥 CONTACT SECTION */}
      <ContactForm/>

        <Footer />
      
      </Background>

      
    </>
  );
}

export default App;
