import '../ContainerHistogramme/ContainerHistogramme.css'

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';

// Données simulées pour le graphique
interface ChartData {
    id: number;
    value: number;
    label: string;
  }
  
  const mobileAndDesktopOS: ChartData[] = [
    { id: 2, value: 10000, label: 'Total Des Loyers' },
    { id: 0, value: 5000, label: 'Loyer Maximal' },
    { id: 1, value: 500, label: 'Loyer Minimal' },
  ];

const ContainerHistogramme = () => {
    const [radius, setRadius] = React.useState<number>(50);
    const [itemNb] = React.useState<number>(3);
    const [skipAnimation, setSkipAnimation] = React.useState<boolean>(false);

    

    const handleRadius = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setRadius(newValue);
    };

    return (
        <>
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1 className='h1'>HISTOGRAMME</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Appartement</a>
                                </li>
                                <li><i className='bx bx-chevron-right' ></i></li>
                                <li>
                                    <a className="active" href="/histogramme">Histogramme</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-date">
                        <div className="todo">
                            <Box className="chart">
                                <Typography variant="h6" gutterBottom>
                                    Répartition des Loyers
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                        data: mobileAndDesktopOS.slice(0, itemNb),
                                        innerRadius: radius,
                                        arcLabel: (params) => ` ${params.value} Ar`,
                                        arcLabelMinAngle: 20,
                                        },
                                    ]}
                                    width={800}
                                    height={360}
                                    skipAnimation={skipAnimation}
                                />
                                <div className="chart-controls">
                                    <FormControlLabel
                                        control={
                                        <Checkbox 
                                            className='Checkbox'
                                            checked={skipAnimation}
                                            onChange={(event) => setSkipAnimation(event.target.checked)}
                                        />
                                        }
                                        label="Passer l'animation"
                                        labelPlacement="end"
                                    />
                                    <Typography id="input-radius" gutterBottom>
                                        Rayon intérieur
                                    </Typography>
                                    <Slider
                                        value={radius}
                                        onChange={handleRadius}
                                        valueLabelDisplay="auto"
                                        min={15}
                                        max={100}
                                        aria-labelledby="input-radius"
                                    />
                                </div>
                            </Box>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default ContainerHistogramme