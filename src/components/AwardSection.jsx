import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './AwardSection.css'

const assetBase = import.meta.env.BASE_URL || '/'
const withBase = (path) => `${assetBase}${path.replace(/^\//, '')}`

function AwardSection({ mousePosition }) {
  const ref = useRef(null)
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9])

  const rotateY = (mousePosition.x / windowSize.width - 0.5) * 10
  const rotateX = -(mousePosition.y / windowSize.height - 0.5) * 10

  return (
    <motion.section
      ref={ref}
      className="award-section"
      style={{ opacity, scale }}
    >
      <div className="award-container">
        <motion.div
          className="award-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="award-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Awards & Recognition
          </motion.h2>
          <motion.div
            className="award-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            style={{
              transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            }}
          >
            <div className="award-glow" />
            <div className="award-inner">
              <div className="award-icon">🏆</div>
              <h3 className="award-name">경진대회 입상</h3>
              <p className="award-description">
                우수한 성과를 인정받아 입상하였습니다.
              </p>
              <motion.div
                className="award-pdf"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={withBase('assets/documents/07_%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C%20%EC%9E%85%EC%83%81%20%EC%82%AC%EB%B3%B8.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="award-link"
                >
                  View Certificate →
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AwardSection
