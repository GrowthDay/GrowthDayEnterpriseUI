import { Portal, styled } from '@mui/material'
import React, { FC, useState } from 'react'
import ReactConfetti from 'react-confetti'

const StyledReactConfetti = styled(ReactConfetti)(({ theme: { zIndex } }) => ({
  pointerEvents: 'none',
  position: 'fixed!important' as any,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: `${zIndex.modal}!important`
}))

const Confetti: FC = () => {
  const [party, setParty] = useState(true)
  return (
    <Portal>
      <StyledReactConfetti
        numberOfPieces={party ? 1500 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setParty(false)
          confetti?.reset()
        }}
      />
    </Portal>
  )
}

export default Confetti
