import '../ContainerMessage/ContainerMessage.css'

import Message from '../../../assets/images/message.svg'

const ContainerMessage = () => {
  return (
    <>
        <section id="content">
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1 className='h1'>MESSAGES</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Appartement</a>
                            </li>
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="/messages">Messages</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="table-date">
                    <div className="todo">
                        <div className='img'>
                            <img src={Message} alt="" />
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
  )
}

export default ContainerMessage