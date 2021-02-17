import React from "react";
import { Grid, Icon, Button, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import stockTyping from './../../../stockTyping.jpg';

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <section className="section bg-light-primary">
      <div className="container">
        <Grid container spacing={isMobile ? 4 : 10} justify="space-between">
          <Grid item sm={6} xs={12}>
            <img
              src={stockTyping}
              alt="graduate"
              className="max-h-500 max-w-full border-radius-12"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <h1 className="mt-0 text-48 font-normal mb-8 inline-block">
              Our Services
            </h1>
            <p className="my-8 max-w-400">
            Project Eudaimonia is our solution. With data privacy in mind, 
            we’ve developed a secure cloud platform to help users better 
            understand how the internet affects their mental health. We combine 
            the functionality of productivity trackers like RescueTime with a 
            simple and clean user interface for mood logging. 

            </p>
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center">
                <Icon className="mr-4" color="primary">
                  done
                </Icon>
                <p className="my-2">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                </p>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default Services;
