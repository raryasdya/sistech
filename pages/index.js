import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { achievements, contact, organizationExperience, workExperience } from '../constants'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Icon } from '@iconify/react'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.cover}>
          <h1 className={styles.title}>Hi, I&apos;m Fairuza</h1>
          <div className={styles.subtitle}>
            {contact.map((data, index) =>
              <a className='p-2' target='_blank' rel="noreferrer" href={data.link} key={index}>
                <Icon icon={`ant-design:${data.name}-outlined`} color="#4b514a" width="40" />
              </a>
            )}
          </div>
        </section>

        <section className={styles.work}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <VerticalTimeline lineColor="grey">
            {workExperience.map((data, index) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ borderStyle: 'solid', borderColor: '#9dbf9e', color: '#000' }}
                contentArrowStyle={{ borderRight: '15px solid #9dbf9e' }}
                date={data.date}
                iconStyle={{ background: '#9dbf9e', color: '#000' }}
                key={index}
              >
                <>
                  <h4 className="vertical-timeline-element-title">{data.role} </h4>
                  <h4 className='mt-1'> <a href={data.companyLink} style={{ color: '#83a484' }}> {data.company} </a></h4>
                  <hr></hr>
                  {data.details.map((detail, detailIndex) =>
                    <div key={detailIndex} className={styles.timelineText}> &#62; {HTMLReactParser(detail)} </div>
                  )}
                  <hr></hr>
                  <p className="vertical-timeline-element-subtitle text-muted">{data.stacks.join(" - ")}</p>
                </>
              </VerticalTimelineElement>
            )
            )}
          </ VerticalTimeline>
        </section>

        <section className={styles.achievements}>
          <h2 className={styles.sectionTitle}>Past Achievements</h2>
          <div className={styles.grid}>
            {achievements.map((data, index) => (
              <Card key={index} className='m-3 w-75'>
                <Card.Header>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Subtitle className="text-muted">{data.event}, {data.year}</Card.Subtitle>
                </Card.Header>
                <Card.Body>{HTMLReactParser(data.detail)}</Card.Body>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.leadership}>
          <h2 className={styles.sectionTitle}>Leadership Experience</h2>
          <VerticalTimeline lineColor="grey" layout='1-column-left'>
            {organizationExperience.map((data, index) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ borderStyle: 'solid', borderColor: '#9dbf9e', color: '#000' }}
                contentArrowStyle={{ borderRight: '15px solid #9dbf9e' }}
                date={data.date}
                iconStyle={{ background: '#9dbf9e', color: '#000' }}
                key={index}
              >
                <>
                  <h4 className="vertical-timeline-element-title">{data.role}, {data.organization} </h4>
                  <hr></hr>
                  {data.details.map((detail, detailIndex) =>
                    <div key={detailIndex} className={styles.timelineText}> &#62; {HTMLReactParser(detail)} </div>
                  )}
                  <hr className="mb-2"></hr>
                </>
              </VerticalTimelineElement>
            )
            )}
          </ VerticalTimeline>
        </section>

      </main>

      <footer className={styles.footer}> <small> <i> end of file </i> </small> </footer>
    </div >
  )
}
