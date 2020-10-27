import React, { useContext, useEffect, useMemo } from 'react';
import { Context as UrlsContext } from "../../Context/UrlsContext";
import { motion, AnimatePresence } from 'framer-motion';
import Accord from '../../Components/Accordion/Accord';
import { Jumbotron, Button } from 'reactstrap';
import classes from './Dashboard.module.css';
import {
  Link
} from "react-router-dom";
import { Line } from 'react-chartjs-2';
const moment = require('moment');

const Dashboard = () => {
  const { state, updateDashboard } = useContext(UrlsContext);
  const { dashboardurls } = state;

  useEffect(() => {
    updateDashboard();
    // eslint-disable-next-line
  }, [])



  const lineGraphChartData = dashboardurls.map(el => {
    const { day, month, year } = el._id;
    const { count } = el;
    // console.log(moment(`${year} ${month} ${day}`, 'YYYY MM DD'));

    return {
      x: moment(`${year} ${month} ${day}`, 'YYYY MM DD'),
      y: count
    };
  });


  const chartData = useMemo(() => {
    return {
      datasets: [{
        label: 'Urls',
        backgroundColor: "rgb(245, 66, 111)",
        borderColor: "rgb(245, 66, 111)",
        fill: false,
        radius: 6,
        pointRadius: 6,
        capBezierPoints: true,
        stepped: true,
        data: lineGraphChartData
      }]
    }
  },
    [lineGraphChartData])

  // const chartData = {...lineGraphChartData};
  console.log(chartData);

  return (
    <>
      <AnimatePresence>
        <div style={{ width: '100%', marginTop: 15, height: '100%' }}>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            style={{ display: 'flex', flexDirection: "column", alignItems: 'center', height: '100%' }}
          >
            {dashboardurls.length > 0 ? <Accord urls={dashboardurls} /> :
              <div>
                <Jumbotron>
                  <h1 className="display-3">Hi Welcome to uriShortly!</h1>
                  <p className="lead">Get your large messy urls into cripsy and shorter urls</p>
                  <hr className="my-2" />
                  <p>You don't have any urls added, start adding urls by clicking the button below</p>
                  <p className="lead">
                    <Link to="/urlslist"><Button color="primary">Start Adding</Button></Link>
                  </p>
                </Jumbotron>
              </div>
            }
            <div className={classes.chartLineGraph}>
              {
                dashboardurls.length > 0 ?
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      title: {
                        display: true,
                        text: 'Short Urls Created by you at uriShortly'
                      },
                      scales: {
                        xAxes: [{
                          type: 'time',
                          display: true,
                          distribution: 'linear',
                          time: {
                            displayFormats: {
                              'millisecond': 'MMM DD',
                              'second': 'MMM DD',
                              'minute': 'MMM DD',
                              'hour': 'MMM DD',
                              'day': 'MMM DD',
                              'week': 'MMM DD',
                              'month': 'MMM DD',
                              'quarter': 'MMM DD',
                              'year': 'MMM DD',
                            },
                            unit: 'day',
                            tooltipFormat: 'll HH:mm'
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Date'
                          },
                          ticks: {
                            major: {
                              fontStyle: 'bold',
                              fontColor: '#FF0000'
                            },
                            beginAtZero: true
                          }
                        }],
                        yAxes: [{
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'value'
                          },
                          ticks: {
                            min: 0,
                            beginAtZero: true,
                            stepSize: 2
                          }
                        }]
                      }
                    }}
                  /> : null
              }
            </div>
          </motion.div>
        </div>

      </AnimatePresence>
    </>
  )
}

export default Dashboard;


