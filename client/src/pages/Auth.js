import React, { useContext, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import Col from 'react-bootstrap/Col';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useNavigate(); // Используем useNavigate вместо useHistory
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data.user); // Устанавливаем пользователя из полученных данных
            user.setIsAuth(true); // Устанавливаем статус аутентификации в true
            history.push(SHOP_ROUTE); // Переходим на маршрут магазина
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message); // Выводим сообщение об ошибке
            } else {
                console.error('Ошибка во время выполнения запроса:', e);
                alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
            }
        }
    };
    

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54, marginRight: 0}}>
            <Card style={{ width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3 w-75"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3 w-75"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? (
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        )}
                        <Col>
                            <Button variant="outline-success mt-3" onClick={click}>
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
