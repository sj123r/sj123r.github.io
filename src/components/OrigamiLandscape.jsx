import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './OrigamiLandscape.css'

const assetBase = import.meta.env.BASE_URL || '/'
const withBase = (path) => `${assetBase}${path.replace(/^\//, '')}`

// Fold data - CV info and projects
const foldData = [
  {
    id: 'about',
    label: 'About',
    color: '#E8DFD0',
    accentColor: '#8B7355',
    content: {
      heading: 'About Me',
      type: 'cv',
      details: [
        'Software Engineer',
        'Passionate about quantitative trading',
      ],
    },
  },
  {
    id: 'skills',
    label: 'Skills',
    color: '#D4C4A8',
    accentColor: '#6B5344',
    content: {
      heading: 'Technical Skills',
      type: 'cv',
      details: [
        'Languages: Python, Kotlin, JavaScript, C++',
        'Graphics: OpenGL, Ray Tracing, Shaders',
        'Web: React, Node.js, Firebase',
        'Mobile: Android, Jetpack Compose',
      ],
    },
  },
  {
    id: 'cornell-box',
    label: 'Ray Tracer',
    color: '#C8B896',
    accentColor: '#5A4A3A',
    content: {
      heading: 'Cornell Box Ray Tracer',
      type: 'project',
      description: 'A physically-based ray tracing engine implementing the classic Cornell Box scene. Features BVH acceleration structure for efficient ray-scene intersection, global illumination with path tracing, and accurate material rendering including diffuse, specular, and glass surfaces.',
      tech: ['Python', 'Ray Tracing', 'BVH', 'Global Illumination'],
      image: withBase('assets/images/cornell_box_final.png'),
      referenceImage: withBase('assets/images/cornell_box_reference.png'),
    },
  },
  {
    id: 'jellyfish',
    label: 'Jellyfish',
    color: '#BCA888',
    accentColor: '#4A3A2A',
    content: {
      heading: '3D Jellyfish Animation',
      type: 'project',
      description: 'Real-time 3D jellyfish animation using Pyglet and OpenGL. Features procedural animation with sine-wave based tentacle movement, translucent material rendering, and dynamic lighting to create a realistic underwater atmosphere.',
      tech: ['Python', 'Pyglet', '3D Graphics', 'Animation'],
      video: withBase('assets/videos/Jellyfish.mov'),
    },
  },
  {
    id: 'rollercoaster',
    label: 'Coaster',
    color: '#B09878',
    accentColor: '#3A2A1A',
    content: {
      heading: 'Roller Coaster Simulation',
      type: 'project',
      description: 'Interactive roller coaster simulation using Catmull-Rom splines for smooth track generation. Implements realistic physics including gravity, centripetal force, and momentum. Features first-person camera view and dynamic environment rendering.',
      tech: ['Python', 'OpenGL', 'Physics', 'Spline'],
      video: withBase('assets/videos/RollerCoaster.mov'),
    },
  },
  {
    id: 'veato',
    label: 'Veato',
    color: '#A48868',
    accentColor: '#2A1A0A',
    content: {
      heading: 'Veato - Team Meal App',
      type: 'project',
      description: 'Android application for team meal decision-making. Built with Kotlin and Jetpack Compose, featuring real-time voting system, restaurant recommendations based on location, and Firebase backend for team synchronization.',
      tech: ['Kotlin', 'Android', 'Firebase', 'Python'],
      video: withBase('assets/videos/Veatodemo.mov'),
      layout: 'side-by-side',
    },
  },
  {
    id: 'education',
    label: 'Education',
    color: '#987858',
    accentColor: '#1A0A00',
    content: {
      heading: 'Education',
      type: 'cv',
      details: [
        'Computer Science & Engineering',
        'Focus: AI Agent System, Quantitative Trading',
        'Research: Trading, AI/ML',
      ],
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    color: '#8C6848',
    accentColor: '#0A0000',
    content: {
      heading: 'Get in Touch',
      type: 'cv',
      details: [
        'Phone: 010-2135-5422',
        'Email: sehee.jang@zeroone.ai',
        'GitHub: github.com/sj123r',
      ],
    },
  },
]

function ExpandedFold({ fold, onClose }) {
  return (
    <motion.div
      className="expanded-fold-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="expanded-fold"
        style={{
          '--fold-color': fold.color,
          '--fold-accent': fold.accentColor,
        }}
        initial={{ scaleX: 0, originX: 0.5 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Fan ribs decoration */}
        <div className="expanded-ribs">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="expanded-rib"
              style={{
                transform: `rotate(${(i - 9.5) * 9}deg)`,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + i * 0.03, duration: 0.4 }}
            />
          ))}
        </div>

        <motion.button
          className="close-btn"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
        >
          ×
        </motion.button>

        <motion.div
          className="expanded-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="expanded-heading">{fold.content.heading}</h2>

          {fold.content.type === 'cv' && fold.content.details && (
            <ul className="expanded-details">
              {fold.content.details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {detail}
                </motion.li>
              ))}
            </ul>
          )}

          {fold.content.type === 'project' && (
            <div className={`expanded-project ${fold.content.layout === 'side-by-side' ? 'side-by-side' : ''}`}>
              {fold.content.tech && (
                <motion.div
                  className="tech-tags"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {fold.content.tech.map((t, i) => (
                    <span key={i} className="tech-tag">{t}</span>
                  ))}
                </motion.div>
              )}

              {fold.content.layout === 'side-by-side' ? (
                <div className="side-by-side-content">
                  <motion.div
                    className="project-media media-left"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    {fold.content.video && (
                      <video
                        src={fold.content.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="media-video small"
                      />
                    )}
                  </motion.div>
                  <motion.div
                    className="description-right"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="project-desc">{fold.content.description}</p>
                  </motion.div>
                </div>
              ) : (
                <>
                  <motion.div
                    className="project-media"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    {fold.content.video ? (
                      <video
                        src={fold.content.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="media-video"
                      />
                    ) : fold.content.image ? (
                      <img
                        src={fold.content.image}
                        alt={fold.content.heading}
                        className="media-image"
                      />
                    ) : null}
                  </motion.div>

                  {fold.content.referenceImage && (
                    <motion.div
                      className="reference-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      <p className="reference-label">Reference (Physical Environment):</p>
                      <img
                        src={fold.content.referenceImage}
                        alt="Reference"
                        className="media-image reference"
                      />
                    </motion.div>
                  )}

                  <motion.p
                    className="project-desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {fold.content.description}
                  </motion.p>
                </>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function OrigamiLandscape() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 })
  const [expandedFold, setExpandedFold] = useState(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  // Smooth mouse tracking with distance-based easing
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth interpolation for mouse position - faster for responsive enlargement
  useEffect(() => {
    const animate = () => {
      setSmoothMouse(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.25,
        y: prev.y + (mousePosition.y - prev.y) * 0.25,
      }))
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [mousePosition])

  // Calculate parallax offset based on distance from element
  const getParallaxOffset = useCallback((elementX, elementY, intensity = 1) => {
    const windowW = window.innerWidth
    const windowH = window.innerHeight
    
    // Normalize mouse position to -0.5 to 0.5
    const normalizedX = (smoothMouse.x / windowW) - 0.5
    const normalizedY = (smoothMouse.y / windowH) - 0.5
    
    // Calculate distance from element to mouse (normalized)
    const dx = (elementX / 100) - 0.5 - normalizedX
    const dy = (elementY / 100) - 0.5 - normalizedY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Further elements move slower (inverse relationship with distance)
    const distanceFactor = Math.max(0.1, 1 - distance * 1.5)
    
    return {
      x: normalizedX * 30 * intensity * distanceFactor,
      y: normalizedY * 20 * intensity * distanceFactor,
    }
  }, [smoothMouse])

  const numFolds = foldData.length
  const foldAngleSpan = 70 // Total angle span of the fan
  const startAngle = -foldAngleSpan / 2

  // Find the closest fold to the current mouse position
  const getClosestFold = useCallback(() => {
    const windowW = typeof window !== 'undefined' ? window.innerWidth : 1512
    const windowH = typeof window !== 'undefined' ? window.innerHeight : 800
    const pivotX = windowW / 2
    const pivotY = windowH * 0.92 // Match CSS bottom: 8%
    const foldRadius = windowH * 0.45
    
    let closestFold = null
    let minDistance = Infinity
    
    foldData.forEach((fold, index) => {
      const angle = startAngle + (index / (numFolds - 1)) * foldAngleSpan
      const foldCenterX = pivotX + Math.sin(angle * Math.PI / 180) * foldRadius
      const foldCenterY = pivotY - Math.cos(angle * Math.PI / 180) * foldRadius
      const dx = mousePosition.x - foldCenterX
      const dy = mousePosition.y - foldCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < minDistance) {
        minDistance = distance
        closestFold = fold
      }
    })
    
    return minDistance < 200 ? closestFold : null
  }, [mousePosition, startAngle, foldAngleSpan, numFolds])

  const handleFoldClick = useCallback(() => {
    const closestFold = getClosestFold()
    if (closestFold) {
      setExpandedFold(closestFold)
    }
  }, [getClosestFold])

  return (
    <div className="origami-landscape" ref={containerRef}>
      {/* Sky gradient */}
      <div className="sky">
        <motion.div 
          className="celestial-body"
          style={{
            x: getParallaxOffset(85, 15, 0.3).x,
            y: getParallaxOffset(85, 15, 0.3).y,
          }}
        />
        <div className="stars">
          {[...Array(40)].map((_, i) => {
            // Use index-based positioning for stable stars
            const starLeft = 5 + ((i * 17) % 90)
            const starTop = 5 + ((i * 13) % 38)
            // Varied delay and duration for natural twinkling
            const animDelay = (i * 0.8) % 10
            const animDuration = 6 + (i % 5) * 2 // 6-14 seconds
            
            return (
              <div
                key={i}
                className="star"
                style={{
                  left: `${starLeft}%`,
                  top: `${starTop}%`,
                  animationDelay: `${animDelay}s`,
                  animationDuration: `${animDuration}s`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Mountain layers with parallax */}
      <div className="mountains">
        <motion.div 
          className="mountain mountain-back"
          style={{
            x: getParallaxOffset(50, 50, 0.15).x,
            y: getParallaxOffset(50, 50, 0.1).y,
          }}
        />
        <motion.div 
          className="mountain mountain-mid"
          style={{
            x: getParallaxOffset(50, 55, 0.25).x,
            y: getParallaxOffset(50, 55, 0.15).y,
          }}
        />
        <motion.div 
          className="mountain mountain-front"
          style={{
            x: getParallaxOffset(50, 60, 0.4).x,
            y: getParallaxOffset(50, 60, 0.2).y,
          }}
        />
      </div>

      {/* Mist layers */}
      <motion.div 
        className="mist mist-1"
        style={{
          x: getParallaxOffset(50, 70, 0.5).x,
        }}
      />
      <motion.div 
        className="mist mist-2"
        style={{
          x: getParallaxOffset(50, 75, 0.6).x,
        }}
      />

      {/* Large spanning fan */}
      <div className="main-fan">
        {/* Fan handle/pivot point */}
        <div className="fan-pivot">
          <div className="pivot-decoration" />
        </div>

        {/* Fan folds */}
        <div className="fan-folds">
          {(() => {
            const currentClosestFold = getClosestFold()
            return foldData.map((fold, index) => {
            const angle = startAngle + (index / (numFolds - 1)) * foldAngleSpan
            
            // Calculate fold center position in viewport coordinates
            const windowW = typeof window !== 'undefined' ? window.innerWidth : 1512
            const windowH = typeof window !== 'undefined' ? window.innerHeight : 800
            
            // Pivot point at bottom center of fan (matches CSS bottom: 8%)
            const pivotX = windowW / 2
            const pivotY = windowH * 0.92
            
            // Calculate detection point along the fold - midway up the fold
            const foldRadius = windowH * 0.45
            const foldCenterX = pivotX + Math.sin(angle * Math.PI / 180) * foldRadius
            const foldCenterY = pivotY - Math.cos(angle * Math.PI / 180) * foldRadius
            
            // Calculate distance from mouse to this fold's detection point
            const dx = mousePosition.x - foldCenterX
            const dy = mousePosition.y - foldCenterY
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            // Proximity factor (0 = far, 1 = close)
            const maxDist = 150
            const proximityFactor = Math.max(0, 1 - distance / maxDist)
            
            // Scale based on proximity (no brightness change to preserve colors)
            const finalScale = 1 + proximityFactor * 0.12
            // Only the closest fold gets the "near" state
            const isNear = currentClosestFold && currentClosestFold.id === fold.id
            
            // Parallax for each fold based on its position
            const foldX = 50 + Math.sin(angle * Math.PI / 180) * 30
            const foldY = 80 - Math.cos(angle * Math.PI / 180) * 20
            const parallax = getParallaxOffset(foldX, foldY, 0.15)

            // Calculate shade gradient: darker on left (index 0), lighter on right (index 7)
            const shadeProgress = index / (numFolds - 1) // 0 to 1
            // Interpolate from darker (#E0D8C8) to lighter (#FFFEF7)
            const r = Math.round(224 + shadeProgress * (255 - 224))
            const g = Math.round(216 + shadeProgress * (254 - 216))
            const b = Math.round(200 + shadeProgress * (247 - 200))
            const foldShade = `rgb(${r}, ${g}, ${b})`

            return (
              <motion.div
                key={fold.id}
                className={`fan-fold ${isNear ? 'near' : ''}`}
                style={{
                  '--fold-index': index,
                  '--fold-color': foldShade,
                  '--fold-accent': fold.accentColor,
                  '--proximity': proximityFactor,
                  x: parallax.x + '%',
                  y: parallax.y + '%',
                  zIndex: isNear ? 50 : 10 + index,
                  filter: isNear 
                    ? `drop-shadow(0 8px 20px rgba(0,0,0,0.5)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))`
                    : 'none',
                  transformOrigin: 'bottom center', // Rotate from pivot point
                }}
                initial={{ 
                  rotate: startAngle - 10, // Start all folds at leftmost position (closed fan)
                  opacity: 0,
                }}
                animate={{ 
                  rotate: angle, // Rotate to final position (open fan)
                  opacity: 1,
                }}
                transition={{ 
                  rotate: {
                    delay: 0.3 + index * 0.06, // Stagger from left to right
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1], // Slight overshoot for natural feel
                  },
                  opacity: {
                    delay: 0.2 + index * 0.04,
                    duration: 0.3,
                  },
                }}
                onClick={handleFoldClick}
              >
                <div className="fold-surface">
                  <div className="fold-crease" />
                  <div className="fold-highlight" />
                </div>
              </motion.div>
            )
          })
          })()}
        </div>

        {/* Labels layer - only show label for the closest fold */}
        <div className="fan-labels">
          {(() => {
            const currentClosestFold = getClosestFold()
            return foldData.map((fold, index) => {
            const angle = startAngle + (index / (numFolds - 1)) * foldAngleSpan
            
            // Only show label for the closest fold
            const isClosest = currentClosestFold && currentClosestFold.id === fold.id
            
            // Calculate proximity for scale
            const windowW = typeof window !== 'undefined' ? window.innerWidth : 1512
            const windowH = typeof window !== 'undefined' ? window.innerHeight : 800
            
            // Pivot point matches the CSS: fan-folds is at bottom: 8%, so pivot is at 92% from top
            const pivotX = windowW / 2
            const pivotY = windowH * 0.92 // Match CSS bottom: 8%
            
            const foldRadius = windowH * 0.45
            const foldCenterX = pivotX + Math.sin(angle * Math.PI / 180) * foldRadius
            const foldCenterY = pivotY - Math.cos(angle * Math.PI / 180) * foldRadius
            const dx = mousePosition.x - foldCenterX
            const dy = mousePosition.y - foldCenterY
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDist = 150
            const proximityFactor = Math.max(0, 1 - distance / maxDist)
            
            // Label scale matches fold scale
            const labelScale = isClosest ? 1 + proximityFactor * 0.2 : 1
            
            // Position label at the radial midpoint of the wedge
            // Use the same pivot point and angle as the wedge
            const labelRadius = windowH * 0.58 // Higher position within the wedge
            
            // Calculate label position using polar coordinates from the fan's pivot
            const labelPosX = pivotX + Math.sin(angle * Math.PI / 180) * labelRadius
            const labelPosY = pivotY - Math.cos(angle * Math.PI / 180) * labelRadius
            
            // Rotate text to align with the wedge's radial direction
            // Text rotates with the wedge angle
            let textRotation = angle
            // If rotation would make text upside-down (angle > 90° or < -90°), flip by 180°
            if (textRotation > 90) textRotation -= 180
            if (textRotation < -90) textRotation += 180
            
            return (
              <motion.span
                key={fold.id}
                className="fold-label"
                style={{
                  left: `${labelPosX}px`,
                  top: `${labelPosY}px`,
                  pointerEvents: isClosest ? 'auto' : 'none',
                  transformOrigin: 'center center',
                }}
                animate={{ 
                  opacity: isClosest ? 1 : 0,
                  scale: labelScale,
                  rotate: textRotation, // Rotate with Framer Motion
                  x: '-50%', // Center horizontally
                  y: '-50%', // Center vertically
                }}
                transition={{ 
                  scale: { duration: 0.08, ease: 'easeOut' },
                  opacity: { duration: 0.15, ease: 'easeOut' },
                  rotate: { duration: 0 }, // Instant rotation
                  x: { duration: 0 },
                  y: { duration: 0 },
                }}
                onClick={handleFoldClick}
              >
                {fold.label}
              </motion.span>
            )
          })
          })()}
        </div>

        {/* Center name - hides when hovering over fan */}
        <motion.div
          className="center-name"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: getClosestFold() ? 0 : 1, 
            scale: getClosestFold() ? 0.95 : 1 
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            x: getParallaxOffset(50, 70, 0.2).x,
            y: getParallaxOffset(50, 70, 0.2).y,
          }}
        >
          <h1 className="name-text">Sehee Jang</h1>
          <p className="name-subtitle">장세희</p>
        </motion.div>

        {/* Fan ribs */}
        <div className="fan-ribs-container">
          {[...Array(numFolds + 1)].map((_, i) => {
            const angle = startAngle + (i / numFolds) * foldAngleSpan
            const ribX = 50 + Math.sin(angle * Math.PI / 180) * 25
            const ribY = 85 - Math.cos(angle * Math.PI / 180) * 15
            const parallax = getParallaxOffset(ribX, ribY, 0.15)
            
            return (
              <motion.div
                key={i}
                className="fan-rib"
                style={{
                  rotate: angle,
                  x: parallax.x + '%',
                  y: parallax.y + '%',
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
              />
            )
          })}
        </div>
      </div>

      {/* Ground */}
      <motion.div 
        className="ground"
        style={{
          x: getParallaxOffset(50, 95, 0.1).x,
        }}
      />

      {/* Paper texture overlay */}
      <div className="paper-texture" />

      {/* Expanded fold view */}
      <AnimatePresence>
        {expandedFold && (
          <ExpandedFold
            fold={expandedFold}
            onClose={() => setExpandedFold(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default OrigamiLandscape
