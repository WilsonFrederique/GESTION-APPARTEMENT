import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAppartement, getAppartement } from '../../../services/appartements_api';
import '../ContainerModifierAppartement/ContainerModifierAppartement.css';

const ContainerModifierAppartement = () => {
    const navigate = useNavigate();
    const { numApp } = useParams<{ numApp: string }>();
    const [formData, setFormData] = useState({
        numApp: 0,
        design: '',
        loyer: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppartement = async () => {
            try {
                if (!numApp) {
                    throw new Error("Numéro d'appartement manquant");
                }

                const num = parseInt(numApp);
                if (isNaN(num)) {
                    throw new Error("Numéro d'appartement invalide");
                }

                const appartement = await getAppartement(num);
                if (!appartement) {
                    throw new Error("Appartement non trouvé");
                }

                setFormData({
                    numApp: appartement.numApp,
                    design: appartement.design,
                    loyer: appartement.loyer
                });
            } catch (err) {
                console.error('Erreur lors du chargement:', err);
                setError(err instanceof Error ? err.message : "Erreur inconnue");
                navigate('/listsAppartement');
            } finally {
                setLoading(false);
            }
        };

        fetchAppartement();
    }, [numApp, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'loyer' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await updateAppartement(formData);
            alert('Appartement modifié avec succès!');
            navigate('/listsAppartement');
        } catch (error) {
            console.error('Erreur:', error);
            setError(error instanceof Error ? error.message : "Erreur lors de la modification");
        }
    };

    if (loading) return <div className="loading">Chargement en cours...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Modification des appartements</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">Appartement</a></li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li><a className="active" href="/listsAppartement">Liste des appartements</a></li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li><a className="active" href="#">Modification d'appartement</a></li>
                        </ul>
                    </div>
                </div>

                <div className="table-date">
                    <div className="orber">
                        <div className="form-conge">
                            <form onSubmit={handleSubmit}>
                                <div className="input1">
                                    <label>Numéro Appartement</label>
                                    <input 
                                        type="text" 
                                        value={formData.numApp}
                                        readOnly
                                    />
                                </div>
                                <div className="input1">
                                    <label>Nom Appartement</label>
                                    <input 
                                        type="text" 
                                        placeholder="Nom Appartement" 
                                        name="design"
                                        value={formData.design}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input1">
                                    <label>Loyer</label>
                                    <input 
                                        type="number" 
                                        placeholder="Loyer" 
                                        name="loyer"
                                        value={formData.loyer}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        step="100"
                                    />
                                </div>
                                
                                <button type="submit" className="btn-modifier">
                                    MODIFIER
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default ContainerModifierAppartement;