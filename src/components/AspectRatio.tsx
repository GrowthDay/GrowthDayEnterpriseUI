import { Box, BoxProps, styled } from '@mui/material'

export type AspectRatioProps = BoxProps & {
  ratio: '1 / 1' | '16 / 9' | '4 / 3'
}

const AspectRatio = styled(Box, {
  shouldForwardProp: (propName: keyof AspectRatioProps) => propName !== 'ratio'
})<AspectRatioProps>(({ ratio }) => ({
  aspectRatio: ratio,
  '@supports not (aspect-ratio: 1 / 1)': {
    '&:before': {
      float: 'left',
      paddingTop: '100%',
      content: "''"
    },
    '&:after': {
      display: 'block',
      content: "''",
      clear: 'both'
    }
  },
  '@supports not (aspect-ratio: 16 / 9)': {
    '&:before': {
      float: 'left',
      paddingTop: '56.25%',
      content: "''"
    },
    '&:after': {
      display: 'block',
      content: "''",
      clear: 'both'
    }
  },
  '@supports not (aspect-ratio: 4 / 3)': {
    '&:before': {
      float: 'left',
      paddingTop: '75%',
      content: "''"
    },
    '&:after': {
      display: 'block',
      content: "''",
      clear: 'both'
    }
  }
}))

export default AspectRatio

//   .element {
//   aspect-ratio: 1 / 1;
// }
//
// @supports not (aspect-ratio: 1 / 1) {
// .element::before {
//     float: left;
//     padding-top: 100%;
//     content: "";
//   }
//
// .element::after {
//     display: block;
//     content: "";
//     clear: both;
//   }
// }
