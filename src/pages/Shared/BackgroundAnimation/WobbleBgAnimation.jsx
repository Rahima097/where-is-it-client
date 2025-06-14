"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

const WobbleBgAnimation = () => {
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine)
    } catch (error) {
      console.error("Failed to load particles:", error)
    }
  }, [])

  const particlesLoaded = useCallback(async () => {
    console.log("Particles loaded successfully")
  }, [])

  return (
    <Particles
      className="absolute inset-0 -z-10"
      id="wobble-particles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fullScreen: {
          enable: false,
        },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#fe6035", "#fff4f1", "#8b5cf6", "#091057"],
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.6,
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          shape: {
            type: ["circle", "square"],
          },
          size: {
            value: { min: 2, max: 6 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },
        },
      }}
    />
  )
}

export default WobbleBgAnimation
