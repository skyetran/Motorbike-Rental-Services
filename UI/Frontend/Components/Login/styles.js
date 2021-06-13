import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  login: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    direction:'column',
  },
  input: {
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    width:'200vh',
    transform: 'translateY(20vh)'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'top'
  }
}));
