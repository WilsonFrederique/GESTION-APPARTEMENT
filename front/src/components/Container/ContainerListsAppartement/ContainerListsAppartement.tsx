import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appartement, getAllAppartement, deleteAppartement } from '../../../services/appartements_api';
import '../ContainerListsAppartement/ContainerListsAppartement.css';
import ImgTable from '../../../assets/images/lo.ico';

const ContainerListsAppartement = () => {
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
        setAppartements(data);
        calculateStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
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
        alert(err instanceof Error ? err.message : "Erreur inconnue");
      }
    }
  };

  const handleEdit = (numApp: number) => {
    navigate(`/modifAppartement/${numApp}`);
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1 className='h1'>Liste des appartements</h1>
            <ul className="breadcrumb">
              <li><a href="#">Appartement</a></li>
              <li><i className='bx bx-chevron-right'></i></li>
              <li><a className="active" href="/listsAppartement">Liste des appartements</a></li>
            </ul>
          </div>
          <a href="/ajoutAppartement" className="btn-download">
            <i className='bx bx-plus'></i>
            <span className="text">AJOUTER</span>
          </a>
        </div>

        <div className="table-date">
          <div className="orber">
            <div className="head">
              <h3>Dernières Appartements</h3>
              <i className='bx bx-search icon-tbl'></i>
              <i className='bx bx-filter icon-tbl'></i>
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
        </div>

        <div className="table-date">
          <div className="orber">
            <div className="en-bas-du-tableau">
              <p>Total Des Loyers: <span>{totalLoyer.toLocaleString()}</span></p>
              <p>Loyer Maximal: <span>{maxLoyer.toLocaleString()}</span></p>
              <p>Loyer Minimal: <span>{minLoyer.toLocaleString()}</span></p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ContainerListsAppartement;