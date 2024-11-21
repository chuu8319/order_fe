import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../image/logo.png';

export default function NavBar() {
  const [cookies, , removeCookie] = useCookies(['Authorization', 'Id']); // 쿠키 가져오기
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
      confirmButtonColor: '#FF4545',
      cancelButtonColor: '#9BEC00',
      background: '#fff',
      color: '#754F23'
    }).then((result) => {
      if (result.isConfirmed) {
        // 사용자가 '예'를 선택한 경우
        removeCookie('Authorization', { path: '/' });
        removeCookie('Id', { path: '/' });
        Swal.fire({
          icon: 'success',
          title: '로그아웃 완료!',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF7D29',
          background: '#fff',
          color: '#754F23'
        }).then(() => {
          navigate('/introduce'); // 로그아웃 후 홈으로 이동
        });
      }
    });
  };

  const isLoggedIn = cookies.Authorization && cookies.Id; // 로그인 여부 확인

  return (
    
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#FEFFD2' }}>
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} width={50} alt='logo' 
          style={{ cursor: 'pointer' }} // 클릭 가능하도록 스타일 추가
          onClick={() => navigate('/introduce')} // 클릭 시 navigate 실행
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Store</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            <Nav.Link href="/olderlist">Order list</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                <Nav.Link href="/mypage">MYPAGE</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">LOGIN/JOIN</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
