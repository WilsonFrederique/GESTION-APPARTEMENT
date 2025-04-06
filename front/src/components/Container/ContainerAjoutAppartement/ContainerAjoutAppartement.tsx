import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../ContainerAjoutAppartement/ContainerAjoutAppartement.css'
import { createAppartement } from '../../../services/appartements_api'

const ContainerAjoutAppartement = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<{
        design: string;
        loyer: number;
    }>({
        design: '',
        loyer: 0
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'loyer' ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const appartementData = {
                ...formData,
                numApp: Date.now() // Temporaire - le backend devrait générer cet ID
            }

            const result = await createAppartement(appartementData)
            
            if (result) {
                alert('Appartement créé avec succès!')
                // Redirection vers la liste des appartements
                navigate('/listsAppartement')
            } else {
                alert('Erreur lors de la création de l\'appartement')
            }
        } catch (error) {
            console.error('Erreur:', error)
            alert('Une erreur est survenue')
        }
    }

    return (
        <>
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1 className='h1'>Ajout des appartements</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Appartement</a>
                                </li>
                                <li><i className='bx bx-chevron-right' ></i></li>
                                <li>
                                    <a className="active" href="/listsAppartement">Liste des appartements</a>
                                </li>
                                <li><i className='bx bx-chevron-right' ></i></li>
                                <li>
                                    <a className="active" href="/ajoutAppartement">Ajout des appartements</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-date">
                        <div className="orber">
                            <div className="form-conge">
                                <form onSubmit={handleSubmit}>
                                    <div className="input1">
                                        <p>Nom Appartement</p>
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
                                        <p>Loyer</p>
                                        <input 
                                            type="number" 
                                            placeholder="Loyer" 
                                            name="loyer"
                                            value={formData.loyer || ''}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                        />
                                    </div>
                                    
                                    <button type="submit">ENREGISTRER</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default ContainerAjoutAppartement