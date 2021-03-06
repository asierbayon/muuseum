// material
import { Box } from '@material-ui/core'

// ----------------------------------------------------------------------

export default function Logo({ ...other }) {
  return <Box {...other} component="img" alt="logo" src="/static/brand/logo.svg" />
}
