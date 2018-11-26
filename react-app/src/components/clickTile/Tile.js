import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';

class Header extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Header); 
