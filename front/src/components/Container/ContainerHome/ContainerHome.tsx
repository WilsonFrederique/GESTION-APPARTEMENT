import React from 'react';
import '../ContainerHome/ContainerHome.css';
import ImgTable from '../../../assets/images/lo.ico';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appartement, getAllAppartement, deleteAppartement } from '../../../services/appartements_api';

const ContainerHome = () => {
    const [appartements, setAppartements] = useState<Appartement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalLoyer, setTotalLoyer] = useState(0);
    const [maxLoyer, setMaxLoyer] = useState(0);
    const [minLoyer, setMinLoyer] = useState(0);
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

    const getObservation = (loyer: number): string => {
        if (loyer < 1000) return "Bas";
        if (loyer >= 1000 && loyer <= 5000) return "Moyen";
        return "Élevé";
    };

    const getStatusClass = (loyer: number): string => {
        if (loyer < 1000) return "pending";
        if (loyer >= 1000 && loyer <= 5000) return "process";
        return "completed";
    };

    const handleDelete = async (numApp: number) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet appartement ?")) {
            try {
                await deleteAppartement(numApp);
                const updatedAppartements = appartements.filter(a => a.numApp !== numApp);
                setAppartements(updatedAppartements);
                calculateStats(updatedAppartements);
            } catch (err) {
                console.error("Erreur lors de la suppression:", err);
                alert("Erreur lors de la suppression");
            }
        }
    };

    const handleEdit = (numApp: number) => {
        navigate(`/modifAppartement/${numApp}`);
    };

    const [radius, setRadius] = React.useState<number>(50);
    const [itemNb] = React.useState<number>(3);
    const [skipAnimation, setSkipAnimation] = React.useState<boolean>(false);

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
                        <h1>Tableau de bord</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">Appartements</a></li>
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li><a className="active" href="/">Tableau de bord</a></li>
                        </ul>
                    </div>
                    <a href="/ajoutAppartementSurTBL" className="btn-download">
                        <i className='bx bx-plus'></i>
                        <span className="text">AJOUTER</span>
                    </a>
                </div>

                <ul className="box-info">
                    <li>
                        <i className='bx bxs-calendar-check'></i>
                        <span className="text">
                            <h3 className="txt-box-top">{totalLoyer.toLocaleString()}</h3>
                            <p className="txt-box-bottom">Total Des Loyers</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-coin-stack' ></i>
                        <span className="text">
                            <h3 className="txt-box-top">{maxLoyer.toLocaleString()}</h3>
                            <p className="txt-box-bottom">Loyer Maximal</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-dollar-circle' ></i>
                        <span className="text">
                            <h3 className="txt-box-top">{minLoyer.toLocaleString()}</h3>
                            <p className="txt-box-bottom">Loyer Minimal</p>
                        </span>
                    </li>
                </ul>

                <div className="table-date">
                    <div className="orber">
                        <div className="head">
                            <h3>Derniers Appartements</h3>
                            <div className="search-filter">
                                <i className='bx bx-search icon-tbl' ></i>
                                <i className='bx bx-filter icon-tbl'></i>
                            </div>
                        </div>
                        <table>
                            <thead className="thead">
                                <tr>
                                    <th>Nom Appartement</th>
                                    <th>Loyer</th>
                                    <th>Obs</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {appartements.map((appartement) => (
                                    <tr key={appartement.numApp}>
                                        <td>
                                            <img src={ImgTable} alt="" />
                                            <p>{appartement.design}</p>
                                        </td>
                                        <td>{appartement.loyer.toLocaleString()}</td>
                                        <td>
                                            <span className={`status ${getStatusClass(appartement.loyer)}`}>
                                                {getObservation(appartement.loyer)}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className='btn btn-success'
                                                onClick={() => handleEdit(appartement.numApp)}
                                            >
                                                <i className='bx bxs-edit-alt'></i>
                                            </button>
                                            <button 
                                                className='btn btn-danger'
                                                onClick={() => handleDelete(appartement.numApp)}
                                            >
                                                <i className='bx bxs-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="todo">
                        <Box className="chart">
                            <Typography variant="h6" gutterBottom>
                                Répartition des Loyers
                            </Typography>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: maxLoyer, label: 'Maximal' },
                                            { id: 1, value: minLoyer, label: 'Minimal' },
                                            { id: 2, value: totalLoyer, label: 'Total' },
                                        ],
                                        innerRadius: radius,
                                        arcLabel: (params) => `${params.value.toLocaleString()}`,
                                        arcLabelMinAngle: 20,
                                    },
                                ]}
                                width={400}
                                height={270}
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

export default ContainerHome;