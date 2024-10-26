import { useEffect, useState } from 'react';
import { Accordion, Col, Row, Spinner, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomToggle from './CustomToggle';
import LineChart from '../chart/LineChart';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCe } from '../redux/slice/compoundEffectSlice'
import 'react-toastify/dist/ReactToastify.css';


function HistoryModal({ message, ce }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const { deleteLoading, deleteError } = useSelector(store => store.compoundEffect)

    

    return (
        <>  
            <Button variant="primary" onClick={handleShow}>
                {message}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        {/*  chart :  */}
                        {ce && <Row className='justify-content-center'>
                            <Col md={12} className='my-2'>
                                <LineChart years={ce.years} originalAmount={ce.originalAmount} futureAmount={ce.futureAmount} />
                            </Col>
                        </Row>}
                        {/* xem chi tiet :  */}
                        {ce && !ce.error && <div className='my-2 text-center' >
                            <Accordion defaultActiveKey="0">
                                <CustomToggle eventKey="1">Xem Chi Tiết</CustomToggle>
                                <Accordion.Collapse eventKey="1">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Năm</th>
                                                <th>Tiền gốc (VNĐ)</th>
                                                <th>Giá trị tương lai (VNĐ)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ce.years && ce.years.map((_, index) => (
                                                <tr key={index}>
                                                    <td>{ce.years[index]}</td>
                                                    <td>{numeral(ce.originalAmount[index]).format('0,0')}</td>
                                                    <td>{numeral(ce.futureAmount[index]).format('0,0')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Accordion.Collapse>
                            </Accordion>
                        </div>}
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" disabled={deleteLoading} onClick={() => {
                        dispatch(deleteCe(ce._id))
                    }}>
                        {deleteLoading ? <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : ''}
                        {deleteLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default HistoryModal 