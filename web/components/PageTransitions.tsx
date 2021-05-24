import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import gsap from 'gsap'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const DUR_MAX = 2.5
const DUR_SHORT = 0.75
const DUR_LONG = 1.25
const ease = 'Power3.easeInOut'

const Z_BACK = 10
const Z_MID = 15
const Z_FRONT = 20

export const PageTransitions: React.FC<{}> = ({ children }) => {
  const router = useRouter()
  const goingToSubPage = !!router.query.handle || !!router.query.slug
  const shadow = '.js-shadow'

  // eslint-disable-next-line no-console
  const logStatus = (msg: any) => console.log(msg)

  /**
   * Animate in
   */
  const animateIn = (node: HTMLElement) => {
    logStatus('animating in...')

    if (goingToSubPage) {
      logStatus('___GOING_TO_SUBPAGE')

      gsap.set(node, { zIndex: Z_FRONT })
      gsap.fromTo(
        shadow,
        { opacity: 0 },
        {
          opacity: 1,
          ease,
          duration: DUR_SHORT,
        }
      )
      gsap.fromTo(node, { y: '100vh' }, { y: '0vh', ease, duration: DUR_LONG })
    } else {
      logStatus('___LATERAL IN')

      gsap.fromTo(
        node,
        { opacity: 0 },
        {
          opacity: 1,
          ease,
          duration: DUR_LONG,
          delay: DUR_SHORT * 1.25,
          zIndex: Z_FRONT,
        }
      )
    }

    // console.log('in', nest)
  }

  /**
   * Animate Out
   */
  const animateOut = (node: HTMLElement) => {
    logStatus('animating out...')

    // Nested -> Top Level
    if (goingToSubPage) {
      logStatus('___GOING_TO_SUB_PAGE')

      // wrapper
      gsap.fromTo(
        node,
        { y: '0vh', zIndex: Z_FRONT },
        { y: '100vh', ease, duration: DUR_LONG }
      )
      // shadow
      gsap.fromTo(
        shadow,
        { opacity: 1 },
        {
          opacity: 0,
          ease,
          duration: DUR_LONG,
        }
      )
    } else {
      logStatus('___LATERAL OUT')

      gsap.to(node, {
        zIndex: Z_BACK,
        opacity: 0,
        ease: 'Power3.easeIn',
        duration: DUR_SHORT,
      })
    }
  }

  return (
    <>
      <TransitionGroup>
        <Transition
          key={router.route}
          timeout={{
            enter: DUR_MAX * 1000,
            exit: DUR_MAX * 1000,
          }}
          mountOnEnter={false}
          unmountOnExit
          onEnter={animateIn}
          onExit={animateOut}
        >
          <Wrapper className="js-wrapper">{children}</Wrapper>
        </Transition>
        <Shadow className="js-shadow" />
      </TransitionGroup>
    </>
  )
}

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  z-index: ${Z_MID};
  pointer-events: none;
  opacity: 0;
`

const Wrapper = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  z-index: 3;
  background: white;
`
