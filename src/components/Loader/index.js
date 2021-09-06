import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import { LoaderContextConsumer } from '../../context/LoaderContext';

export default function Loader() {
  return (
    <LoaderContextConsumer>
      {({ loader, setLoader }) => {
        const handleClose = () => {
          setTimeout(() => setLoader(false), 5000);
        };

        return (
          <div>
            <Backdrop sx={{ color: '#000', zIndex: (theme) => 1600, backgroundColor: 'rgba(50,50,50,0.9)' }} open={loader} onClick={handleClose}>
              <CircularProgress color='inherit' />
            </Backdrop>
          </div>
        );
      }}
    </LoaderContextConsumer>
  );
}
