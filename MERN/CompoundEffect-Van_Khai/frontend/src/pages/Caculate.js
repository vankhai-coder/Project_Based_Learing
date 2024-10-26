import { Accordion, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Form, useActionData, useLoaderData } from 'react-router-dom'
import LineChart from '../chart/LineChart';
import numeral from 'numeral';
import CustomToggle from '../components/CustomToggle';
import History from './History';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/slice/compoundEffectSlice'
import { useEffect } from 'react';

const Caculate = () => {
  const resp = useActionData();
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  let token = '';


  // Use useEffect to dispatch the action after the component renders
  useEffect(() => {
    if (resp) {
      dispatch(add(resp));  // Dispatch when `resp` is available
    }
  }, [resp, dispatch]);  // Only run this effect when `resp` changes

  if (user) {
    token = user.token;
  } else {
    return <>You must log in </>;
  }


  return (
    <Container>
      <Row className='justify-content-between'>
        <Col md={7}>
          <Form method='post' action="/caculate">
            <div className='my-2'>
              <h3>Bước 1: Đầu tư ban đầu</h3>
              <label htmlFor="tien-goc">Số tiền gốc ban đầu (VNĐ)</label>
              <input className='ms-5' type="number" name="p" id="tien-goc" />
            </div>

            <div className='my-2'>
              <h3>Bước 2: Khoản đóng góp </h3>
              <label htmlFor="dongGop">Số tiền gửi mỗi tháng (VNĐ)</label>
              <input className='ms-5' type="number" name="pmt" id="dongGop" />
              <br />
              <label htmlFor="nam">Thời gian gửi (Năm)</label>
              <input className='ms-5' type="number" name="t" id="nam" />
            </div>

            <div className='my-2'>
              <h3>Bước 3: Lãi suất</h3>
              <label htmlFor="laiXuat">Lãi suất (%)</label>
              <input className='ms-5' type="number" name="r" id="laiXuat" />
            </div>

            <div className='my-2'>
              <h3>Bước 4: Kỳ hạn</h3>
              <label className='me-5' htmlFor="kyHan">Định kỳ gửi</label>
              <select defaultValue='12' name="n" id="kyHan">
                <option value="1">Hàng Năm</option>
                <option value="3">Hàng Quý</option>
                <option value='12'>Hàng Tháng</option>
                <option value="365">Hàng Ngày</option>
              </select>
            </div>
            <input type="hidden" name="token" value={token} />

            <button className='my-2'> Tính Lãi</button>
            {resp && resp.error && <div className='my-2 text-center'> {resp.error}</div>}
          </Form>

          <Col>
            {resp && !resp.error && (
              <>
                <Row className='justify-content-center'>
                  <Col md={12} className='my-2'>
                    <LineChart years={resp.years} originalAmount={resp.originalAmount} futureAmount={resp.futureAmount} />
                  </Col>
                </Row>

                <div className='my-2 text-center'>
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
                          {resp.years.map((_, index) => (
                            <tr key={index}>
                              <td>{resp.years[index]}</td>
                              <td>{numeral(resp.originalAmount[index]).format('0,0')}</td>
                              <td>{numeral(resp.futureAmount[index]).format('0,0')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              </>
            )}
          </Col>
        </Col>

        <Col md={4}>
          <History />
        </Col>
      </Row>
    </Container>
  );
};

export default Caculate;
