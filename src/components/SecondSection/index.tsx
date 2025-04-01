// src/components/SecondSection/index.tsx
"use client";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const SecondSection = () => {
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto">
        <LiteYouTubeEmbed webp
          id="EpI5KziF548"
          adNetwork
          
          title="Aposentadoria"
          noCookie
        />
      </div>
    </section>
  );
};

export default SecondSection;