import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './ProjectSection.css'

function ProjectSection({ project, index, mousePosition }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])

  const isEven = index % 2 === 0

  return (
    <motion.section
      ref={ref}
      className={`project-section ${isEven ? 'even' : 'odd'}`}
      style={{ opacity, scale, y }}
    >
      <div className="project-container">
        <motion.div
          className={`project-content ${isEven ? 'left' : 'right'}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.span
            className="project-category"
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {project.category}
          </motion.span>
          <motion.h2
            className="project-title"
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {project.title}
          </motion.h2>
          <motion.p
            className="project-description"
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.description}
          </motion.p>
          <motion.div
            className="project-tech"
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {project.tech?.map((tech, i) => (
              <span key={i} className="tech-tag">
                {tech}
              </span>
            ))}
          </motion.div>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              View on GitHub →
            </motion.a>
          )}
        </motion.div>

        <motion.div
          className={`project-media ${isEven ? 'right' : 'left'}`}
          style={{
            background: project.color,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {project.video ? (
            <motion.video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="project-video"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ) : project.images ? (
            <div className="project-images">
              {project.images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  className="project-image"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                />
              ))}
            </div>
          ) : project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="project-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ) : (
            <div className="project-placeholder">
              <div className="placeholder-content">
                <h3>{project.title}</h3>
                <p>AI Agent System</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ProjectSection







