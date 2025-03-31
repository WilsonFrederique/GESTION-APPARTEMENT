import '../ContainerAjoutAppartement/ContainerAjoutAppartement.css'

const ContainerAjoutAppartement = () => {
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
                              <a className="active" href="/ajoutAppartement">Ajout des appartements</a>
                          </li>
                      </ul>
                  </div>
              </div>

              <div className="table-date">
                  <div className="orber">
                        <div className="form-conge">
                            <form action="#">
                                <div className="input1">
                                    <p>Numéro Appartement</p>
                                    <input type="text" placeholder="Numéro Appartement ( Exemple: A001 )" id="vid1" />
                                </div>
                                <div className="input1">
                                    <p>Nom Appartement</p>
                                    <input type="text" placeholder="Nom Appartement" id="vid1" />
                                </div>
                                <div className="input1">
                                    <p>Loyer</p>
                                    <input type="number" placeholder="Loyer" id="vid1" />
                                </div>
                                
                                <button>ENREGISTRER</button>
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