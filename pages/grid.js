import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Gridtest = () => {
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Paper>
            <Grid container justify="center">
              <Grid item xs={12} sm={6}>
                入れ子の左側
              </Grid>
              <Grid item xs={12} sm={6}>
                入れ子の右側
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>入れ子じゃない右側</Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Gridtest;
