import '../ContainerListsAppartement/ContainerListsAppartement.css'
import ImgTable from '../../../assets/images/lo.ico'

const ContainerListsAppartement = () => {
  return (
    <>
      <section id="content">
          <main>
              <div className="head-title">
                  <div className="left">
                      <h1 className='h1'>Liste des appartements</h1>
                      <ul className="breadcrumb">
                          <li>
                              <a href="#">Appartement</a>
                          </li>
                          <li><i className='bx bx-chevron-right' ></i></li>
                          <li>
                              <a className="active" href="/listsAppartement">Liste des appartements</a>
                          </li>
                      </ul>
                  </div>
                  <a href="/ajoutAppartement" className="btn-download">
                      <i className='bx bxs-cloud-download' ></i>
                      <span className="text">AJOUTER</span>
                  </a>
              </div>


              <div className="table-date">
                  <div className="orber">
                      <div className="head">
                          <h3>Dernière Appartements</h3>
                          <i className='bx bx-search icon-tbl' ></i>
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
                              <tr>
                                  <td>
                                      <img src={ImgTable} alt="" />
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
                              <tr>
                                  <td>
                                      <img src={ImgTable} alt="" />
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
                                      <img src={ImgTable} alt="" />
                                      <p>Bâtiment A</p>
                                  </td>
                                  <td>6000</td>
                                  <td><span className="status completed">Élève</span></td>
                                  <td>
                                    <button className='btn btn-vu'>V</button>
                                    <button className='btn btn-success'>M</button>
                                    <button className='btn btn-danger'>S</button>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <img src={ImgTable} alt="" />
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
                              <tr>
                                  <td>
                                      <img src={ImgTable} alt="" />
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
                          </tbody>
                      </table>
                  </div>
              </div>


              <div className="table-date">
                <div className="orber">
                  <div className="en-bas-du-tableau">
                    <p>Total Des Loyers: <span>15.000.000</span></p>
                    <p>Loyer Maximal: <span>8000</span></p>
                    <p>Loyer Minimal: <span>500</span></p>
                  </div>
                </div>
              </div>
          </main>
      </section>
    </>
  )
}

export default ContainerListsAppartement