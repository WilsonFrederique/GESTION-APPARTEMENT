import React from 'react';
import '../ContainerHome/ContainerHome.css';
import ImgTable from '../../../assets/images/lo.ico';
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
  { id: 2, value: 10000, label: 'Total' },
  { id: 0, value: 5000, label: 'Maximal' },
  { id: 1, value: 500, label: 'Minimal' },
];

const ContainerHome = () => {
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
                            <h1>Tableau de bord</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Appartements</a>
                                </li>
                                <li><i className='bx bx-chevron-right' ></i></li>
                                <li>
                                    <a className="active" href="/">Tableau de bord</a>
                                </li>
                            </ul>
                        </div>
                        <a href="/ajoutAppartement" className="btn-download">
                            <i className='bx bxs-plus-circle' ></i>
                            <span className="text">AJOUTER</span>
                        </a>
                    </div>

                    <ul className="box-info">
                        <li>
                            <i className='bx bxs-calendar-check'></i>
                            <span className="text">
                                <h3 className="txt-box-top">1020</h3>
                                <p className="txt-box-bottom">Total Des Loyers</p>
                            </span>
                        </li>
                        <li>
                            <i className='bx bxs-coin-stack' ></i>
                            <span className="text">
                                <h3 className="txt-box-top">2830</h3>
                                <p className="txt-box-bottom">Loyer Maximal</p>
                            </span>
                        </li>
                        <li>
                            <i className='bx bxs-dollar-circle' ></i>
                            <span className="text">
                                <h3 className="txt-box-top">$2543</h3>
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
                                    <tr>
                                        <td>
                                            <img src={ImgTable} alt="Appartement" />
                                            <p>Bâtiment C</p>
                                        </td>
                                        <td>900</td>
                                        <td><span className="status pending">Bas</span></td>
                                        <td>
                                            <button className='btn btn-vu'>V</button>
                                            <button className='btn btn-success'>M</button>
                                            <button className='btn btn-danger'>S</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={ImgTable} alt="Appartement" />
                                            <p>Bâtiment A</p>
                                        </td>
                                        <td>6000</td>
                                        <td><span className="status completed">Élevé</span></td>
                                        <td>
                                            <button className='btn btn-vu'>V</button>
                                            <button className='btn btn-success'>M</button>
                                            <button className='btn btn-danger'>S</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={ImgTable} alt="Appartement" />
                                            <p>Bâtiment C</p>
                                        </td>
                                        <td>900</td>
                                        <td><span className="status pending">Bas</span></td>
                                        <td>
                                            <button className='btn btn-vu'>V</button>
                                            <button className='btn btn-success'>M</button>
                                            <button className='btn btn-danger'>S</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={ImgTable} alt="Appartement" />
                                            <p>Bâtiment A</p>
                                        </td>
                                        <td>6000</td>
                                        <td><span className="status completed">Élevé</span></td>
                                        <td>
                                            <button className='btn btn-vu'>V</button>
                                            <button className='btn btn-success'>M</button>
                                            <button className='btn btn-danger'>S</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={ImgTable} alt="Appartement" />
                                            <p>Bâtiment B</p>
                                        </td>
                                        <td>1000</td>
                                        <td><span className="status process">Moyen</span></td>
                                        <td>
                                            <button className='btn btn-vu'>V</button>
                                            <button className='btn btn-success'>M</button>
                                            <button className='btn btn-danger'>S</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        {/* Chart */}
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
        </>
    );
}

export default ContainerHome;