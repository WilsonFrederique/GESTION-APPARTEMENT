import '../ContainerHistogramme/ContainerHistogramme.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appartement, getAllAppartement } from '../../../services/appartements_api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';

const ContainerHistogramme = () => {
    const [appartements, setAppartements] = useState<Appartement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalLoyer, setTotalLoyer] = useState(0);
    const [maxLoyer, setMaxLoyer] = useState(0);
    const [minLoyer, setMinLoyer] = useState(0);
    const [radius, setRadius] = useState<number>(50);
    const [skipAnimation, setSkipAnimation] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchAppartements = async () => {
            try {
                const data = await getAllAppartement();
                if (data) {
                    setAppartements(data);
                    calculateStats(data);
                } else {
                    setError("Aucune donnée reçue");
                }
            } catch (err) {
                setError("Erreur lors du chargement des appartements");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppartements();
    }, []);

    const calculateStats = (data: Appartement[]) => {
        const loyers = data.map(a => a.loyer);
        const total = loyers.reduce((sum, loyer) => sum + loyer, 0);
        const max = Math.max(...loyers);
        const min = Math.min(...loyers);
        
        setTotalLoyer(total);
        setMaxLoyer(max);
        setMinLoyer(min);
    };

    const handleRadius = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setRadius(newValue);
    };

    if (loading) return <div className="loading">Chargement en cours...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1 className='h1'>HISTOGRAMME</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">Appartement</a></li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li><a className="active" href="/histogramme">Histogramme</a></li>
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
                                        data: [
                                            { id: 0, value: maxLoyer, label: 'Loyer Maximal' },
                                            { id: 1, value: minLoyer, label: 'Loyer Minimal' },
                                            { id: 2, value: totalLoyer, label: 'Total Des Loyers' },
                                        ],
                                        innerRadius: radius,
                                        arcLabel: (params) => `${params.value.toLocaleString()}`,
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
    );
}

export default ContainerHistogramme;